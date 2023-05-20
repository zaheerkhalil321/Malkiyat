import { View, Image, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
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
import UpArrow from "@src/assets/images/up_arrow.svg";
import DownArrow from "@src/assets/images/down_arrow.svg";
import Coin from "@src/assets/images/coi.svg";
import { HighestOfferDataI, PropertyI } from "@src/services/model";
import {
  CHECK_DEBUGGER_STATE,
  valueConverstion,
  valueWithCommas,
} from "@src/utils/helperFunction";
import { PriceGuideInterface } from "@src/screens/dashboard/homeV2/Advertise/Advertise";
import { store } from "@src/redux";
import { errorModal } from "@src/redux/action-creators";
import { useSafeDispatch } from "@src/hooks/useSafeDispatch";
interface Props {
  bidData: HighestOfferDataI;
  propertyDetails: PropertyI;
  navigation: NavigationProp<ParamListBase>;
  route: RouteProp<ParamListBase>;
  priceDetails: Partial<PriceGuideInterface>;
}

const HigherOffer = (props: Partial<Props>) => {
  const [cal, setCal] = useState<boolean>(false);
  const dispatch = useSafeDispatch();
  const data = props.bidData;

  const registerUserReducer = store.getState().registerUser.registerUserData;
  const { KycStatus } = registerUserReducer?.propertiesData?.data ?? {};

  const totalSalePrice = data?.perSmallerUnitOfferPrice
    ? data?.perSmallerUnitOfferPrice *
      (Number(data?.totalForSaleSmallerUnits) > Number(data?.ownedSmallerUnits)
        ? Number(data?.ownedSmallerUnits)
        : Number(data?.totalForSaleSmallerUnits))
    : 0;

  const handleClick = () => {
    if (KycStatus == "3" || KycStatus == "0" || KycStatus == "2") {
      dispatch(errorModal("Proof of Identity is pending!", true, "KYC"));
    } else if (registerUserReducer.appSettings.tradingStatus == "on") {
      props.navigation?.navigate("SellSqftCalculation", {
        params: {
          bidData: props.bidData,
          propertyDetails: props.propertyDetails,
        },
      });
    } else {
      Alert.alert(
        "Market place has been disabled.You can only sell to Malkiyat."
      );
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
        Highest offer
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
                Sale Price
              </ResponsiveText>
              <ResponsiveText
                style={{ fontSize: 3.2, color: "#8A8A8E", width: wp(47) }}
              >
                {registerUserReducer?.appSettings?.tradingStatus == "off"
                  ? ""
                  : data?.message ?? ""}
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
                    registerUserReducer?.appSettings?.tradingStatus == "off"
                      ? 0
                      : data?.perSmallerUnitOfferPrice ?? 0
                  )}
              </ResponsiveText>
              {!CHECK_DEBUGGER_STATE() && (
                <AnimatedNumbers
                  includeComma
                  animateToNumber={Number(
                    registerUserReducer?.appSettings?.tradingStatus == "off"
                      ? 0
                      : data?.perSmallerUnitOfferPrice ?? 0
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
          onPress={() => {
            setCal(!cal);
          }}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            // backgroundColor: "red",
            // paddingHorizontal: wp(4),
            paddingBottom: wp(4),
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Coin style={{ marginRight: wp(4) }} />
            <View>
              <ResponsiveText style={{ fontSize: 4.27, marginBottom: wp(1) }}>
                Profit
              </ResponsiveText>
              {registerUserReducer?.appSettings?.tradingStatus == "on" && (
                <ResponsiveText style={{ fontSize: 3.2, color: "#8A8A8E" }}>
                  If I sell{" "}
                  {data?.ownedSmallerUnits! < data?.totalForSaleSmallerUnits!
                    ? data?.ownedSmallerUnits
                    : data?.totalForSaleSmallerUnits}{" "}
                  Sqft
                </ResponsiveText>
              )}
            </View>
          </View>

          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                alignSelf: "flex-end",
                //   backgroundColor: "red",
                //   paddingTop: wp(10),
              }}
            >
              <ResponsiveText
                style={{ fontSize: 3.2, marginTop: wp(1), color: "#E5A32A" }}
              >
                Rs.{" "}
              </ResponsiveText>
              <ResponsiveText
                style={{
                  fontSize: 5.87,
                  fontFamily: Fonts.ManropeBold,
                  color: "#E5A32A",
                }}
              >
                {CHECK_DEBUGGER_STATE() &&
                  valueConverstion(
                    registerUserReducer?.appSettings?.tradingStatus == "off"
                      ? 0
                      : data?.profit ?? 0
                  )}
              </ResponsiveText>
              {!CHECK_DEBUGGER_STATE() && (
                <AnimatedNumbers
                  includeComma
                  animateToNumber={Number(
                    registerUserReducer?.appSettings?.tradingStatus == "off"
                      ? 0
                      : data?.profit ?? 0
                  )}
                  fontStyle={{
                    fontSize: 22,
                    fontFamily: Fonts.ManropeBold,
                    color: "#E5A32A",
                  }}
                />
              )}
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <ResponsiveText
                style={{
                  fontSize: 3.2,
                  alignSelf: "flex-end",
                  color: "#3577DB",
                  marginRight: wp(2),
                }}
              >
                See calculation
              </ResponsiveText>
              <TouchableOpacity
                onPress={() => {
                  setCal(!cal);
                }}
              >
                {cal ? <UpArrow /> : <DownArrow />}
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
        {cal && (
          <View
            style={{
              borderColor: "#F3F3F3",
              borderWidth: 1,
              marginBottom: wp(2),
              borderRadius: 5,
            }}
          >
            <ResponsiveText
              style={{
                marginVertical: wp(2),
                textAlign: "center",
              }}
            >
              If I sell{" "}
              <ResponsiveText style={{ fontFamily: Fonts.ManropeBold }}>
                {registerUserReducer?.appSettings?.tradingStatus == "off"
                  ? 0
                  : data?.ownedSmallerUnits! < data?.totalForSaleSmallerUnits!
                  ? data?.ownedSmallerUnits
                  : data?.totalForSaleSmallerUnits}{" "}
              </ResponsiveText>{" "}
              Sqft
            </ResponsiveText>
            <View
              style={{
                backgroundColor: "#F3F3F3",
                height: 1,
                // marginBottom: wp(2),
              }}
            />
            <View style={{ padding: wp(3) }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <ResponsiveText style={{ fontSize: 3.73 }}>
                  Purchase price:
                </ResponsiveText>
                <ResponsiveText style={{ fontSize: 3.73 }}>
                  <ResponsiveText style={{ color: "#9E9E9E", fontSize: 3.5 }}>
                    Rs.
                  </ResponsiveText>{" "}
                  {valueWithCommas(
                    registerUserReducer?.appSettings?.tradingStatus == "off"
                      ? 0
                      : data?.totalPurchasePrice! ?? 0
                  )}
                </ResponsiveText>
                {/* {!CHECK_DEBUGGER_STATE() && (
                  <AnimatedNumbers
                    includeComma
                    animateToNumber={Number(data?.totalPurchasePrice ?? 0)}
                    fontStyle={{
                      fontSize: 14,
                      // fontWeight: "bold",
                      color: "#9E9E9E",
                    }}
                  />
                )} */}
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginVertical: wp(1.5),
                }}
              >
                <ResponsiveText style={{ fontSize: 3.73 }}>
                  Sale Price:
                </ResponsiveText>
                <ResponsiveText style={{ fontSize: 3.73 }}>
                  <ResponsiveText style={{ color: "#9E9E9E", fontSize: 3.5 }}>
                    Rs.
                  </ResponsiveText>{" "}
                  {valueWithCommas(
                    registerUserReducer?.appSettings?.tradingStatus == "off"
                      ? 0
                      : totalSalePrice ?? 0
                  )}
                </ResponsiveText>
                {/* {!CHECK_DEBUGGER_STATE() && (
                  <AnimatedNumbers
                    includeComma
                    animateToNumber={Number(data?.totalOfferPrice ?? 0)}
                    fontStyle={{
                      fontSize: 14,
                      // fontWeight: "bold",
                      color: "#9E9E9E",
                    }}
                  />
                )} */}
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <ResponsiveText style={{ fontSize: 3.73 }}>
                  Profit:
                </ResponsiveText>
                <ResponsiveText style={{ fontSize: 3.73 }}>
                  <ResponsiveText style={{ color: "#9E9E9E", fontSize: 3.5 }}>
                    Rs.
                  </ResponsiveText>{" "}
                  {valueConverstion(
                    registerUserReducer?.appSettings?.tradingStatus == "off"
                      ? 0
                      : data?.profit
                      ? Number(totalSalePrice) -
                        Number(data?.totalPurchasePrice)
                      : 0
                  )}
                </ResponsiveText>
                {/* {!CHECK_DEBUGGER_STATE() && (
                  <AnimatedNumbers
                    includeComma
                    animateToNumber={Number(data?.totalProfit ?? 0)}
                    fontStyle={{
                      fontSize: 14,
                      // fontWeight: "bold",
                      color: "#9E9E9E",
                    }}
                  />
                )} */}
              </View>
            </View>
          </View>
        )}
        {!cal && (
          <View
            style={{
              backgroundColor: "#F3F3F3",
              height: 1,
              marginBottom: wp(2),
            }}
          />
        )}

        <TouchableOpacity
          disabled={
            registerUserReducer?.appSettings?.tradingStatus == "off"
              ? true
              : props.bidData?.profit
              ? false
              : true
          }
          onPress={handleClick}
          style={{
            backgroundColor:
              registerUserReducer?.appSettings?.tradingStatus == "off"
                ? "#dedede"
                : props.bidData?.profit
                ? "#2BACE3"
                : "#dedede",
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
            Sell
          </ResponsiveText>
          <SideArrow />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default HigherOffer;
