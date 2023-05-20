import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
  Alert,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigationState } from "@react-navigation/native";

import { hp, wp } from "../common/Responsive";
import ResponsiveText from "../common/ResponseiveText";
import Fonts from "@src/theme/fonts";
import Arrow from "@src/assets/images/arrow_left.svg";

const TopTabComponent = (props) => {
  const { params } = props.route?.params;
  const state = useNavigationState((state) => state.routes);
  const [selected, setSelected] = useState(0);
  const backAction = () => {
    const routeLength = state[state?.length - 1].state?.routes?.length;
    if (routeLength && routeLength! > 0 && routeLength != selected) {
      setSelected(routeLength ?? selected);
      return false;
    } else {
      setSelected(0);
      return false;
    }
  };
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);
  return (
    <View style={{ paddingBottom: 0, overflow: "hidden" }}>
      <View
        style={{
          backgroundColor: "white",
        }}
      >
        <View style={styles.iconCon}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              width: wp(15),
            }}
            onPress={() => props.navigation.goBack()}
          >
            <View
              style={{
                backgroundColor: "white",
                width: wp(11.73),
                height: wp(11.73),
                borderRadius: wp(4),
                justifyContent: "center",
                alignItems: "center",
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.23,
                shadowRadius: 2.62,
                elevation: 4,
              }}
            >
              <Arrow width={wp(5)} height={wp(5)} />
            </View>
          </TouchableOpacity>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ width: wp(12.53), height: wp(13.6) }}>
              <Image
                style={{
                  resizeMode: 'contain',
                  width: wp(12.53),
                  height: wp(13.6),
                  // backgroundColor: "red",
                }}
                source={{ uri: params?.propertyLogoUrl }}
              />
            </View>

            <View style={{ marginLeft: wp(3) }}>
              <Text
                numberOfLines={1}
                style={{
                  fontSize: 24,
                  fontFamily: Fonts.ManropeBold,
                  // backgroundColor: "red",
                  maxWidth: wp(36),
                  color: "#3B4161",
                }}
              >
                {params?.propertyName}
              </Text>
              <ResponsiveText style={styles.desText}>
                {params?.address}
              </ResponsiveText>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("DashBoardStack", {
                screen: "UnregisterUserStack",
                params: {
                  screen: "UnregisterBuyNow",
                },
              });
            }}
            style={styles.buyCon}
          >
            <ResponsiveText style={styles.buyNowText}>Buy Now</ResponsiveText>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: wp(2),
          }}
        ></View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  iconCon: {
    flexDirection: "row",
    alignItems: "center",
    // marginLeft: wp(3),
    // backgroundColor: "red",
    // marginVertical: hp(2),
    // backgroundColor: "red",
    paddingHorizontal: wp(4),
    paddingVertical: hp(1),
    // paddingVertical: hp(1.5),
    justifyContent: "space-between",
  },
  desText: {
    width: wp(35),
    // backgroundColor: "red",
    fontSize: 3.2,
    color: "#9E9E9E",
  },
  buyCon: {
    backgroundColor: "#FF9A2E",
    width: wp(26.13),
    height: wp(12.27),
    borderRadius: wp(10),
    justifyContent: "center",
    alignItems: "center",
  },
  buyNowText: {
    fontSize: 4.53,
    fontFamily: Fonts.ManropeBold,
    color: "white",
  },
});
export default TopTabComponent;
