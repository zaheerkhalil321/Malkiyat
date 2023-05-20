import { StyleSheet, View } from "react-native";
import React from "react";
import { NavigationProp, ParamListBase } from "@react-navigation/native";

import Container from "@src/components/common/Container";
import ResponsiveText from "@src/components/common/ResponseiveText";
import Header from "@src/components/common/Header";
import { wp } from "@src/components/common/Responsive";
import Fonts from "@src/theme/fonts";
import FileCard from "./FileCard";
import PropertyInfo from "@src/components/home/PropertyInfo";
import BuySell from "./BuySell";
import Content from "@src/components/common/Content";
import { Route as RouteParamsI } from "@src/services/model";
interface Props {
  navigation: NavigationProp<ParamListBase>;
  route: RouteParamsI;
}

const PropertySale = (props: Props) => {
  return (
    <Container style={{ backgroundColor: "#F4F4F4" }}>
      <Header {...props} title="Buy/Sell your Sqft" />
      <Content style={{ backgroundColor: "#F4F4F4" }}>
        <View style={{ paddingHorizontal: wp(4) }}>
          <View style={{ paddingVertical: wp(4) }}>
            <FileCard
              navigation={props.navigation}
              selectedTileData={props.route?.params?.selectedTileData ?? []}
            />
          </View>
          <View
            style={{
              backgroundColor: "white",
              paddingHorizontal: wp(4),
              borderRadius: wp(3),
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.22,
              shadowRadius: 2.22,
              elevation: 3,
            }}
          >
            <PropertyInfo
              selectedTileData={props.route?.params?.selectedTileData ?? []}
            />
          </View>
          <View style={{ marginBottom: wp(5) }}>
            <ResponsiveText
              style={{
                fontFamily: Fonts.ManropeBold,
                fontSize: 4.5,
                marginBottom: wp(3),
                marginTop: wp(2),
              }}
            >
              Market
            </ResponsiveText>
            <BuySell
              selectedTileData={props.route?.params?.selectedTileData ?? []}
            />
          </View>
        </View>
      </Content>
    </Container>
  );
};

export default PropertySale;

const styles = StyleSheet.create({});
