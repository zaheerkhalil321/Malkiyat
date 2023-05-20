import { View, BackHandler, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import HomeIcon from "@src/assets/images/home_i.svg";
import Container from "@src/components/common/Container";
import HomeHeader from "@src/components/ui/HomeHeader/HomeHeader";
import Content from "@src/components/common/Content";
import ResponsiveText from "@src/components/common/ResponseiveText";
import { wp } from "@src/components/common/Responsive";
import Fonts from "@src/theme/fonts";
import VoucherIcon from "@src/assets/images/malkiyat_review_logo.svg";
import Wallet from "@src/assets/images/wallet_i.svg";

const MalkiyatBankReview = (props) => {
  const details = {
    AccountTitle: props.route?.params?.accTitle,
    IBAN: props.route?.params?.iban,
    "BANK NAME": props.route?.params?.bankName,
    "Branch & (Code)": props.route?.params?.branchAndCode,
  };

  // const fetchCopiedText = async () => {
  //   const text = await Clipboard.getString();
  //   setCopiedText(text);
  // };
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);
  function backAction() {
    props.navigation.push("HomeDrawer");
    return true;
  }

  return (
    <Container>
      <HomeHeader
        show={true}
        {...props}
        back
        title={"Malkiyat Account Details"}
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
            lineHeight: 30,
          }}
        >
          Please deposit your amount in the account mentioned below.
        </ResponsiveText>
        <ResponsiveText
          style={{
            fontFamily: Fonts.ManropeBold,
            fontSize: 4.4,
            // marginVertical: wp(2),
            marginTop: wp(7),
            color: "#2BACE3",
            marginBottom: wp(3),
          }}
        >
          Bank Details
        </ResponsiveText>
        {Object.entries(details).map((item) => (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: wp(4),
            }}
          >
            <ResponsiveText style={{ flex: 0.5 }}>{item[0]}:</ResponsiveText>

            <ResponsiveText
              style={{
                fontFamily: Fonts.ManropeSemiBold,
                flex: 1,
                fontSize: 3.7,
                textAlign: "right",
              }}
            >
              {item[1]}
            </ResponsiveText>
          </View>
        ))}
        <ResponsiveText
          style={{
            fontFamily: Fonts.ManropeBold,
            fontSize: 4.4,
            // marginVertical: wp(2),
            marginTop: wp(7),
            color: "#2BACE3",
            marginBottom: wp(3),
          }}
        >
          Note
        </ResponsiveText>
        <View style={{ marginBottom: 10 }}>
          <ResponsiveText>{`\u2022 Upload your transaction receipt through Wallet. (Add Funds > Upload Receipt)`}</ResponsiveText>
        </View>
        <View style={{ marginBottom: 10 }}>
          <ResponsiveText>{`\u2022 Or send us proof of transaction on `}</ResponsiveText>
        </View>
        <View
          style={{
            paddingHorizontal: wp(4),
            paddingVertical: wp(4),
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
              marginLeft: -wp(5),
              marginRight: wp(5),
            }}
          >
            <Wallet />
            <ResponsiveText
              style={{
                color: "#00B9F7",
                fontFamily: Fonts.ManropeBold,
                fontSize: 4,
                textAlign: "center",
                marginLeft: 5,
              }}
            >
              Wallet
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
      </Content>
    </Container>
  );
};

export default MalkiyatBankReview;
