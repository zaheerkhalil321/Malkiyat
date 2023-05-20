import { View, Text, TouchableOpacity, BackHandler } from "react-native";
import React, { useEffect } from "react";
import {
  useTheme,
  NavigationProp,
  ParamListBase,
  RouteProp,
} from "@react-navigation/native";
import Container from "@src/components/common/Container";
import HomeHeader from "@src/components/ui/HomeHeader/HomeHeader";
import Content from "@src/components/common/Content";
import ResponsiveText from "@src/components/common/ResponseiveText";
import { wp } from "@src/components/common/Responsive";
import Fonts from "@src/theme/fonts";
import HomeIcon from "@src/assets/images/home_i.svg";
import { store } from "@src/redux";
import VoucherIcon from "@src/assets/images/paymentDetail.svg";
import { valueWithCommas } from "@src/utils/helperFunction";
import { CashOutUserInfoI } from "../Wallet/CashOutModal";
import { useSelector } from "react-redux";
import { RootState } from "@src/redux/reducers";
import MRegisterUserApiService from "@src/services/MRegisterUserApiService";

interface Props {
  navigation: NavigationProp<ParamListBase>;
  route: RouteProp<{
    info: { info: CashOutUserInfoI & { amount: string; fullName: string } };
  }>;
}

const PaymentDetail = (props: Props) => {
  const userData = useSelector(
    (state: RootState) => state.registerUser.registerUserData?.userInfo
  );
  //   props.navigation.goBack();
  useEffect(() => {
    MRegisterUserApiService.refreshingApi(userData?.userId);
  }, []);

  const registerUserData = useSelector(
    (state: RootState) => state.registerUser.registerUserData
  );
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);
  function backAction() {
    props.navigation.push("HomeDrawer");
    return true;
  }

  console.log(props, "llll");
  return (
    <Container>
      <HomeHeader
        backgroundColor={"white"}
        show={true}
        {...props}
        title={"Payment Details"}
      />
      <Content style={{ paddingHorizontal: wp(3), flex: 1 }}>
        <View style={{ alignItems: "center" }}>
          <VoucherIcon width={wp(40)} height={wp(40)} />
        </View>
        <ResponsiveText
          style={{
            fontSize: 5.33,
            color: "#828282",
            fontFamily: Fonts.ManropeSemiBold,
            marginTop: wp(5),
          }}
        >
          Your request has been submitted successfully.
        </ResponsiveText>
        <ResponsiveText
          style={{
            fontFamily: Fonts.ManropeBold,
            fontSize: 4.3,
            marginVertical: wp(2),
            marginTop: wp(5),
            marginBottom: wp(5),
            color: "#2BACE3",
          }}
        >
          Bank Details
        </ResponsiveText>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <ResponsiveText>{"Account Title"}:</ResponsiveText>
          <ResponsiveText
            style={{
              fontFamily: Fonts.ManropeSemiBold,
              marginBottom: wp(2),
            }}
          >
            {props?.route?.params?.item?.accTitle}
            {/* {accountTitle} */}
          </ResponsiveText>
        </View>

        {props?.route?.params?.item?.accNo ? (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: wp(6),
            }}
          >
            <ResponsiveText
              style={{
                flexWrap: "wrap",
                width: wp(45),
              }}
            >
              Account No:
            </ResponsiveText>
            <ResponsiveText
              style={{
                fontFamily: Fonts.ManropeSemiBold,
                width: wp(
                  props?.route?.params?.item?.accNo.length! > 18 ? 50 : 40
                ),
                flexWrap: "wrap",
                textAlign: "right",
                fontSize:
                  props?.route?.params?.item?.accNo.length! > 18 ? 3 : 4,
                marginLeft:
                  props?.route?.params?.item?.accNo.length! > 18 ? -50 : 0,
              }}
            >
              {props?.route?.params?.item?.accNo}
            </ResponsiveText>
          </View>
        ) : null}

        {/* <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            // marginVertical: wp(3),
          }}
        >
          <ResponsiveText>
            {props.route?.params?.item?.paymentName} Charges{" "}
            {props.route?.params?.item?.commission}%:
          </ResponsiveText>
          <ResponsiveText style={{ fontFamily: Fonts.ManropeBold }}>
            Rs. {valueWithCommas(props.route?.params?.Voucher?.amount)}
          </ResponsiveText>
        </View> */}

        {props?.route?.params?.item?.bankName ? (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: wp(6),
            }}
          >
            <ResponsiveText>Bank Name:</ResponsiveText>
            <ResponsiveText style={{ fontFamily: Fonts.ManropeSemiBold }}>
              {props?.route?.params?.item?.bankName}
            </ResponsiveText>
          </View>
        ) : null}

        {props?.route?.params?.item?.transactionId ? (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: wp(6),
            }}
          >
            <ResponsiveText>Transaction ID:</ResponsiveText>
            <ResponsiveText style={{ fontFamily: Fonts.ManropeSemiBold }}>
              {props?.route?.params?.item?.transactionId}
            </ResponsiveText>
          </View>
        ) : null}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: wp(6),
          }}
        >
          <ResponsiveText>Amount:</ResponsiveText>
          <ResponsiveText style={{ fontFamily: Fonts.ManropeSemiBold }}>
            Rs. {valueWithCommas(props?.route?.params?.amount)}
          </ResponsiveText>
        </View>

        <ResponsiveText style={{ color: "#828282", marginTop: wp(5) }}>
          Your amount will be deposited to your wallet within 2 working days.
        </ResponsiveText>
      </Content>
      <View
        style={{
          paddingHorizontal: wp(4),
          paddingVertical: wp(4),
          borderTopColor: "#EEEEEE",
          borderTopWidth: 1,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            props.navigation.push("Wallet");
          }}
          style={{
            width: wp(43.73),
            height: wp(14.93),
            borderRadius: wp(10),
            borderColor: "#00B9F7",
            borderWidth: 1,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          {/* <Wallet /> */}
          <ResponsiveText
            style={{
              color: "#00B9F7",
              fontFamily: Fonts.ManropeBold,
              fontSize: 4,
              textAlign: "center",
              // marginLeft: 10,
            }}
          >
            Wallet
          </ResponsiveText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.navigation.push("HomeDrawer");
          }}
          style={{
            width: wp(43.73),
            height: wp(14.93),
            borderRadius: wp(10),
            backgroundColor: "#2BACE3",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <HomeIcon />
          <ResponsiveText
            style={{
              color: "white",
              fontFamily: Fonts.ManropeBold,
              fontSize: 4.53,
              marginLeft: 5,
            }}
          >
            Go to home
          </ResponsiveText>
          {/* <Arrow /> */}
        </TouchableOpacity>
      </View>
    </Container>
  );
};

function headerDetails(params: Readonly<CashOutUserInfoI>): string {
  console.log(params);

  if (params.bankSelected) {
    return "Details";
  }
  if (params.easyPaisaSelected) {
    return "Account Details";
  }
  return "";
}
export default PaymentDetail;
