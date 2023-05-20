import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  BackHandler,
} from "react-native";
import React, { useEffect, useState } from "react";
import _ from "lodash";

import Container from "@src/components/common/Container";
import HomeHeader from "@src/components/ui/HomeHeader/HomeHeader";
import ResponsiveText from "@src/components/common/ResponseiveText";
import { wp } from "@src/components/common/Responsive";
import WalletIcon from "@src/assets/images/wallet_ic.svg";
import Fonts from "@src/theme/fonts";
import Easy from "@src/assets/images/easypaisa.svg";
import Jazz from "@src/assets/images/jazzCash.svg";
import MUnregisterUserApiService from "@src/services/MUnregisterUserApiService";
import { PaymentMethods, TransactionInterface } from "@src/services/model";
import { ScrollView } from "react-native-gesture-handler";
import Content from "@src/components/common/Content";
import { useSelector } from "react-redux";
import { RootState } from "@src/redux/reducers";
import { valueWithCommas } from "@src/utils/helperFunction";
import Loader from "@src/components/ui/loader/Loader";
import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from "@react-navigation/native";

interface Props {
  navigation: NavigationProp<ParamListBase>;
  route: RouteProp<ParamListBase>;
}

const CashIn = (props: Props) => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethods[]>([]);
  const [pay, setPay] = useState<PaymentMethods>({
    paymentId: 0,
    paymentName: "",
  } as PaymentMethods);
  const [amount, setAmount] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState(false);
  const registerReducer = useSelector((state: RootState) => state.registerUser);
  useEffect(() => {
    (async function () {
      const res = await MUnregisterUserApiService.getAllPaymentMethods();
      setPay(res.data[0]);
      setPaymentMethods(res.data);
    })();
  }, []);
  useEffect(() => {
    setError(false);
  }, [amount]);
  React.useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", backAction);
    };
  }, []);
  function backAction(): boolean | null | undefined {
    if (props.route.name == "CashIn") {
      if (props.navigation.isFocused()) {
        props.navigation.navigate("HomeDrawer");
        return true;
      }
    } else {
      props.navigation.goBack();
      return false;
    }
  }
  const handleTransaction = async () => {
    if (_.isEmpty(amount)) {
      setError(true);
      // Alert.alert("Please enter amount!");
    } else {
      if (pay.companyName == "paypro-voucher") {
        return props.navigation.navigate("PayPro", {
          amount,
          pay,
        });
      }
      if (
        pay.companyName == "finja-voucher" ||
        pay.companyName == "onelink-voucher"
      ) {
        return props.navigation.navigate("ReviewDetails", { amount, pay });
      }
      setLoading(true);
      const initiatePaymentObj = {
        userId: Number(registerReducer.registerUserData?.userInfo?.userId),
        propertyId: null,
        amount: amount,
        paymentMethodId: pay.paymentId,
      };

      const res = await MUnregisterUserApiService.initiatePayment(
        initiatePaymentObj
      );

      const transactionObj = {
        transactionFrom: Number(
          registerReducer?.registerUserData?.userInfo?.userId!
        ),
        // !HARD CODE

        purchaseAmount: Number(amount),
        paymentMethodId: pay.paymentId,
        orderRef: res.data?.data?.orderId,
        onlyCashIn: "true",
        companyName: pay.companyName,
      };

      if (res.data?.status == 200) {
        setLoading(false);

        props.navigation?.navigate("Webview", {
          ...res.data.data,
          ...transactionObj,
          amount: Number(amount),
        });
      } else {
        setLoading(false);
        Alert.alert(String(res?.data?.message ?? "Something went wrong!"));
      }
    }
  };
  return (
    <Container>
      <HomeHeader
        back
        backgroundColor={"white"}
        show={true}
        {...props}
        title={"Wallet"}
        bell
        handleBackButtonPress={() => props.navigation.navigate("HomeDrawer")}
      />
      <Content>
        <View style={{ alignItems: "center" }}>
          <WalletIcon />
          <ResponsiveText
            style={{ fontSize: 2.67, marginTop: wp(1), marginBottom: wp(4) }}
          >
            Total Balance
          </ResponsiveText>
          <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
            <ResponsiveText style={{ marginBottom: wp(1.5) }}>
              Rs.{" "}
            </ResponsiveText>
            <ResponsiveText
              style={{ fontSize: 8, fontFamily: Fonts.ManropeBold }}
            >
              {valueWithCommas(
                Number(
                  registerReducer?.registerUserData?.propertiesData?.data
                    ?.balance?.walletBalance ?? 0
                )
              )}
            </ResponsiveText>
          </View>
        </View>
        <View
          style={{
            borderColor: "#3577DB",
            borderWidth: 1,
            paddingHorizontal: wp(4),
            borderRadius: wp(1),
            height: wp(13),
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: wp(10),
            marginHorizontal: wp(10),
            // backgroundColor: "red",
          }}
        >
          <ResponsiveText
            style={{
              fontSize: 3.2,
              fontFamily: Fonts.ManropeBold,
              color: "#3577DB",
              position: "absolute",
              top: -10,
              left: 10,
              paddingHorizontal: 5,
              backgroundColor: "white",
            }}
          >
            Amount
          </ResponsiveText>
          <TextInput
            style={{ width: wp(70), height: wp(10) }}
            onChangeText={(text) => {
              text = text.replace(/[^0-9]/g, "");
              setAmount(text);
            }}
            defaultValue={""}
            keyboardType="numeric"
            placeholder="Enter Price"
            value={amount}
          />
        </View>
        {error && (
          <ResponsiveText
            style={{
              marginLeft: wp(12),
              color: "red",
              fontSize: 3.5,
              marginTop: wp(1),
            }}
          >
            Please enter amount!
          </ResponsiveText>
        )}

        <ResponsiveText
          style={{
            marginTop: wp(5),
            alignSelf: "center",
            fontWeight: "bold",
            color: "#3577DB",
          }}
        >
          Select Payment Method
        </ResponsiveText>
        <ScrollView contentContainerStyle={{ paddingBottom: wp(5) }}>
          {paymentMethods.map((item) => {
            if (item.companyName != "user-wallet") {
              return (
                <TouchableOpacity
                  onPress={() => setPay(item)}
                  key={item.paymentId}
                  style={{
                    marginHorizontal: wp(10),
                    marginVertical: wp(3),
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                    backgroundColor: "white",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingHorizontal: wp(1),
                    // paddingVertical: wp(1),
                    paddingRight: wp(3),
                    height: wp(12),
                    borderRadius: wp(1),
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image
                      source={{ uri: item.imgUrl }}
                      style={{ width: 35, height: 35 }}
                      resizeMode="contain"
                    />
                    <ResponsiveText
                      style={{
                        fontSize: 3.5,
                        fontFamily: Fonts.ManropeSemiBold,
                        marginLeft: wp(1),
                      }}
                    >
                      {item.paymentName}
                    </ResponsiveText>
                  </View>
                  <TouchableOpacity
                    onPress={() => setPay(item)}
                    style={{
                      width: wp(6),
                      height: wp(6),
                      borderRadius: wp(10),
                      borderWidth: 2.5,
                      alignItems: "center",
                      justifyContent: "center",
                      borderColor: "#2BACE3",
                    }}
                  >
                    <View
                      style={{
                        width: wp(3),
                        height: wp(3),
                        borderRadius: wp(10),
                        backgroundColor:
                          pay.paymentId == item.paymentId ? "#2BACE3" : "white",
                      }}
                    ></View>
                  </TouchableOpacity>
                </TouchableOpacity>
              );
            }
          })}
        </ScrollView>
      </Content>
      <View
        style={{
          paddingHorizontal: wp(4),
          paddingVertical: wp(4),
          borderTopColor: "#EEEEEE",
          borderTopWidth: 1,
          // flexDirection: "row",
          // justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          onPress={handleTransaction}
          style={{
            // width: wp(43.73),
            height: wp(14.93),
            borderRadius: wp(10),
            backgroundColor: "#2BACE3",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <ResponsiveText
            style={{
              color: "white",
              fontFamily: Fonts.ManropeBold,
              fontSize: 4.53,
              marginLeft: 5,
            }}
          >
            Cash In
          </ResponsiveText>
        </TouchableOpacity>
      </View>

      <Loader visible={loading} />
    </Container>
  );
};

export default CashIn;
