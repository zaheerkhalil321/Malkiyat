import { View, Text, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useTheme } from "@react-navigation/native";
import _ from "lodash";

import Container from "@src/components/common/Container";
import HomeHeader from "@src/components/ui/HomeHeader/HomeHeader";
import { wp } from "@src/components/common/Responsive";
import ResponsiveText from "@src/components/common/ResponseiveText";
import Fonts from "@src/theme/fonts";
import ProperityCalculation from "@src/components/home/PropertyCalculation";
import PaymentMethod from "@src/screens/dashboard/unregisterUser/BuyNow/PaymentMethod";
import Step2 from "@src/assets/images/step2.svg";
import { RootState } from "@src/redux/reducers";
import {
  PaymentMethods,
  TransactionInterface,
  WalletCompanies,
} from "@src/services/model";
import Loader from "@src/components/ui/loader/Loader";
import MUnregisterUserApiService from "@src/services/MUnregisterUserApiService";
import { UnitsValidation } from "@src/helpers/unitsValidation";
import {
  checkValueGreaterThanZero,
  valueWithCommas,
} from "@src/utils/helperFunction";
import MRegisterUserApiService from "@src/services/MRegisterUserApiService";

const RegisterPayment = (props) => {
  const { colors } = useTheme();
  const [pay, setPay] = useState<PaymentMethods>({
    paymentId: 0,
    paymentName: "",
  } as PaymentMethods);
  const [laoding, setLoading] = useState(false);
  const registerReducer = useSelector((state: RootState) => state.registerUser);
  const [paymentData, setPaymentData] = useState<PaymentMethods[]>([]);
  const [persistPaymentData, setPersistPaymentData] = useState<
    PaymentMethods[]
  >([]);
  const [edit, setEdit] = useState(false);

  const totalPrice = useMemo(
    () =>
      Number(Math.floor(Number(registerReducer.selectedTileData.units))) *
      Number(registerReducer.selectedTileData?.perSmallerUnitPrice),
    [registerReducer.selectedTileData.units]
  );

  const malkiyatFee = useMemo(
    () =>
      ((registerReducer.registerUserData?.commissionPercentage ?? 0) / 100) *
      totalPrice,
    [registerReducer.selectedTileData.units]
  );

  useEffect(() => {
    const paymentMethods = async () => {
      const response = await MUnregisterUserApiService.getAllPaymentMethods();
      setPay(response.data[0]);
      setPaymentData(response.data);
    };
    paymentMethods();
  }, []);

  const thirdPartyCommission = useMemo(() => {
    const totalCost =
      Number(totalPrice ?? 0) +
      Number(malkiyatFee ?? 0) +
      Number(props.route?.params?.courerCharges ?? 0) +
      Number(props.route?.params?.pofCharges ?? 0);
    if (
      Number(
        registerReducer.registerUserData?.propertiesData?.data.balance
          ?.walletBalance
      ) >= totalCost
    ) {
      return 0;
    }
    return totalCost * (Number(pay?.commission ?? 0) / 100);
  }, [pay, registerReducer.selectedTileData.units]);

  const totalPurchaseAmount =
    Number(totalPrice) +
    Number(malkiyatFee) +
    Number(thirdPartyCommission) +
    Number(props.route?.params?.courerCharges ?? 0) +
    Number(props.route?.params?.pofCharges ?? 0);

  useEffect(() => {
    const paymentMethods = async () => {
      const response = await MUnregisterUserApiService.getAllPaymentMethods();
      if (_.size(response.data) > 0) {
        setPersistPaymentData(response.data);
        handlePaymentMethods(response.data);
      }
    };
    paymentMethods();
  }, [registerReducer.selectedTileData.units]);

  useEffect(() => {
    handlePaymentMethods(persistPaymentData);
  }, [registerReducer.selectedTileData.units]);

  const handlePaymentMethods = (response: PaymentMethods[]) => {
    const index = response?.findIndex(
      (item) => item.companyName == "user-wallet"
    );
    var tempPosition = response[0];
    response[0] = response[index];
    response[index] = tempPosition;

    if (index != -1 && index != 0) {
      if (
        Number(
          registerReducer.registerUserData?.propertiesData?.data.balance
            ?.walletBalance
        ) >= totalPurchaseAmount
      ) {
        setPaymentData(
          response?.filter((item) => item.companyName == "user-wallet")
        );

        const index = response?.findIndex(
          (item) => item.companyName == "user-wallet"
        );

        setPay(response[index]);
      } else {
        setPay(response[1]);

        setPaymentData(
          response?.filter((item) => item.companyName != "user-wallet")
        );
      }
    }
  };
  const handleTransaction = async () => {
    if (
      pay.companyName == "user-wallet" &&
      Number(totalPurchaseAmount) >
        Math.floor(
          Number(
            registerReducer.registerUserData?.propertiesData?.data.balance
              ?.walletBalance
          )
        )
    ) {
      return Alert.alert(" Insufficient Balance");
    }
    setLoading(true);

    const transactionObj: Omit<TransactionInterface, "orderRef"> & {
      companyName: WalletCompanies;
    } = {
      transactionFrom: Number(
        registerReducer?.registerUserData?.userInfo?.userId!
      ),
      // !HARD CODE VALUE
      buyFromMalkiyat: true,
      transactionTo: 0,
      purchaseAmount: totalPurchaseAmount,
      purchaseUnits: Number(registerReducer.selectedTileData.units),
      propertyId: Number(registerReducer.selectedTileData?.propertyId),
      paymentMethodId: pay.paymentId,
      proofOfPurchaseId: props.route?.params?.purchaseId,
      proofOfDeliveryId: props.route?.params?.deliveryId,
      onlyCashIn: "false",
      companyName: pay.companyName,
      cashInAmount:
        Number(totalPrice ?? 0) +
        Number(malkiyatFee ?? 0) +
        Number(props.route?.params?.courerCharges ?? 0) +
        Number(props.route?.params?.pofCharges ?? 0),
    };

    if (pay.companyName == "user-wallet") {
      const updatedTransactionObj = { ...transactionObj };

      updatedTransactionObj.purchaseAmount =
        totalPrice +
        malkiyatFee +
        Number(props.route?.params?.courerCharges ?? 0) +
        Number(props.route?.params?.pofCharges ?? 0);

      const res = await MRegisterUserApiService.transactionApi(
        updatedTransactionObj
      );
      if (res?.data?.status == 200) {
        setLoading(false);
        setTimeout(() => {
          props.navigation?.navigate("RegisterProofOfProcessing", {
            amount:
              Number(totalPrice ?? 0) +
              Number(malkiyatFee ?? 0) +
              Number(props.route?.params?.courerCharges ?? 0) +
              Number(props.route?.params?.pofCharges ?? 0),
          });
        }, 300);
      } else {
        setLoading(false);
        // Alert.alert(res.data.data?.message ?? "Something went wrong!");
      }
    } else {
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

      if (res.data?.status == 200) {
        setLoading(false);

        if (
          pay.companyName == "payfast" ||
          pay.companyName == "paymob-nift" ||
          pay.companyName == "paymob-card" ||
          pay.companyName == "paymob-ep"
        ) {
          props.navigation?.navigate("RegisterBSecurePayment", {
            ...res.data.data,
            ...transactionObj,
            amount: Math.floor(
              Number(totalPrice ?? 0) +
                Number(malkiyatFee ?? 0) +
                thirdPartyCommission
            ),
          });
        } else {
          if (res.data?.status != 200) {
            Alert.alert(String(res.data.message));
          }
          // else
          //   props.navigation?.navigate("RegisterProofOfProcessing", {
          //     amount:
          //       Number(totalPrice ?? 0) +
          //       Number(malkiyatFee ?? 0) +
          //       Number(totalPrice ?? 0) * (Number(pay?.commission ?? 0) / 100) +
          //       Number(props.route?.params?.courerCharges ?? 0) +
          //       Number(props.route?.params?.pofCharges ?? 0),
          //   });
        }
      } else {
        Alert.alert("Not enough units to purchase.");
      }
    }
  };

  const removeNonNumber = (string = "") => string.replace(/[^\d]/g, "");
  const limitLength = (string = "", maxLength) => string.substr(0, maxLength);
  const _formatExpiry = (expiry) => {
    const sanitized = limitLength(removeNonNumber(expiry), 4);
    if (sanitized.match(/^[2-9]$/)) {
      return `0${sanitized}`;
    }
    if (sanitized.length > 2) {
      return `${sanitized.substring(0, 2)}/${sanitized.substring(
        2,
        sanitized.length
      )}`;
    }
    return sanitized;
  };
  return (
    <Container style={{ backgroundColor: "#F4F4F4" }}>
      <HomeHeader
        back
        backgroundColor={"white"}
        show={false}
        {...props}
        title={"Malkiyat"}
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
              Buyer:
              <ResponsiveText>
                {registerReducer?.registerUserData?.userInfo?.firstName +
                  " " +
                  registerReducer?.registerUserData?.userInfo?.lastName}
              </ResponsiveText>
            </ResponsiveText>
            <>
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
                {/* DHA */}
              </Text>

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
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <ResponsiveText
                    style={{
                      fontSize: 3,
                      color: colors.TextColor,
                      marginBottom: wp(1),
                    }}
                  >
                    {registerReducer.selectedTileData?.propertyStatus}
                  </ResponsiveText>
                  <Text
                    style={{
                      fontSize: 12,
                      color: colors.PlaceHolderText,
                      width: wp(45),
                      marginLeft: "auto",
                      textAlign: "right",
                      marginTop: -wp(8),
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
                onPress={handleTransaction}
                disabled={!UnitsValidation()}
                style={{
                  width: wp(80),
                  height: wp(12),
                  borderRadius: wp(10),
                  backgroundColor: !UnitsValidation()
                    ? "#aeaeae"
                    : colors.Primary,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ResponsiveText style={{ color: "white", fontWeight: "bold" }}>
                  Pay
                </ResponsiveText>
              </TouchableOpacity>
            </View>
            {/* )} */}
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                justifyContent: "space-between",
                marginVertical: wp(5),
              }}
            ></View>
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
                    {pay.paymentName} {pay.commission + "%" ?? ""}:
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
      <Loader visible={laoding} />
    </Container>
  );
};

function renderPaymantMethods(item: PaymentMethods): boolean {
  return (
    (item.status == "all" || item.status == "userwallet") &&
    item.companyName != "finja-voucher" &&
    item.companyName != "onelink-voucher" &&
    item.companyName != "paypro-voucher"
  );
}

export default RegisterPayment;
