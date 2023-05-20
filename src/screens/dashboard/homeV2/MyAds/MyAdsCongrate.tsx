import { View, Text, TouchableOpacity, BackHandler, ImageBackground } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-navigation";
import Container from "@src/components/common/Container";
import Content from "@src/components/common/Content";
import ResponsiveText from "@src/components/common/ResponseiveText";
import Fonts from "@src/theme/fonts";
import { wp } from "@src/components/common/Responsive";
import Con from "@src/assets/images/rev.svg";
import Union from "@src/assets/images/Union.svg";
import {
  CommonActions,
  NavigationProp,
  ParamListBase,
  RouteProp,
  useTheme,
} from "@react-navigation/native";
import Wallet from "@src/assets/images/wallet_i.svg";
import HomeIcon from "@src/assets/images/home_i.svg";
import MRegisterUserApiService from "@src/services/MRegisterUserApiService";
import { store } from "@src/redux";
import Loader from "@src/components/ui/loader/Loader";
import { CreateBidI, PropertyI } from "@src/services/model";
import { valueWithCommas } from "@src/utils/helperFunction";
import Icon2 from "@src/assets/images/congrate_i.png";
interface Props {
  navigation: NavigationProp<ParamListBase>;
  route: RouteProp<ParamListBase>;
}

const MyAdsCongrate = (props) => {
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
    <Container style={{ backgroundColor: "white" }}>
      <Content
        bounces={false}
        contentContainerStyle={{ flexGrow: 1 }}
        style={{ flex: 1 }}
      >
        <View>
          {/* <View
            style={{
              backgroundColor: "#2BACE3",
              height: wp(60),
              borderBottomEndRadius: 20,
              alignItems: "center",
              // justifyContent: "center",
              flex: 1,
            }}
          >
            <ResponsiveText
              style={{
                fontFamily: Fonts.ManropeBold,
                fontSize: 5.6,
                color: "white",
                marginTop: wp(5),
              }}
            >
              Malkiyat
            </ResponsiveText>
          </View> */}
          <ImageBackground
            style={{
              width: wp(100),
              height: wp(100),
              justifyContent: "center",
              alignItems: "center",
            }}
            source={Icon2}
          >
            <ResponsiveText
              style={{
                fontFamily: Fonts.ManropeBold,
                fontSize: 5.6,
                color: "white",
                // marginTop: wp(5),
              }}
            >
              Malkiyat
            </ResponsiveText>
          </ImageBackground>
          {/* <Union /> */}
        </View>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <View style={{ position: "absolute", top: -wp(33) }}>
            <Con />
          </View>
          <ResponsiveText
            style={{
              fontSize: 6.4,
              fontFamily: Fonts.ManropeSemiBold,
              color: "#4E4E4E",
              marginTop: -wp(20),
              textAlign: "center",
            }}
          >
            Your Ad has been{"\n"}
            cancelled successfully
          </ResponsiveText>
        </View>
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
          onPress={() => props.navigation.navigate("MyAds")}
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
            My Ads
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

export default MyAdsCongrate;
