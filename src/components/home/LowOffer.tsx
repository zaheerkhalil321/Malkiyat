import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import AnimatedNumbers from "react-native-animated-numbers";
import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from "@react-navigation/native";

import ResponsiveText from "../common/ResponseiveText";
import Fonts from "@src/theme/fonts";
import { wp } from "../common/Responsive";
import SideArrow from "@src/assets/images/side_a.svg";
import { LowestBidResponseI, PropertyI } from "@src/services/model";
import {
  CHECK_DEBUGGER_STATE,
  valueConverstion,
} from "@src/utils/helperFunction";
import { PriceGuideInterface } from "@src/screens/dashboard/homeV2/Advertise/Advertise";
import { store } from "@src/redux";
interface Props {
  propertyDetails: PropertyI;
  navigation: NavigationProp<ParamListBase>;
  route: RouteProp<ParamListBase>;
  lowestBidData: LowestBidResponseI;
  priceDetails: Partial<PriceGuideInterface>;
}

const LowOffer = (props: Partial<Props>) => {
  const registerUserReducer = store.getState().registerUser.registerUserData;

  const handleClick = () => {
    //! IN CASE OF BUY KYCSTATUS WILL NO BE CHECKED

    // if (registerUserReducer?.propertiesData?.KycStatus == "false") {
    //   dispatch(errorModal("Proof of Identity is pending!", true, "KYC"));
    // } else

    if (registerUserReducer.appSettings.tradingStatus == "on") {
      props.navigation?.navigate("BuySqftCalculation", {
        params: {
          lowestBidData: props.lowestBidData,
          propertyDetails: props.propertyDetails,
        },
      });
    } else {
      props.navigation?.navigate("RegisterBuyNowStack");
    }
  };
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={{
        borderWidth: 1,
        borderColor: "#FF9A2E",
        borderRadius: wp(3),
        paddingTop: wp(3),
        backgroundColor: "white",
      }}
    >
      <ResponsiveText
        style={{
          fontSize: 4.27,
          fontFamily: Fonts.ManropeBold,
          textAlign: "center",
        }}
      >
        Lowest offer
      </ResponsiveText>
      <View
        style={{ backgroundColor: "#F3F3F3", height: 1, marginTop: wp(2) }}
      />
      <View style={{ paddingHorizontal: wp(4) }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: wp(4),
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              style={{ width: wp(6.4), height: wp(6.4), marginRight: wp(4) }}
              source={require("@src/assets/images/brought.png")}
            />
            <View>
              <ResponsiveText style={{ fontSize: 4.27, marginBottom: wp(1) }}>
                Buying Price
              </ResponsiveText>
              <ResponsiveText
                style={{ fontSize: 3.2, color: "#8A8A8E", width: wp(47) }}
              >
                {registerUserReducer.appSettings.tradingStatus == "off"
                  ? ""
                  : props.lowestBidData?.message ?? ""}
              </ResponsiveText>
            </View>
          </View>

          <View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <ResponsiveText
                style={{ fontSize: 3.2, marginTop: wp(1), color: "#C0392C" }}
              >
                Rs.{" "}
              </ResponsiveText>
              <ResponsiveText
                style={{
                  fontSize: 5.87,
                  fontFamily: Fonts.ManropeBold,
                  color: "#C0392C",
                }}
              >
                {CHECK_DEBUGGER_STATE() &&
                  valueConverstion(
                    registerUserReducer.appSettings.tradingStatus == "off"
                      ? 0
                      : !store.getState().registerUser?.registerUserData
                      ? 0
                      : props.lowestBidData?.minimumSmallerUnitOfferPrice ?? 0
                  )}
              </ResponsiveText>
              {!CHECK_DEBUGGER_STATE() && (
                <AnimatedNumbers
                  includeComma
                  animateToNumber={Number(
                    props.lowestBidData?.minimumSmallerUnitOfferPrice ?? 0
                  )}
                  fontStyle={{
                    fontSize: 22,
                    fontFamily: Fonts.ManropeBold,
                    color: "#C0392C",
                  }}
                />
              )}
            </View>

            <ResponsiveText
              style={{ fontSize: 3.2, alignSelf: "flex-end", color: "#8A8A8E" }}
            >
              per Sqft
            </ResponsiveText>
          </View>
        </View>
        <View
          style={{
            backgroundColor: "#F3F3F3",
            height: 1,
            marginVertical: wp(4),
          }}
        />

        <TouchableOpacity
          disabled={
            registerUserReducer.appSettings.tradingStatus == "off"
              ? true
              : !store.getState().registerUser?.registerUserData
              ? true
              : props.lowestBidData?.minimumSmallerUnitOfferPrice
              ? false
              : true
          }
          onPress={handleClick}
          style={{
            backgroundColor:
              registerUserReducer.appSettings.tradingStatus == "off"
                ? "#dedede"
                : !store.getState().registerUser?.registerUserData
                ? "#dedede"
                : props.lowestBidData?.minimumSmallerUnitOfferPrice
                ? "#2BACE3"
                : "#dedede",
            // backgroundColor: "#2BACE3",
            height: wp(10.67),
            borderRadius: wp(10),
            justifyContent: "center",
            alignItems: "center",
            marginBottom: wp(4),
            marginTop: wp(2),
            flexDirection: "row",
          }}
        >
          <ResponsiveText
            style={{
              color: "white",
              fontFamily: Fonts.ManropeSemiBold,
              marginRight: wp(3),
            }}
          >
            Buy
          </ResponsiveText>
          <SideArrow />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default LowOffer;
