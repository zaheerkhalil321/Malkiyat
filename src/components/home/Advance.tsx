import { View, TouchableOpacity, Alert, ScrollView } from "react-native";
import React, { useState } from "react";
import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from "@react-navigation/native";

import { wp } from "../common/Responsive";
import ResponsiveText from "../common/ResponseiveText";
import Dollar from "@src/assets/images/addvace_dol.svg";
import MalIcon from "@src/assets/images/cash-multiple.svg";
import Sound from "@src/assets/images/sound.svg";
import SideIcon from "@src/assets/images/side_ic.svg";
import SmileIcon from "@src/assets/images/smile.svg";
import Fonts from "@src/theme/fonts";
import {
  HighestOfferDataI,
  LowestBidResponseI,
  PropertyI,
} from "@src/services/model";
import { valueWithCommas } from "@src/utils/helperFunction";
import { PriceGuideInterface } from "@src/screens/dashboard/homeV2/Advertise/Advertise";
import UpArrow from "@src/assets/images/up_arrow.svg";
import { store } from "@src/redux";
import { errorModal } from "@src/redux/action-creators";
import { useSafeDispatch } from "@src/hooks/useSafeDispatch";

interface Props {
  bidData: HighestOfferDataI;
  navigation: NavigationProp<ParamListBase>;
  route: RouteProp<ParamListBase>;
  priceDetails: Partial<PriceGuideInterface>;
  type: "Buyer" | "Seller";
  lowestBidData: Partial<LowestBidResponseI>;
}
const Addvance = (props: Partial<Props>) => {
  const { params } = (props?.route?.params as { params: PropertyI }) ?? {};

  const registerUserReducer = store.getState().registerUser.registerUserData;
  const { KycStatus } = registerUserReducer?.propertiesData?.data ?? {};
  const dispatch = useSafeDispatch();
  const [fair, setFair] = useState<boolean>(false);
  const [mal, setMal] = useState<boolean>(false);

  const handleClick = () => {
    if (
      (KycStatus == "3" || KycStatus == "0" || KycStatus == "2") &&
      props.type != "Buyer"
    ) {
      dispatch(errorModal("Proof of Identity is pending!", true, "KYC"));
    } else if (registerUserReducer.appSettings.tradingStatus == "on") {
      props.navigation!.navigate("Advertise", {
        propertyInfo: { ...params },
        priceDetails: { ...props.priceDetails },
        type: props.type,
        lowestBidData: props.lowestBidData,
      });
    } else {
      // Alert.alert(
      //   "MarketPlace has been disabled.You can only sell to malkiyat"
      // );
      store.dispatch(
        errorModal(
          `Market place has been disabled.You can only ${
            props.type == "Seller" ? "sell" : "buy"
          }  ${props.type == "Seller" ? "to" : "from"} Malkiyat.`,
          true,
          "Error"
        ) as any
      );
    }
  };

  return (
    <View
      style={{
        borderWidth: 0.5,
        borderColor: "#C4C4C4",
        borderRadius: wp(3),
        padding: wp(3),
        backgroundColor: "white",
      }}
    >
      <TouchableOpacity
        onPress={() => {
          setFair(!fair);
        }}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Dollar />
          <ResponsiveText style={{ marginLeft: wp(3) }}>
            {`What is ${
              props?.type == "Seller" ? "my " : ""
            }Sqft’s fair price?`}
          </ResponsiveText>
        </View>

        {fair ? (
          <UpArrow color={"#8A8A8E"} width={wp(4.5)} height={wp(4.5)} />
        ) : (
          <SideIcon />
        )}
      </TouchableOpacity>

      {fair && (
        <View
          style={{
            borderColor: "#F3F3F3",
            borderWidth: 1,
            marginVertical: wp(3),
            borderRadius: 5,
            flexDirection: "row",
            justifyContent: "space-between",

            padding: wp(2),
          }}
        >
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <View style={{ marginTop: wp(2) }}>
              <SmileIcon />
            </View>

            <View style={{ marginLeft: wp(4) }}>
              <ResponsiveText style={{ fontSize: 4.27 }}>
                Fair Price
              </ResponsiveText>
              <ResponsiveText
                style={{
                  width: wp(45),
                  // backgroundColor: "red",
                  fontSize: 3.2,
                  color: "#8A8A8E",
                  marginTop: wp(1.5),
                }}
              >
                Based on latest property evaluation
              </ResponsiveText>
            </View>
          </View>
          <View style={{}}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <ResponsiveText style={{ fontSize: 3.2, marginTop: wp(1.5) }}>
                Rs.{" "}
              </ResponsiveText>
              <ResponsiveText
                style={{ fontSize: 5.87, fontFamily: Fonts.ManropeBold }}
              >
                {valueWithCommas(props.priceDetails?.fairPrice ?? 0)}
              </ResponsiveText>
            </View>

            <ResponsiveText
              style={{
                fontSize: 3.2,
                color: "#8A8A8E",
                alignSelf: "flex-end",
                // marginTop: wp(1.5),
              }}
            >
              per Sqft
            </ResponsiveText>
          </View>
        </View>
      )}
      <View
        style={{
          backgroundColor: "#F3F3F3",
          height: 1,
          marginTop: wp(3),
          // marginBottom: wp(2),
          // marginVertical: wp(3),
        }}
      />
      {props.type == "Seller" && (
        <TouchableOpacity
          onPress={() => {
            setMal(!mal);
          }}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: wp(3),
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MalIcon />

            <ResponsiveText style={{ marginLeft: wp(3) }}>
              Why is Malkiyat Buying?
            </ResponsiveText>
          </View>

          {mal ? (
            <UpArrow color={"#8A8A8E"} width={wp(4.5)} height={wp(4.5)} />
          ) : (
            <SideIcon />
          )}
        </TouchableOpacity>
      )}

      {mal && (
        <View
          style={{
            borderWidth: 1,
            borderColor: "#E6EAEB",
            paddingVertical: wp(3),
            paddingHorizontal: wp(4),
            borderRadius: 10,
            marginTop: wp(3),
          }}
        >
          <ResponsiveText
            style={{ fontSize: 3.73, color: "#8A8A8E", lineHeight: 22 }}
          >
            Malkiyat is buying to support the owners of Sqft to achieve a
            minimum sale price that is close to the market value of a property.
            {"\n"}
            To achieve this, Malkiyat is offering to buy Sqft at the price which
            owners will get if an entire property was sold in the market minus
            administrative costs.
          </ResponsiveText>
        </View>
      )}

      <View
        style={{
          backgroundColor: "#F3F3F3",
          height: 1,
          marginBottom: wp(2),
          marginVertical: wp(3),
        }}
      />
      <TouchableOpacity
        onPress={handleClick}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Sound />
          <View>
            <ResponsiveText style={{ marginLeft: wp(3), width: wp(70) }}>
              If not in hurry, you can advertise your asking price{"  "}
            </ResponsiveText>
          </View>
        </View>

        <SideIcon />
      </TouchableOpacity>
    </View>
  );
};

export default Addvance;
