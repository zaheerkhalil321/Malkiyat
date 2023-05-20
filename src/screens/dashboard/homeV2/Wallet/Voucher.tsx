import { View, Text, TouchableOpacity, BackHandler } from "react-native";
import React, { useEffect, useState } from "react";
import Clipboard from "@react-native-clipboard/clipboard";
import Snackbar from "react-native-snackbar";
import Container from "@src/components/common/Container";
import HomeHeader from "@src/components/ui/HomeHeader/HomeHeader";
import Content from "@src/components/common/Content";
import ResponsiveText from "@src/components/common/ResponseiveText";
import { wp } from "@src/components/common/Responsive";
import Fonts from "@src/theme/fonts";
import HomeIcon from "@src/assets/images/home_i.svg";
import VoucherIcon from "@src/assets/images/voucherIcon.svg";
import { valueWithCommas } from "@src/utils/helperFunction";
import CopyIcon from "@src/assets/images/copytext.svg";
import MRegisterUserApiService from "@src/services/MRegisterUserApiService";
import { useSelector } from "react-redux";
import { RootState } from "@src/redux/reducers";

const Voucher = (props) => {
  const copyToClipboard = () => {
    Clipboard.setString(
      props.route?.params?.Voucher?.challanNo ??
        props.route?.params?.Voucher?.challan_no
    );
    Snackbar.show({
      text: "Copied",
      duration: Snackbar.LENGTH_SHORT,
      backgroundColor: "green",
      textColor: "white",
      fontFamily: Fonts.ManropeBold,
    });
  };
  const userData = useSelector(
    (state: RootState) => state.registerUser.registerUserData?.userInfo
  );

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);
  useEffect(() => {
    MRegisterUserApiService.refreshingApi(userData?.userId);
  }, []);
  const { companyName } = props.route?.params?.item;
  function backAction() {
    props.navigation.push("HomeDrawer");
    return true;
  }

  return (
    <Container>
      <HomeHeader
        backgroundColor={"white"}
        show={true}
        {...props}
        title={"Voucher Details"}
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
          Your voucher has been created successfully.
        </ResponsiveText>
        <ResponsiveText
          style={{
            fontFamily: Fonts.ManropeBold,
            fontSize: 4.8,
            // marginVertical: wp(2),
            marginTop: wp(7),
            color: "#2BACE3",
            marginBottom: wp(3),
          }}
        >
          Details
        </ResponsiveText>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            // marginVertical: wp(3),
          }}
        >
          <ResponsiveText>Voucher ID:</ResponsiveText>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <ResponsiveText
              style={{ fontFamily: Fonts.ManropeBold, marginRight: 10 }}
            >
              {props.route?.params?.Voucher?.challanNo ??
                props.route?.params?.Voucher?.challan_no}
            </ResponsiveText>
            <TouchableOpacity onPress={copyToClipboard}>
              <CopyIcon />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: wp(4),
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
        {/* <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            // marginVertical: wp(3),
          }}
        >
          <ResponsiveText>{props.route?.params?.item.paymentName} Charges:</ResponsiveText>
          <ResponsiveText style={{ fontFamily: Fonts.ManropeBold }}>
            {props.route?.params?.item.paymentName}
          </ResponsiveText>
        </View> */}
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
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            // marginVertical: wp(3),
          }}
        >
          {(Number(props.route?.params?.item?.commission) ||
            Number(props.route?.params?.commission)) > 0 ? (
            <ResponsiveText>
              {" "}
              {props.route?.params?.item?.paymentName} Charges{" "}
              {Number(props.route?.params?.item?.commission) > 0
                ? Number(props.route?.params?.item?.commission) + "%"
                : ""}
              :
            </ResponsiveText>
          ) : null}
          {(Number(props.route?.params?.item?.commission) ||
            Number(props.route?.params?.commission)) > 0 ? (
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
                {valueWithCommas(props.route?.params?.commission)}
              </ResponsiveText>
            </View>
          ) : null}
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
          <ResponsiveText style={{}}>You will pay:</ResponsiveText>
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
                Number(props.route?.params?.amount) +
                  Number(props.route?.params?.commission ?? 0)
              )}
            </ResponsiveText>
          </View>
        </View>
        <ResponsiveText style={{ color: "#828282", marginTop: wp(5) }}>
          Please transfer the amount within 24 hours before the voucher expires.
        </ResponsiveText>
        <ResponsiveText style={{ marginTop: wp(5) }}>
          Steps to Pay
        </ResponsiveText>
        {(companyName == "onelink-voucher" ||
          companyName == "paypro-voucher") && (
          <ResponsiveText
            style={{
              color: "#8A8A8E",
              fontSize: 3.73,
              marginVertical: wp(3),
              lineHeight: 22,
            }}
          >
            1. Login to your Bank App{"\n"}
            2. Go to Billers/Payments{"\n"}
            3.Select {companyName == "onelink-voucher" ? "1 Link" : "PayPro"}
            {"\n"}
            4. Enter Voucher ID to Pay
          </ResponsiveText>
        )}
        {/* {props.route?.params?.item?.companyName == "onelink-voucher" && (
          <ResponsiveText
            style={{
              color: "#8A8A8E",
              fontSize: 3.73,
              marginVertical: wp(3),
              lineHeight: 22,
            }}
          >
            1. Login to your Finca Pay App{"\n"}
            2. Go to Billers/Payments{"\n"}
            3. Select 1Link{"\n"}
            4. Enter Voucher ID to Pay
          </ResponsiveText>
        )} */}
        {props.route?.params?.item?.companyName == "finja-voucher" && (
          <ResponsiveText
            style={{
              color: "#8A8A8E",
              fontSize: 3.73,
              marginVertical: wp(3),
              lineHeight: 22,
            }}
          >
            1. Login to your Finca Pay App{"\n"}
            2. Go to Billers/Payments{"\n"}
            3. Select Malkiyat{"\n"}
            4. Enter Voucher ID to Pay
          </ResponsiveText>
        )}
        {/* <ResponsiveText
          style={{
            fontFamily: Fonts.ManropeBold,
            fontSize: 4.5,
            marginVertical: wp(6),
          }}
        >
          Order ID -{" "}
          {props.route?.params?.Voucher?.challanNo ??
            props.route?.params?.Voucher?.challan_no}{" "}
        </ResponsiveText>
        <ResponsiveText
          style={{
            fontFamily: Fonts.ManropeBold,
            fontSize: 4.5,
            marginVertical: wp(6),
          }}
        >
          Booking information{" "}
        </ResponsiveText>
        <ResponsiveText>
          {`\u2022`} Your {props.route?.params?.data} ID is{" "}
          <ResponsiveText
            style={{
              color: "black",
            }}
          >
            {props.route?.params?.Voucher?.challanNo ??
              props.route?.params?.Voucher?.challan_no}{" "}
          </ResponsiveText>
        </ResponsiveText>
        <View style={{ flexDirection: "row", marginTop: wp(5) }}>
          <ResponsiveText>{"\u2022"}</ResponsiveText>
          <ResponsiveText style={{ flex: 1, paddingLeft: 5 }}>
            An order confirmation email was sent to{" "}
            <ResponsiveText
              style={{
                color: "black",
              }}
            >
              {" "}
              {store.getState().registerUser?.registerUserData?.userInfo?.email}
            </ResponsiveText>{" "}
          </ResponsiveText>
        </View>
        <View style={{ flexDirection: "row", marginTop: wp(5) }}>
          <ResponsiveText>{"\u2022"}</ResponsiveText>
          <ResponsiveText style={{ flex: 1, paddingLeft: 5 }}>
            Your e-voucher will be issued upon verification of details.
          </ResponsiveText>
        </View>
        <View style={{ flexDirection: "row", marginTop: wp(5) }}>
          <ResponsiveText>{"\u2022"}</ResponsiveText>
          <ResponsiveText style={{ flex: 1, paddingLeft: 5 }}>
            Upon issuance, your e-voucher will be emailed to you.
          </ResponsiveText>
        </View> */}
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
            props.navigation.navigate("AllVouchers");
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
            View all vouchers
          </ResponsiveText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.push("HomeDrawer")}
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

export default Voucher;
