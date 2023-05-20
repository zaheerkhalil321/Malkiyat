import { View, Text, ScrollView, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import Container from "@src/components/common/Container";
import HomeHeader from "@src/components/ui/HomeHeader/HomeHeader";
import {
  ParamListBase,
  RouteProp,
  NavigationProp,
} from "@react-navigation/native";
import _ from "lodash";
import { useSelector } from "react-redux";

import Icon2 from "@src/assets/images/own.svg";
import Icon3 from "@src/assets/images/sqq.svg";
import Icon1 from "@src/assets/images/person.svg";
import { wp } from "@src/components/common/Responsive";
import ResponsiveText from "@src/components/common/ResponseiveText";
import Fonts from "@src/theme/fonts";
import { BuyBackPropertyListI, HighestOfferDataI } from "@src/services/model";
import { valueConverstion } from "@src/utils/helperFunction";
import { RootState } from "@src/redux/reducers";

interface Props {
  navigation: NavigationProp<ParamListBase>;
  route: RouteProp<ParamListBase>;
}
const BuyBackDetail = (props: Props) => {
  const { list, item } = props.route.params as {
    list: { subPropertyId: number; purchasedPrice: number }[];
    item: BuyBackPropertyListI;
  };
  const userInfo = useSelector(
    (state: RootState) => state.registerUser.registerUserData.userInfo
  );

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
          <ResponsiveText style={{ marginTop: wp(1) }}>Seller</ResponsiveText>
        </View>
        <View style={{ alignItems: "center", width: wp(30) }}>
          <Icon2 width={wp(5.87)} height={wp(7.47)} />
          <ResponsiveText style={{ marginTop: wp(1) }}>Selling</ResponsiveText>
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
          Malkiyat buyback up to {item?.ownedUnits} Sqft
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
          <View style={{ flexDirection: "row" }}>
            <ResponsiveText style={{ textAlign: "center", width: wp(30) }}>
              {userInfo?.firstName} {userInfo?.lastName}
            </ResponsiveText>
            <ResponsiveText style={{ textAlign: "center", width: wp(30) }}>
              1 Sqft
            </ResponsiveText>
            <ResponsiveText
              style={{
                textAlign: "center",
                width: wp(30),
                fontFamily: Fonts.ManropeBold,
              }}
            >
              {valueConverstion(_.size(list) > 0 ? list[0].purchasedPrice : 0)}
            </ResponsiveText>
          </View>

          {/* <View
            style={{
              backgroundColor: "#F3F3F3",
              height: 1,
              marginVertical: wp(2),
            }}
          /> */}
        </View>
      </View>

      <View style={{ paddingHorizontal: wp(5) }}>
        <ResponsiveText
          style={{ color: "#8A8A8E", fontSize: 3.2, marginTop: wp(7) }}
        >
          Remaining offers
        </ResponsiveText>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}
          style={{
            borderColor: "#F3F3F3",
            borderWidth: 1,
            marginTop: wp(3),
            borderRadius: wp(1.5),
            marginBottom: Platform.OS == "ios" ? 300 : 200,
            // paddingTop: wp(3),
          }}
        >
          {_.size(list) > 0 &&
            list?.map((item, index) => (
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
                    {userInfo?.firstName} {userInfo.lastName}
                  </ResponsiveText>
                  <ResponsiveText
                    style={{
                      textAlign: "center",
                      width: wp(30),
                      color: "#9E9E9E",
                    }}
                  >
                    1 Sqft
                  </ResponsiveText>
                  <ResponsiveText
                    style={{
                      textAlign: "center",
                      width: wp(30),
                      fontFamily: Fonts.ManropeBold,
                      color: "#9E9E9E",
                    }}
                  >
                    {valueConverstion(item.purchasedPrice ?? 0)}
                  </ResponsiveText>
                </View>
                {list?.length - 1 == index ? null : (
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

export default BuyBackDetail;
