import { View, ScrollView, Platform } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  ParamListBase,
  RouteProp,
  NavigationProp,
} from "@react-navigation/native";

import Container from "@src/components/common/Container";
import HomeHeader from "@src/components/ui/HomeHeader/HomeHeader";
import Icon2 from "@src/assets/images/own.svg";
import Icon3 from "@src/assets/images/sqq.svg";
import Icon1 from "@src/assets/images/person.svg";
import { wp } from "@src/components/common/Responsive";
import ResponsiveText from "@src/components/common/ResponseiveText";
import Fonts from "@src/theme/fonts";
import {
  EventMessageI,
  LowestBidResponseI,
  MainResponse,
  PropertyDetailI,
} from "@src/services/model";
import { valueConverstion } from "@src/utils/helperFunction";
import EventEmitter from "@src/events/EventEmitter";
import { Events } from "@src/events/Events";
import MRegisterUserApiService from "@src/services/MRegisterUserApiService";
import { store } from "@src/redux";

interface Props {
  navigation: NavigationProp<ParamListBase>;
  route: RouteProp<ParamListBase>;
}
const BuyDetails = (props: Props) => {
  const data = props.route?.params as {
    bidData: LowestBidResponseI;
    newSqfts: number;
    property: PropertyDetailI;
  };
  const componentMounted = useRef(true);

  const [bidData, setBidData] = useState<LowestBidResponseI>(data.bidData);
  useEffect(() => {
    callLowestBidApi();
  }, []);
  useEffect(() => {
    EventEmitter.on(
      Events.ReceivedMessage,
      (message: MainResponse<EventMessageI>) => {
        if (componentMounted.current) callLowestBidApi();
      }
    );
    return () => {
      EventEmitter.off(Events.ReceivedMessage, () => {});
      componentMounted.current = false;
    };
  }, []);
  async function callLowestBidApi() {
    const obj = {
      userId: store.getState().registerUser?.registerUserData?.userInfo?.userId,
      propertyId: data.property.propertyId,
      // unitCount: 1,
    };
    const res = await MRegisterUserApiService.lowestBidOffer(obj);
    setBidData(res.data.data);
  }

  return (
    <Container>
      <HomeHeader back backgroundColor={"white"} show={true} {...props} />
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: wp(5),
          marginTop: wp(5),
          marginBottom: wp(5),
        }}
      >
        <View style={{ alignItems: "center", width: wp(30) }}>
          <Icon1 width={wp(5.87)} height={wp(7.47)} />
          <ResponsiveText style={{ marginTop: wp(1) }}>Buyer</ResponsiveText>
        </View>
        <View style={{ alignItems: "center", width: wp(30) }}>
          <Icon2 width={wp(5.87)} height={wp(7.47)} />
          <ResponsiveText style={{ marginTop: wp(1) }}>Buying</ResponsiveText>
        </View>
        <View style={{ alignItems: "center", width: wp(30) }}>
          <Icon3 width={wp(5.87)} height={wp(7.47)} />
          <ResponsiveText style={{ marginTop: wp(1) }}>
            Price / Sqft(Rs.)
          </ResponsiveText>
        </View>
      </View>
      <View style={{ paddingHorizontal: wp(5) }}>
        <ResponsiveText
          style={{ color: "#8A8A8E", fontSize: 3.2, marginTop: wp(1) }}
        >
          Best Offer
        </ResponsiveText>
        <ResponsiveText style={{ color: "#8A8A8E", fontSize: 3.2 }}>
          {bidData?.message}
        </ResponsiveText>

        <View
          style={{
            borderColor: "#FF9A2E",
            borderWidth: 1,
            marginTop: wp(2),
            borderRadius: wp(1.5),
            paddingVertical: wp(3),
          }}
        >
          {bidData?.lowestOffer?.map((item, index) => (
            <View key={index}>
              <View style={{ flexDirection: "row" }}>
                <ResponsiveText style={{ textAlign: "center", width: wp(30) }}>
                  {item?.userName}
                </ResponsiveText>
                <ResponsiveText style={{ textAlign: "center", width: wp(30) }}>
                  {item?.smallerUnitCount ?? ""}
                </ResponsiveText>
                <ResponsiveText
                  style={{
                    textAlign: "center",
                    width: wp(30),
                    fontFamily: Fonts.ManropeBold,
                  }}
                >
                  {valueConverstion(item?.amount ?? 0)}
                </ResponsiveText>
              </View>
              {bidData?.lowestOffer?.length - 1 == index ? null : (
                <View
                  style={{
                    backgroundColor: "#F3F3F3",
                    height: 1,
                    marginVertical: wp(2),
                  }}
                />
              )}
            </View>
          ))}
        </View>
      </View>

      <View style={{ paddingHorizontal: wp(5) }}>
        <ResponsiveText
          style={{ color: "#8A8A8E", fontSize: 3.2, marginTop: wp(7) }}
        >
          Remaining offers
        </ResponsiveText>
        <ScrollView
          style={{
            borderColor: "#F3F3F3",
            borderWidth: 1,
            marginTop: wp(3),
            borderRadius: wp(1.5),
            marginBottom: Platform.OS == "ios" ? 100 : 10,
            // paddingTop: wp(3),
          }}
        >
          {bidData?.bidOffers
            ?.slice(bidData.lowestOffer.length)
            ?.map((item, index) => (
              <View key={index}>
                <View
                  style={{
                    flexDirection: "row",
                    // backgroundColor: "red",
                    marginVertical: wp(2),
                  }}
                >
                  <ResponsiveText
                    style={{
                      textAlign: "center",
                      width: wp(30),
                      color: "#9E9E9E",
                    }}
                  >
                    {item?.userName}
                  </ResponsiveText>
                  <ResponsiveText
                    style={{
                      textAlign: "center",
                      width: wp(30),
                      color: "#9E9E9E",
                    }}
                  >
                    {item?.smallerUnitCount}
                  </ResponsiveText>
                  <ResponsiveText
                    style={{
                      textAlign: "center",
                      width: wp(30),
                      fontFamily: Fonts.ManropeBold,
                      color: "#9E9E9E",
                    }}
                  >
                    {valueConverstion(item?.amount ?? 0)}
                  </ResponsiveText>
                </View>
                {bidData?.bidOffers?.length - 1 == index ? null : (
                  <View
                    style={{
                      backgroundColor: "#F3F3F3",
                      height: 1,
                      // marginVertical: wp(2),
                    }}
                  />
                )}
              </View>
            ))}
        </ScrollView>
      </View>
    </Container>
  );
};

export default BuyDetails;
