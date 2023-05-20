import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Alert,
  Platform,
  Keyboard,
} from "react-native";

import { useSelector } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import _ from "lodash";
import { Modalize } from "react-native-modalize";

import ResponsiveText from "@src/components/common/ResponseiveText";
import { PaymentMethods } from "@src/services/model";
import MUnregisterUserApiService from "@src/services/MUnregisterUserApiService";
import { wp } from "@src/components/common/Responsive";
import Fonts from "@src/theme/fonts";
import { RootState } from "@src/redux/reducers";
import { getCachePaymentMethods } from "@src/utils/cacheFunc";
import Loader from "@src/components/ui/loader/Loader";
import {
  CashinDatset,
  Payment_Channel,
} from "@src/helpers/constants/OnboardingData";
import { valueWithCommas } from "@src/utils/helperFunction";
import UploadIcon from "@src/assets/images/uploadRe.svg";
import MRegisterUserApiService from "@src/services/MRegisterUserApiService";

const CashInModal = React.forwardRef((props: any, ref: any) => {
  const [error, setError] = useState(false);
  const [amount, setAmount] = useState<string>("");
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethods[]>([]);
  const [showInput, setShowInput] = useState(true);
  const [showPayment, setShowPayment] = useState(false);
  const [showPayment2, setShowPayment2] = useState(false);
  const [showPayment3, setShowPayment3] = useState(false);
  const [payProData, setPayProData] = useState<PaymentMethods>(
    {} as PaymentMethods
  );

  const [loading, setLoading] = useState<boolean>(false);

  const registerReducer = useSelector((state: RootState) => state.registerUser);

  useEffect(() => {
    if (error && Number(amount) >= 2000) {
      setError(false);
    }
  }, [amount]);

  function handleState() {
    //! TODO FIX LATER ANDROID BACKHANDER IS NOT PROPERLY WORKING
    setShowInput(true);
    setAmount("");
    setLoading(false);
    setShowPayment(false);
    setShowPayment2(false);
    setShowPayment3(false);
  }
  const handleTransaction = async (item: PaymentMethods) => {
    const { companyName, paymentId } = item;

    if (companyName == "malkiyat-bank-detail") {
      setLoading(true);

      const res = await MRegisterUserApiService.cashInToMalkiyat();

      if (res?.data?.status == 200) {
        setLoading(false);
        ref.current.close();

        handleState();
        return props.navigation.navigate("MalkiyatBankReview", {
          amount,
          ...res?.data?.data,
        });
      } else {
        setLoading(false);

        //  IMPLEMENTED
      }
    }
    if (
      companyName == "finja-voucher" ||
      companyName == "onelink-voucher" ||
      companyName == "paypro-voucher"
    ) {
      ref.current.close();

      handleState();
      return props.navigation.navigate("ReviewDetails", { amount, item });
    }
    setLoading(true);
    const initiatePaymentObj = {
      userId: Number(registerReducer.registerUserData?.userInfo?.userId),
      propertyId: null,
      amount: amount,
      paymentMethodId: paymentId,
    };

    const res = await MUnregisterUserApiService.initiatePayment(
      initiatePaymentObj
    );

    const transactionObj = {
      transactionFrom: Number(
        registerReducer?.registerUserData?.userInfo?.userId!
      ),
      purchaseAmount: Number(amount),
      paymentMethodId: paymentId,
      orderRef: res.data?.data?.orderId,
      onlyCashIn: "true",
      companyName: companyName,
    };

    if (res.data?.status == 200) {
      ref.current.close();

      handleState();

      props.navigation?.navigate("Webview", {
        ...res.data.data,
        ...transactionObj,
        ...item,

        amount: Number(amount),
      });
    } else {
      setLoading(false);

      Alert.alert(String(res?.data?.message ?? "Something went wrong!"));
    }
  };

  return (
    <Modalize
      modalHeight={Platform.OS == "ios" ? 400 : 350}
      onOverlayPress={() => Keyboard.dismiss()}
      ref={ref}
      // panGestureComponentEnabled
      closeOnOverlayTap={true}
      // avoidKeyboardLikeIOS

      HeaderComponent={
        <KeyboardAwareScrollView
          enableAutomaticScroll
          enableOnAndroid
          extraScrollHeight={Platform.OS == "ios" ? -300 : 20}
          keyboardShouldPersistTaps="handled"
          automaticallyAdjustsScrollIndicatorInsets
          automaticallyAdjustContentInsets
        >
          <View>
            {showInput && (
              <View style={{ paddingHorizontal: wp(5) }}>
                <ResponsiveText style={styles.addFundsText}>
                  Add Funds
                </ResponsiveText>
                <View style={styles.addFundsView}>
                  <ResponsiveText style={styles.amountTextHeader}>
                    Enter Amount
                  </ResponsiveText>

                  <TextInput
                    maxLength={9}
                    style={styles.amountInput}
                    onChangeText={(text) => {
                      text = text.replace(/[^0-9]/g, "");
                      setAmount(text);
                    }}
                    defaultValue={""}
                    keyboardType="numeric"
                    placeholder="Enter Price"
                    value={amount ? valueWithCommas(amount) : ""}
                  />
                </View>

                {error && (
                  <ResponsiveText style={styles.amountErrorText}>
                    Amount cannot be less than{" "}
                    {valueWithCommas(
                      registerReducer.registerUserData?.appSettings
                        ?.minAmountForCashIn
                    )}
                  </ResponsiveText>
                )}
                <TouchableOpacity
                  onPress={() => {
                    if (
                      _.isEmpty(amount) ||
                      Number(amount) <
                        Number(
                          registerReducer.registerUserData?.appSettings
                            ?.minAmountForCashIn
                        )
                    ) {
                      setError(true);
                    } else {
                      setShowPayment(true);
                      setShowInput(false);
                    }
                  }}
                  style={styles.amountBtn}
                >
                  <ResponsiveText style={{ color: "white" }}>
                    Next
                  </ResponsiveText>
                </TouchableOpacity>
              </View>
            )}
          </View>
          {showPayment && (
            <View style={{ marginVertical: wp(10) }}>
              <ResponsiveText style={styles.showPaymentText}>
                Please select your
                <ResponsiveText
                  style={{
                    fontFamily: Fonts.ManropeSemiBold,
                    fontSize: 4.27,
                  }}
                >
                  {" "}
                  Payment Method
                </ResponsiveText>
              </ResponsiveText>
              <View
                style={{
                  marginTop: wp(5),
                  marginBottom: wp(10),
                  paddingHorizontal: wp(3),
                }}
              >
                {CashinDatset.map((item, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        if (item.key == "creditdebit") {
                          return handleTransaction(
                            getCachePaymentMethods(item.key)[0]
                          );
                        }
                        setPaymentMethods(getCachePaymentMethods(item.key));
                        setShowPayment2(true);
                        setShowPayment(false);
                      }}
                      style={styles.selectedCashinBtn}
                    >
                      <View style={styles.imgTitleView}>
                        <item.image />
                        <ResponsiveText
                          style={{
                            fontSize: 3.5,
                            fontFamily: Fonts.ManropeSemiBold,
                            marginLeft: wp(4),
                          }}
                        >
                          {item.title}
                        </ResponsiveText>
                      </View>
                    </TouchableOpacity>
                  );
                })}
                <TouchableOpacity
                  onPress={() => {
                    ref.current.close();
                    props.navigation.navigate("UploadRecipt", {
                      amount,
                    });
                  }}
                  style={styles.selectedCashinBtn}
                >
                  <View style={styles.imgTitleView}>
                    <UploadIcon />
                    <ResponsiveText
                      style={{
                        fontSize: 3.5,
                        fontFamily: Fonts.ManropeSemiBold,
                        marginLeft: wp(4),
                      }}
                    >
                      Deposit Cash to Malkiyat Account
                    </ResponsiveText>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {showPayment2 && (
            <View style={{ marginVertical: wp(10) }}>
              <ResponsiveText
                style={{
                  textAlign: "center",
                  fontSize: 4.27,
                  marginTop: wp(10),
                }}
              >
                Please select your
                <ResponsiveText
                  style={{
                    fontFamily: Fonts.ManropeSemiBold,
                    fontSize: 4.27,
                  }}
                >
                  {" "}
                  Payment Method
                </ResponsiveText>
              </ResponsiveText>
              <ScrollView contentContainerStyle={{ paddingVertical: wp(5) }}>
                {paymentMethods.map((item) => {
                  if (item.companyName != "user-wallet") {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          if (item.companyName == "paypro-voucher") {
                            setShowPayment2(false);
                            setShowPayment(false);
                            setShowPayment3(true);
                            setPayProData(item);
                          } else handleTransaction(item);
                        }}
                        key={item.paymentId}
                        style={{
                          marginHorizontal: wp(1),
                          marginVertical: wp(2),
                          shadowColor: "#000",
                          shadowOffset: {
                            width: 0,
                            height: 1,
                          },
                          shadowOpacity: 0.22,
                          shadowRadius: 2.22,

                          elevation: 3,
                          backgroundColor: "white",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                          paddingHorizontal: wp(1),
                          // paddingVertical: wp(1),
                          paddingRight: wp(3),
                          height: wp(10.93),
                          borderRadius: wp(2),
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <Image
                            source={{ uri: item.imgUrl }}
                            style={{ width: 25, height: 25 }}
                            resizeMode="contain"
                          />
                          <ResponsiveText
                            style={{
                              fontSize: 3.5,
                              fontFamily: Fonts.ManropeSemiBold,
                              marginLeft: wp(4),
                            }}
                          >
                            {item.paymentName}
                          </ResponsiveText>
                        </View>
                      </TouchableOpacity>
                    );
                  }
                })}
              </ScrollView>
            </View>
          )}
          {showPayment3 && (
            <View style={{ marginVertical: wp(10) }}>
              {Payment_Channel.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => {
                      ref.current.close();

                      handleState();

                      props.navigation.navigate("ReviewDetails", {
                        amount,
                        item: payProData,
                      });
                    }}
                    style={{
                      marginHorizontal: wp(1),
                      marginVertical: wp(2),
                      shadowColor: "#000",
                      shadowOffset: {
                        width: 0,
                        height: 1,
                      },
                      shadowOpacity: 0.22,
                      shadowRadius: 2.22,

                      elevation: 3,
                      backgroundColor: "white",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      paddingHorizontal: wp(1),
                      // paddingVertical: wp(1),
                      paddingRight: wp(3),
                      height: wp(10.93),
                      borderRadius: wp(2),
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        paddingLeft: wp(2),
                      }}
                    >
                      <item.image />
                      <ResponsiveText
                        style={{
                          fontSize: 3.5,
                          fontFamily: Fonts.ManropeSemiBold,
                          marginLeft: wp(4),
                        }}
                      >
                        {item.title}
                      </ResponsiveText>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </KeyboardAwareScrollView>
      }
      onClose={handleState}
    >
      <Loader visible={loading} />
    </Modalize>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  addFundsView: {
    borderColor: "#3577DB",
    borderWidth: 1,
    paddingHorizontal: wp(4),
    borderRadius: wp(1),
    height: wp(16),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: wp(15),
    // justifyContent: "center",
  },
  addFundsText: {
    marginTop: wp(13),
    fontSize: 5,
    fontFamily: Fonts.ManropeSemiBold,
  },
  amountTextHeader: {
    // height: "40%",
    fontSize: 3.2,
    fontFamily: Fonts.ManropeBold,
    color: "#3577DB",
    position: "absolute",
    top: -10,
    left: 10,
    paddingHorizontal: 5,
    backgroundColor: "white",
  },
  amountInput: {
    width: wp(75),
    height: wp(15),
  },
  amountErrorText: {
    color: "red",
    fontSize: 3.5,
    marginTop: wp(3),
  },
  amountBtn: {
    backgroundColor: "#2BACE3",
    borderRadius: wp(10),
    justifyContent: "center",
    alignItems: "center",
    height: wp(10),
    marginTop: wp(20),
    marginBottom: wp(10),
  },
  selectedCashinBtn: {
    marginHorizontal: wp(1),
    marginVertical: wp(2),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: wp(1),
    // paddingVertical: wp(1),
    paddingRight: wp(3),
    height: wp(10.93),
    borderRadius: wp(2),
  },
  showPaymentText: {
    textAlign: "center",
    fontSize: 4.27,
    marginTop: wp(10),
  },
  imgTitleView: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: wp(2),
  },
});

export default React.memo(CashInModal);
