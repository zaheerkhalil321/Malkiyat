import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import Container from "@src/components/common/Container";
import HomeHeader from "@src/components/ui/HomeHeader/HomeHeader";
import ResponsiveText from "@src/components/common/ResponseiveText";
import { wp } from "@src/components/common/Responsive";
import Fonts from "@src/theme/fonts";
import Content from "@src/components/common/Content";
import { checkTotalAmount, valueWithCommas } from "@src/utils/helperFunction";
import {
  NavigationProp,
  ParamListBase,
  RouteProp,
  useTheme,
} from "@react-navigation/native";
import { useSelector } from "react-redux";
import { RootState } from "@src/redux/reducers";
import MUnregisterUserApiService from "@src/services/MUnregisterUserApiService";
import Loader from "@src/components/ui/loader/Loader";
import ReviewIcon from "@src/assets/images/review_ic.svg";
import Arrow from "@src/assets/images/left_arrow.svg";
import { CashOutUserInfoI } from "../Wallet/CashOutModal";
import MRegisterUserApiService from "@src/services/MRegisterUserApiService";
import { BalanceInterface } from "../Wallet/Wallet";
interface Props {
  navigation: NavigationProp<ParamListBase>;
  route: RouteProp<{
    info: {
      info: CashOutUserInfoI & { amount: string; data: BalanceInterface };
    };
  }>;
}
const CashOutReview = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const registerUserData = useSelector(
    (state: RootState) => state.registerUser.registerUserData
  );

  const { bankSelected, chequeSelected, easyPaisaSelected, commonObj, data } =
    props.route.params.info;
  const cashOutObj = {
    userId: registerUserData?.userInfo?.userId,
    amount: props.route?.params?.info?.amount,
    paymentMethodId: props.route?.params?.info?.paymentMethodId,
    bankName: props.route?.params?.info.commonObj?.bankName ?? "",
    accTitle: props.route?.params?.info.accountTitle ?? "",
    accNo: props.route?.params?.info.commonObj?.accountNo ?? "",
    address: props.route?.params?.info.commonObj?.address ?? "",
    bankId: props.route?.params?.info.commonObj?.bankId ?? "",
  };
  const actualAmount =
    Number(props.route?.params?.info.amount) - Number(chequeSelected ? 240 : 0);

  const handleClick = async () => {
    setLoading(true);
    const res = await MRegisterUserApiService.sendCashOutOtp(
      Number(registerUserData.userInfo?.userId!)
    );
    if (res.data.code == 200) {
      setLoading(false);
      props.navigation.navigate("CashOutOtp", {
        cashOutObj,
        info: props.route.params.info,
      });
    } else {
      setLoading(false);
    }
  };
  return (
    <Container>
      <HomeHeader
        back
        backgroundColor={"white"}
        show={true}
        {...props}
        title={"Review your information"}
      />
      <View style={{ paddingHorizontal: wp(6), flexGrow: 1 }}>
        <View style={{ alignItems: "center", marginVertical: wp(8) }}>
          <ReviewIcon />
        </View>

        <View style={{}}>
          <ResponsiveText
            style={{
              fontFamily: Fonts.ManropeBold,
              fontSize: 4.3,
              marginVertical: wp(2),
              marginTop: wp(5),
              color: "#2BACE3",
            }}
          >
            {headerDetails(props.route.params.info)}
          </ResponsiveText>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <ResponsiveText>
              {!easyPaisaSelected ? "Account Title" : "Name"}:
            </ResponsiveText>
            <ResponsiveText style={{ fontFamily: Fonts.ManropeSemiBold }}>
              {props.route.params.info.accountTitle}
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
                  fontFamily: Fonts.ManropeBold,
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
                  fontSize: commonObj?.accountNo?.length! > 18 ? 3 : 4,
                  alignSelf: "center",
                }}
              >
                {bankSelected
                  ? commonObj?.accountNo
                  : registerUserData.userInfo?.mobileNo}
              </ResponsiveText>
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
                  fontFamily: Fonts.ManropeBold,
                  fontSize: 4,
                  width: wp(50),
                  flexWrap: "wrap",
                  textAlign: "right",
                }}
              >
                {props.route?.params?.info.commonObj?.address?.replace(
                  /(\r\n|\n|\r)/gm,
                  ""
                )}
              </ResponsiveText>
            </View>
          )}
          <View
            style={{
              backgroundColor: "#EBEBEB",
              height: 1,
              marginVertical: wp(5),
            }}
          />
          {bankSelected && (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: wp(7),
              }}
            >
              <ResponsiveText>Bank Name:</ResponsiveText>
              <ResponsiveText style={{ fontFamily: Fonts.ManropeSemiBold }}>
                {commonObj?.bankName ?? "Bank Name is not available"}
              </ResponsiveText>
            </View>
          )}

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
            Payment Details:
          </ResponsiveText>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <ResponsiveText>Payment Type:</ResponsiveText>

            <ResponsiveText style={{ fontFamily: Fonts.ManropeBold }}>
              {bankSelected
                ? "Bank Transfer"
                : easyPaisaSelected
                  ? "Easypaisa"
                  : "Cheque"}
            </ResponsiveText>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: wp(3),
          }}
        >
          <ResponsiveText>{"Amount"}:</ResponsiveText>
          <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
            <ResponsiveText
              style={{
                fontFamily: Fonts.ManropeSemiBold,
                color: "#9E9E9E",
                fontSize: 3.73,
              }}
            >
              Rs.{" "}
            </ResponsiveText>
            <ResponsiveText
              style={{ fontFamily: Fonts.ManropeBold, fontSize: 4 }}
            >
              {valueWithCommas(props.route?.params?.info.amount)}
            </ResponsiveText>
          </View>
        </View>
        {chequeSelected && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <ResponsiveText>Courier Charges:</ResponsiveText>
            <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
              <ResponsiveText
                style={{
                  fontFamily: Fonts.ManropeSemiBold,
                  color: "#9E9E9E",
                  fontSize: 3.73,
                }}
              >
                Rs.{" "}
              </ResponsiveText>
              <ResponsiveText
                style={{ fontFamily: Fonts.ManropeBold, fontSize: 4 }}
              >
                240
              </ResponsiveText>
            </View>
          </View>
        )}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            // marginVertical: wp(3),
          }}
        >
          {/* <ResponsiveText> */}
          {/* {" "}
                        {props.route?.params?.item?.paymentName} Charges{" "}
                        {props.route?.params?.item?.commission}%: */}
          {/* You will receive */}
          {/* </ResponsiveText> */}
          {/* <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
            <ResponsiveText
              style={{
                fontFamily: Fonts.ManropeSemiBold,
                color: "#9E9E9E",
                fontSize: 3.73,
              }}
            >
              Rs.{" "}
            </ResponsiveText>
            <ResponsiveText
              style={{ fontFamily: Fonts.ManropeBold, fontSize: 4 }}
            >
              {valueWithCommas(props.route?.params?.info.amount)}
            </ResponsiveText>
          </View> */}
        </View>
        <View
          style={{
            backgroundColor: "#EBEBEB",
            height: 1,
            marginVertical: wp(5),
          }}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <ResponsiveText style={{}}>{"You will receive"}:</ResponsiveText>
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
              {valueWithCommas(actualAmount)}
            </ResponsiveText>
          </View>
        </View>
      </View>

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
          // onPress={handlePay}
          disabled={loading ? true : false}
          onPress={handleClick}
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
          {loading ? (
            <ActivityIndicator size={"small"} color={"white"} />
          ) : (
            <>
              <ResponsiveText
                style={{
                  color: "white",
                  fontFamily: Fonts.ManropeBold,
                  fontSize: 4.53,
                  marginRight: 10,
                }}
              >
                Submit
              </ResponsiveText>
              <Arrow />
            </>
          )}
        </TouchableOpacity>
      </View>
    </Container>
  );
};

function headerDetails(params: Readonly<CashOutUserInfoI>): string {
  if (params.bankSelected || params.chequeSelected) {
    return "Contact Details";
  }
  if (params.easyPaisaSelected) {
    return "Account Details";
  }
  return "Details";
}

export default CashOutReview;
