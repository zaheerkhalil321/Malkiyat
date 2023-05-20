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
import VoucherIcon from "@src/assets/images/cashSucess.svg";
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

const CashOutSucess = (props: Props) => {
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
  const {
    bankSelected,
    chequeSelected,
    easyPaisaSelected,
    commonObj,
    accountTitle,
  } = props.route.params.info;

  return (
    <Container>
      <HomeHeader
        backgroundColor={"white"}
        show={true}
        {...props}
        title={
          chequeSelected || bankSelected ? "Payment Details" : "Voucher Details"
        }
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
          {headerDetails(props.route.params.info)}
        </ResponsiveText>
        {chequeSelected && (
          <ResponsiveText
            style={{
              fontFamily: Fonts.ManropeBold,
              fontSize: 4.3,
              // marginVertical: wp(2),
              // marginTop: wp(5),
              color: "#2BACE3",
              marginBottom: wp(4),
            }}
          >
            Bank Details
          </ResponsiveText>
        )}
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <ResponsiveText>
            {bankSelected ? "Account Title" : "Name"}:
          </ResponsiveText>
          <ResponsiveText
            style={{
              fontFamily: Fonts.ManropeSemiBold,
              marginBottom: chequeSelected ? wp(2) : 0,
            }}
          >
            {accountTitle}
          </ResponsiveText>
        </View>

        {(bankSelected || easyPaisaSelected) && (
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
              {bankSelected ? "Account Number/IBAN" : "Account Number"}:
            </ResponsiveText>
            <ResponsiveText
              style={{
                fontFamily: Fonts.ManropeSemiBold,
                width: wp(40),
                flexWrap: "wrap",
                textAlign: "right",
              }}
            >
              {bankSelected
                ? commonObj?.accountNo
                : registerUserData.userInfo?.mobileNo}
            </ResponsiveText>
          </View>
        )}

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
        {bankSelected && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: wp(6),
            }}
          >
            <ResponsiveText>Bank Name:</ResponsiveText>
            <ResponsiveText style={{ fontFamily: Fonts.ManropeSemiBold }}>
              {commonObj?.bankName ?? "Bank Name is not available"}
            </ResponsiveText>
          </View>
        )}
        {!chequeSelected && (
          <View
            style={{
              backgroundColor: "#EBEBEB",
              height: 1,
              marginVertical: wp(5),
            }}
          />
        )}

        {/* {bankSelected && (
          <ResponsiveText
            style={{
              fontFamily: Fonts.ManropeBold,
              fontSize: 4.3,
              // marginVertical: wp(2),
              // marginTop: wp(5),
              color: "#2BACE3",
              marginBottom: wp(3),
            }}
          >
            Payment Details
          </ResponsiveText>
        )} */}
        {!chequeSelected && (
          // <View
          //   style={{ flexDirection: "row", justifyContent: "space-between" }}
          // >
          //   <ResponsiveText>You will recieve</ResponsiveText>

          //   <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
          //     <ResponsiveText
          //       style={{
          //         fontFamily: Fonts.ManropeSemiBold,
          //         color: "#9E9E9E",
          //         fontSize: 3.73,
          //       }}
          //     >
          //       Rs.{" "}
          //     </ResponsiveText>
          //     <ResponsiveText
          //       style={{ fontFamily: Fonts.ManropeBold, fontSize: 4 }}
          //     >
          //       {valueWithCommas(props.route?.params?.info.amount)}
          //     </ResponsiveText>
          //   </View>
          // </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <ResponsiveText style={{}}>
              {bankSelected ? "You will receive" : "Cheque amount"}:
            </ResponsiveText>
            <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
              <ResponsiveText
                style={{
                  fontFamily: Fonts.ManropeSemiBold,
                  color: "#2BACE3",
                  fontSize: 3.73,
                  marginBottom: wp(1),
                }}
              >
                Rs.{" "}
              </ResponsiveText>
              <ResponsiveText
                style={{
                  fontFamily: Fonts.ManropeBold,
                  color: "#2BACE3",
                  fontSize: 6.4,
                }}
              >
                {valueWithCommas(
                  Number(props.route?.params?.info.amount) -
                    (chequeSelected ? Number(240) : 0)
                )}
              </ResponsiveText>
            </View>
          </View>
        )}
        {chequeSelected && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: wp(3),
            }}
          >
            <ResponsiveText>Address:</ResponsiveText>

            <ResponsiveText
              style={{
                fontSize: 4,
                width: wp(50),
                flexWrap: "wrap",
                textAlign: "right",
              }}
            >
              {props.route?.params?.info.commonObj?.address}
            </ResponsiveText>
          </View>
        )}
        <ResponsiveText style={{ color: "#828282", marginTop: wp(5) }}>
          {chequeSelected
            ? "Your cheque will be dispatched to your address within 3 working days."
            : "The amount will be transferred to your bank account within 72 hours."}
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
export default CashOutSucess;
