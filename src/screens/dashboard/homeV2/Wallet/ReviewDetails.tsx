import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import Container from "@src/components/common/Container";
import HomeHeader from "@src/components/ui/HomeHeader/HomeHeader";
import ResponsiveText from "@src/components/common/ResponseiveText";
import { wp } from "@src/components/common/Responsive";
import Fonts from "@src/theme/fonts";
import Content from "@src/components/common/Content";
import { valueWithCommas } from "@src/utils/helperFunction";
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
import MRegisterUserApiService from "@src/services/MRegisterUserApiService";
interface Props {
  navigation: NavigationProp<ParamListBase>;
  route: RouteProp<any>;
}
const ReviewDetails = (props: Props) => {
  const [payLoading, setPayLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [amount, setAmount] = useState("");
  const registerUserData = useSelector(
    (state: RootState) => state.registerUser.registerUserData
  );
  const { colors } = useTheme();
  useEffect(() => {
    (async () => {
      setPayLoading(true);
      const obj = {
        paymentMethodId: props.route?.params?.item?.paymentId,
        amount: props.route?.params?.amount,
      };

      const res = await MRegisterUserApiService.getCommission(obj);

      setAmount(res.data?.data?.toString() ?? "");
      setPayLoading(false);
    })();
  }, []);

  const handlePay = async () => {
    setLoading(true);
    const initiatePaymentObj = {
      userId: Number(registerUserData?.userInfo?.userId),
      propertyId: null,
      amount: Number(props.route?.params?.amount),
      paymentMethodId: props.route?.params?.item?.paymentId,
    };
    const res = await MUnregisterUserApiService.initiatePayment(
      initiatePaymentObj
    );

    if (res.data?.status == 200) {
      setLoading(false);
      setTimeout(() => {
        props.navigation.navigate("Voucher", {
          ...props.route?.params,
          ...res?.data.data,
          commission: amount,
        });
      }, 300);
    } else {
      setLoading(false);
      Alert.alert(String(res?.data?.message ?? "Something went wrong!"));
    }
  };

  return (
    <Container>
      <HomeHeader
        back
        backgroundColor={"white"}
        show={true}
        {...props}
        title={"Review your informatoion"}
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
            Contact Details
          </ResponsiveText>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <ResponsiveText>Name:</ResponsiveText>
            <ResponsiveText style={{ fontFamily: Fonts.ManropeSemiBold }}>
              {registerUserData?.userInfo?.firstName +
                " " +
                registerUserData?.userInfo?.lastName}
            </ResponsiveText>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: wp(6),
            }}
          >
            <ResponsiveText>Mobile No.</ResponsiveText>
            <ResponsiveText style={{ fontFamily: Fonts.ManropeSemiBold }}>
              {registerUserData.userInfo?.mobileNo}
            </ResponsiveText>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <ResponsiveText>Email</ResponsiveText>
            <ResponsiveText style={{ fontFamily: Fonts.ManropeSemiBold }}>
              {registerUserData?.userInfo?.email}
            </ResponsiveText>
          </View>
          <View
            style={{
              backgroundColor: "#EBEBEB",
              height: 1,
              marginVertical: wp(5),
            }}
          />

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
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <ResponsiveText>Payment Type</ResponsiveText>

            <ResponsiveText>
              {props.route?.params?.item?.paymentName}
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
          <ResponsiveText>Amount:</ResponsiveText>
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
              {valueWithCommas(props.route?.params?.amount)}
            </ResponsiveText>
          </View>
        </View>
        {Number(amount) > 0 ? (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: wp(3),
            }}
          >
            <ResponsiveText>
              {props.route?.params?.item?.paymentName} Charges:
            </ResponsiveText>
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
                {valueWithCommas(amount)}
              </ResponsiveText>
            </View>
          </View>
        ) : null}
        {/* {Number(props.route?.params?.item?.commission) > 0 ? (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              // marginVertical: wp(3),
            }}
          >
            <ResponsiveText>
              {" "}
              {props.route?.params?.item?.paymentName} Charges{" "}
              {props.route?.params?.item?.commission}%:
            </ResponsiveText>
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
                {valueWithCommas(
                  (props.route?.params?.amount *
                    props.route?.params?.item?.commission) /
                    100
                )}
              </ResponsiveText>
            </View>
          </View>
        ) : null} */}
        <View
          style={{
            backgroundColor: "#EBEBEB",
            height: 1,
            marginVertical: wp(5),
          }}
        />
        {payLoading ? (
          <ActivityIndicator size={"small"} color={colors.Primary} />
        ) : (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <ResponsiveText style={{}}>You will Pay:</ResponsiveText>
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
                  Number(props.route?.params?.amount) + Number(amount ?? 0)
                )}
              </ResponsiveText>
            </View>
          </View>
        )}
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
          disabled={loading ? true : false}
          onPress={handlePay}
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
            <ResponsiveText
              style={{
                color: "white",
                fontFamily: Fonts.ManropeBold,
                fontSize: 4.53,
                marginRight: 10,
              }}
            >
              Create Voucher
            </ResponsiveText>
          )}
          <Arrow />
        </TouchableOpacity>
      </View>
    </Container>
  );
};

export default ReviewDetails;
