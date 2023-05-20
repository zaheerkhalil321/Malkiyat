import { View, Text, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useTheme } from "@react-navigation/native";
import _ from "lodash";

import Modal from "react-native-modal";
import Container from "@src/components/common/Container";
import HomeHeader from "@src/components/ui/HomeHeader/HomeHeader";
import ProfileSvg from "@src/assets/images/HomeIcons/Profile.svg";
import { wp } from "@src/components/common/Responsive";
import ResponsiveText from "@src/components/common/ResponseiveText";
import Fonts from "@src/theme/fonts";
import ProperityCalculation from "@src/components/home/PropertyCalculation";
import PaymentMethod from "./PaymentMethod";
import Step2 from "@src/assets/images/step2.svg";
import { RootState } from "@src/redux/reducers";
import {
  PaymentMethods,
  TransactionInterface,
  WalletCompanies,
} from "@src/services/model";
import Loader from "@src/components/ui/loader/Loader";
import MUnregisterUserApiService from "@src/services/MUnregisterUserApiService";
import {
  checkValueGreaterThanZero,
  valueWithCommas,
} from "@src/utils/helperFunction";

const Payment = (props) => {
  const { colors } = useTheme();

  const [loading, setLoading] = useState(false);
  const registerReducer = useSelector((state: RootState) => state.registerUser);

  const [paymentData, setPaymentData] = useState<PaymentMethods[]>([]);
  const [pay, setPay] = useState<PaymentMethods>({
    paymentId: 0,
    paymentName: "",
  } as PaymentMethods);

  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const paymentMethods = async () => {
      const response = await MUnregisterUserApiService.getAllPaymentMethods();
      setPay(response.data[0]);
      setPaymentData(response.data);
    };
    paymentMethods();
  }, []);

  const totalPrice =
    Number(Math.floor(Number(registerReducer.selectedTileData.units))) *
    Number(registerReducer.selectedTileData?.perSmallerUnitPrice);

  const malkiyatFee =
    ((registerReducer.registerUserData?.commissionPercentage ?? 0) / 100) *
    totalPrice;

  const thirdPartyCommission = useMemo(
    () =>
      (Number(totalPrice ?? 0) +
        Number(malkiyatFee ?? 0) +
        Number(props.route?.params?.courerCharges ?? 0) +
        Number(props.route?.params?.pofCharges ?? 0)) *
      (Number(pay?.commission ?? 0) / 100),
    [pay]
  );

  const transactionPerformed = async () => {
    setLoading(true);

    //* INIATE PAYMENT API CALL

    const initiatePaymentObj = {
      userId: Number(registerReducer.registerUserData?.userInfo?.userId),
      propertyId: Number(registerReducer.selectedTileData?.propertyId),
      amount:
        Number(totalPrice ?? 0) +
        Number(malkiyatFee ?? 0) +
        Number(thirdPartyCommission) +
        Number(props.route?.params?.courerCharges ?? 0) +
        Number(props.route?.params?.pofCharges ?? 0),
      paymentMethodId: pay.paymentId,
    };

    const res = await MUnregisterUserApiService.initiatePayment(
      initiatePaymentObj
    );

    const transactionObj: TransactionInterface & {
      companyName: WalletCompanies;
    } = {
      transactionFrom: Number(
        registerReducer?.registerUserData?.userInfo?.userId!
      ),
      // !HARD CODE VALUE
      buyFromMalkiyat: true,
      transactionTo: 0,
      purchaseAmount:
        Number(totalPrice ?? 0) +
        Number(malkiyatFee ?? 0) +
        Number(thirdPartyCommission) +
        Number(props.route?.params?.courerCharges ?? 0) +
        Number(props.route?.params?.pofCharges ?? 0),
      purchaseUnits: Number(registerReducer.selectedTileData.units),
      propertyId: Number(registerReducer.selectedTileData?.propertyId),
      paymentMethodId: pay.paymentId,
      proofOfPurchaseId: props.route?.params?.purchaseId,
      proofOfDeliveryId: props.route?.params?.deliveryId,
      orderRef: res.data?.data.orderId,
      onlyCashIn: "false",
      companyName: pay.companyName,
      cashInAmount:
        Number(totalPrice ?? 0) +
        Number(malkiyatFee ?? 0) +
        Number(props.route?.params?.courerCharges ?? 0) +
        Number(props.route?.params?.pofCharges ?? 0),
    };
    console.log(
      "🚀 ~ file: Payment.tsx:98 ~ transactionPerformed ~ res",
      transactionObj,
      res
    );

    if (res.data?.status == 200) {
      setLoading(false);

      props.navigation?.navigate("BSecurePayment", {
        ...res.data.data,
        ...transactionObj,
        amount:
          Number(totalPrice ?? 0) +
          Number(malkiyatFee ?? 0) +
          Number(thirdPartyCommission) +
          Number(props.route?.params?.courerCharges ?? 0) +
          Number(props.route?.params?.pofCharges ?? 0),
      });
    } else {
      setLoading(false);
    }
  };

  return (
    <Container style={{ backgroundColor: "#F4F4F4" }}>
      <HomeHeader
        back
        backgroundColor={"white"}
        show={false}
        {...props}
        title={"Malkiyat"}
        // label={"Login"}
        // icon={<ProfileSvg strokeWidth={10} width={wp(5)} height={wp(5)} />}
      />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="always"
        automaticallyAdjustContentInsets={true}
      >
        <View style={{ paddingHorizontal: wp(5) }}>
          <View
            style={{
              paddingTop: wp(1.5),
              alignItems: "center",
            }}
          >
            <Step2 />
          </View>
          <ResponsiveText
            style={{
              marginTop: wp(2),
              fontFamily: Fonts.ManropeSemiBold,
              marginBottom: wp(2),
            }}
          >
            Purchase Details
          </ResponsiveText>
          <View
            style={{
              backgroundColor: "white",
              borderColor: colors.Primary,
              borderWidth: 0.8,
              borderRadius: wp(2),
              paddingHorizontal: wp(4),
              paddingVertical: wp(3),
            }}
          >
            <ResponsiveText
              style={{
                color: colors.Primary,
                fontFamily: Fonts.ManropeBold,
                fontSize: 4.3,
                marginBottom: wp(2),
              }}
            >
              Buyer:{" "}
              <ResponsiveText>
                {registerReducer?.registerUserData?.userInfo?.firstName +
                  " " +
                  registerReducer?.registerUserData?.userInfo?.lastName}
              </ResponsiveText>
            </ResponsiveText>
            <>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: wp(1),
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    // alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <View>
                    <Text
                      numberOfLines={1}
                      style={{
                        color: colors.Primary,
                        fontFamily: Fonts.ManropeBold,
                        fontSize: 16,
                        width: wp(30),
                      }}
                    >
                      {registerReducer.selectedTileData?.propertyName}
                    </Text>
                    <ResponsiveText
                      style={{
                        fontSize: 3,
                        color: colors.TextColor,
                        marginBottom: wp(1),
                      }}
                    >
                      {registerReducer.selectedTileData?.propertyStatus}
                    </ResponsiveText>
                  </View>
                  <Text
                    style={{
                      fontSize: 12,
                      color: colors.PlaceHolderText,
                      width: wp(45),
                      marginLeft: "auto",
                      textAlign: "right",
                      // marginTop: -wp(8),
                    }}
                  >
                    {registerReducer.selectedTileData?.address}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  backgroundColor: colors.BorderColor,
                  height: 1,
                  marginBottom: wp(2),
                }}
              />
            </>

            <ProperityCalculation
              fon
              edit={edit}
              border
              propertyType={"buy"}
              selectedPopertyCal={(data) =>
                props?.selectedPopertyCal && props?.selectedPopertyCal!(data)
              }
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              setEdit(!edit);
            }}
          >
            <ResponsiveText
              style={{
                fontSize: 3.5,
                alignSelf: "flex-end",
                marginTop: wp(2),
                fontFamily: Fonts.ManropeSemiBold,
                color: colors.Primary,
              }}
            >
              Edit
            </ResponsiveText>
          </TouchableOpacity>
          <ResponsiveText
            style={{
              marginTop: wp(4),
              fontFamily: Fonts.ManropeSemiBold,
              marginBottom: wp(2),
              color: colors.Primary,
            }}
          >
            Select Payment Method
          </ResponsiveText>

          <View
            style={{
              backgroundColor: "white",
              borderColor: colors.Primary,
              borderWidth: 0.8,
              borderRadius: wp(2),
              paddingHorizontal: wp(4),
              paddingVertical: wp(3),
              marginBottom: wp(5),
            }}
          >
            {paymentData.map((item) => {
              if (renderPaymantMethods(item)) {
                return (
                  <View key={item.paymentId} style={{ marginBottom: wp(3) }}>
                    <PaymentMethod pay={pay} setPay={setPay} item={item} />
                  </View>
                );
              }
            })}
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                justifyContent: "space-between",
                marginVertical: wp(5),
              }}
            >
              <TouchableOpacity
                onPress={transactionPerformed}
                style={{
                  width: wp(80),
                  height: wp(12),
                  borderRadius: wp(10),
                  backgroundColor: colors.Primary,
                  alignSelf: "flex-end",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: wp(5),
                }}
              >
                <ResponsiveText style={{ color: "white", fontWeight: "bold" }}>
                  Pay
                </ResponsiveText>
              </TouchableOpacity>
            </View>
            <View>
              <ResponsiveText
                style={{
                  color: colors.Primary,
                  fontFamily: Fonts.ManropeSemiBold,
                  fontSize: 4.5,
                  marginBottom: wp(2),
                }}
              >
                Amount Details:
              </ResponsiveText>
              <View style={{ paddingHorizontal: wp(5) }}>
                {checkValueGreaterThanZero(totalPrice) && (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: wp(0.5),
                    }}
                  >
                    <ResponsiveText
                      style={{
                        fontSize: 3.5,
                        fontFamily: Fonts.ManropeSemiBold,
                      }}
                    >
                      Square feet Amount :
                    </ResponsiveText>
                    <ResponsiveText
                      style={{
                        fontSize: 3.5,
                        fontFamily: Fonts.ManropeSemiBold,
                      }}
                    >
                      Rs {valueWithCommas(totalPrice ?? 0)}
                    </ResponsiveText>
                  </View>
                )}
                {checkValueGreaterThanZero(malkiyatFee) && (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginVertical: wp(1),
                      marginBottom: wp(0.5),
                    }}
                  >
                    <ResponsiveText
                      style={{
                        fontSize: 3.5,
                        fontFamily: Fonts.ManropeSemiBold,
                      }}
                    >
                      Malkiyat Charges{" "}
                      {registerReducer?.registerUserData?.commissionPercentage +
                        "%" ?? ""}
                      :
                    </ResponsiveText>
                    <ResponsiveText
                      style={{
                        fontSize: 3.5,
                        fontFamily: Fonts.ManropeSemiBold,
                      }}
                    >
                      Rs {valueWithCommas(Math.ceil(malkiyatFee))}
                    </ResponsiveText>
                  </View>
                )}

                {checkValueGreaterThanZero(props.route?.params?.pofCharges) && (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <ResponsiveText
                      style={{
                        fontSize: 3.5,
                        fontFamily: Fonts.ManropeSemiBold,
                      }}
                    >
                      Stamp Paper Fee:
                    </ResponsiveText>
                    <ResponsiveText
                      style={{
                        fontSize: 3.5,
                        fontFamily: Fonts.ManropeSemiBold,
                      }}
                    >
                      Rs {props.route?.params?.pofCharges}
                    </ResponsiveText>
                  </View>
                )}
                {checkValueGreaterThanZero(
                  props.route?.params?.courerCharges
                ) && (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <ResponsiveText
                      style={{
                        fontSize: 3.5,
                        fontFamily: Fonts.ManropeSemiBold,
                      }}
                    >
                      Courier Charges:
                    </ResponsiveText>
                    <ResponsiveText
                      style={{
                        fontSize: 3.5,
                        fontFamily: Fonts.ManropeSemiBold,
                      }}
                    >
                      Rs {props.route?.params?.courerCharges}
                    </ResponsiveText>
                  </View>
                )}
              </View>
              {/* <View
                style={{
                  backgroundColor: colors.BorderColor,
                  height: 1,
                  marginBottom: wp(2),
                  marginTop: wp(2),
                }}
              />
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingHorizontal: wp(5),
                }}
              >
                <ResponsiveText
                  style={{
                    fontSize: 3.5,
                    // color: colors.Primary,
                    fontFamily: Fonts.ManropeSemiBold,
                  }}
                >
                  Amount :
                </ResponsiveText>
                <ResponsiveText
                  style={{
                    fontSize: 3.5,
                    // color: colors.Primary,
                    fontFamily: Fonts.ManropeSemiBold,
                  }}
                >
                  Rs{" "}
                  {valueWithCommas(
                    Math.ceil(
                      Number(totalPrice ?? 0) +
                      Number(malkiyatFee ?? 0) +
                      Number(props.route?.params?.courerCharges ?? 0) +
                      Number(props.route?.params?.pofCharges ?? 0)
                    )
                  )}
                </ResponsiveText>
              </View> */}
              {checkValueGreaterThanZero(thirdPartyCommission) && (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginVertical: wp(1),
                    paddingHorizontal: wp(5),
                  }}
                >
                  <ResponsiveText
                    style={{
                      fontSize: 3.5,
                      fontFamily: Fonts.ManropeSemiBold,
                    }}
                  >
                    {pay?.paymentName} {pay.commission + "%" ?? ""}:
                  </ResponsiveText>
                  <ResponsiveText
                    style={{
                      fontSize: 3.5,
                      fontFamily: Fonts.ManropeSemiBold,
                    }}
                  >
                    Rs {valueWithCommas(Math.ceil(thirdPartyCommission))}
                  </ResponsiveText>
                </View>
              )}
              <View
                style={{
                  backgroundColor: colors.BorderColor,
                  height: 1,
                  marginBottom: wp(2),
                  marginTop: wp(2),
                }}
              />
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingHorizontal: wp(5),
                }}
              >
                <ResponsiveText
                  style={{
                    fontSize: 3.5,
                    color: colors.Primary,
                    fontFamily: Fonts.ManropeSemiBold,
                  }}
                >
                  Total Amount :
                </ResponsiveText>
                <ResponsiveText
                  style={{
                    fontSize: 3.5,
                    color: colors.Primary,
                    fontFamily: Fonts.ManropeSemiBold,
                  }}
                >
                  Rs{" "}
                  {valueWithCommas(
                    Math.ceil(
                      Number(totalPrice ?? 0) +
                        Number(malkiyatFee ?? 0) +
                        Number(thirdPartyCommission) +
                        Number(props.route?.params?.courerCharges ?? 0) +
                        Number(props.route?.params?.pofCharges ?? 0)
                    )
                  )}
                </ResponsiveText>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
      <Loader visible={loading} />
    </Container>
  );
};

function renderPaymantMethods(item: PaymentMethods) {
  return (
    item.status == "all" &&
    item.companyName != "user-wallet" &&
    item.companyName != "finja-voucher" &&
    item.companyName != "onelink-voucher" &&
    item.companyName != "paypro-voucher"
  );
}

export default Payment;
