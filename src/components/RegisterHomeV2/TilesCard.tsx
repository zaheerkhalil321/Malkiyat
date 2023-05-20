import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";

import { hp, wp } from "../common/Responsive";
import ResponsiveText from "../common/ResponseiveText";
import Fonts from "@src/theme/fonts";
import {
  NavigationProp,
  ParamListBase,
  useTheme,
} from "@react-navigation/native";
import _ from "lodash";

import SideIcon from "@src/assets/images/side_arrow.svg";
import { PropertyDetailI } from "@src/services/model";
import { valueWithCommas } from "@src/utils/helperFunction";
import { RegisterUserType } from "@src/redux/action-types";
import { store } from "@src/redux";
import { errorModal } from "@src/redux/action-creators";
const TilesCard = (props: {
  item: PropertyDetailI;
  navigation: NavigationProp<ParamListBase>;
}) => {
  const { item, navigation } = props;
  const registerUserReducer = store.getState().registerUser.registerUserData;

  const handleClick = () => {
    saveSelectedTile(props.item);
    //! IN CASE OF BUY KYCSTATUS WILL NO BE CHECKED
    // if (registerUserReducer?.propertiesData?.KycStatus == "false") {
    //   dispatch(errorModal("Proof of Identity is pending!", true, "KYC"));
    // } else

    if (registerUserReducer.appSettings.tradingStatus == "on") {
      props.navigation.navigate("LowerOffer", {
        params: props.item,
      });
    } else {
      navigation.navigate("RegisterBuyNowStep1");
    }
  };

  return (
    <View key={item.propertyId} style={styles.container}>
      <View style={{ flex: 1.8, backgroundColor: "lightgrey" }}>
        <Image
          resizeMode="stretch"
          style={{ width: "100%", height: "100%" }}
          source={{
            uri:
              _.size(item.imageUrls) > 0
                ? item.imageUrls[0]?.imageUrl
                : undefined,
          }}
        />
      </View>
      <View style={styles.innerContainer}>
        <View style={styles.iconCon}>
          <Image
            style={{
              width: wp(12),
              height: wp(12),
              resizeMode: "contain",
            }}
            source={{ uri: item.propertyLogoUrl }}
          />
          <View style={{ marginLeft: wp(7) }}>
            <ResponsiveText
              numberOfLines={1}
              style={{
                fontSize: 4.8,
                fontFamily: Fonts.ManropeBold,
                width: wp(45),
                flexWrap: "wrap",
              }}
            >
              {item?.propertyName}
            </ResponsiveText>
            <ResponsiveText style={styles.desText}>
              {item?.address}
            </ResponsiveText>
          </View>
        </View>
        <View style={styles.buyNowCon}>
          <View style={{ marginTop: hp(2) }}>
            <ResponsiveText style={styles.amountText}>
              Rs {valueWithCommas(item?.perSmallerUnitPrice)}
            </ResponsiveText>
            <ResponsiveText style={{ textAlign: "center", fontSize: 3.2 }}>
              1 Sqft price
            </ResponsiveText>
          </View>
          <TouchableOpacity onPress={handleClick} style={styles.buyCon}>
            <ResponsiveText style={styles.buyNowText}>Buy Now</ResponsiveText>
          </TouchableOpacity>
        </View>
        {/* <View style={styles.border} /> */}
        <View style={styles.perCon}>
          <View style={{ alignItems: "center" }}>
            <View style={styles.innerPer}>
              <ResponsiveText style={styles.perText}>
                {Math.floor(item?.increaseLastThreeYears)}%
              </ResponsiveText>
            </View>
            <ResponsiveText style={styles.title}>
              Increase per year
            </ResponsiveText>
            <ResponsiveText
              style={{ fontSize: 3.2, marginBottom: wp(1), marginTop: wp(-1) }}
            >
              (Last 3 Years)
            </ResponsiveText>
          </View>
          <View style={{ alignItems: "center" }}>
            <View style={styles.innerPer}>
              <ResponsiveText style={styles.perText}>
                {Math.floor(Number(item?.soldPercentage))}%
              </ResponsiveText>
            </View>
            <ResponsiveText style={styles.title}>Sold</ResponsiveText>
          </View>
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              onPress={() => {
                saveSelectedTile(props.item);
                navigation.navigate("RegisterTopNavigationBar", {
                  params: item,
                });
              }}
              style={{ ...styles.innerPer, ...{ backgroundColor: "white" } }}
            >
              <SideIcon width={20} height={20} />
            </TouchableOpacity>
            <ResponsiveText style={styles.title}>Details</ResponsiveText>
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    borderColor: "#3577DB",
    borderWidth: 1.5,
    flex: 1,
    width: wp(70.53),
    borderRadius: wp(8.53),
    overflow: "hidden",
    paddingBottom: 10,
  },
  innerContainer: {
    flex: 1.5,
    backgroundColor: "white",
    justifyContent: "center",
    // paddingVertical: hp(3),
  },
  iconCon: {
    flexDirection: "row",
    alignItems: "center",
    // marginTop: wp(5),
    marginLeft: wp(3),
    marginTop: wp(7),
    // marginVertical: hp(2),
    // backgroundColor: "red",
  },
  desText: {
    width: wp(40),
    // backgroundColor: "red",
    fontSize: 3.2,
    color: "#9E9E9E",
  },
  buyNowCon: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: wp(3),
    // backgroundColor: "yellow",
    // marginTop: hp(2),
  },
  amountText: {
    fontSize: 6,
    fontFamily: Fonts.ManropeBold,
    color: "#FF9A2E",
  },
  buyCon: {
    backgroundColor: "#FF9A2E",
    width: wp(28),
    height: wp(10),
    borderRadius: wp(10),
    justifyContent: "center",
    alignItems: "center",
  },
  buyNowText: {
    fontSize: 4,
    fontFamily: Fonts.ManropeBold,
    color: "white",
  },
  border: {
    backgroundColor: "#B9B9BB",
    height: 0.5,
    marginVertical: hp(1),
    marginHorizontal: wp(3),
  },
  perCon: {
    flexDirection: "row",
    // alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: wp(3),
    marginVertical: wp(2),
  },
  innerPer: {
    width: wp(10),
    height: wp(10),
    backgroundColor: "#E1F5FE",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: wp(10),
  },
  perText: {
    fontSize: 3.5,
    color: "#1071BC",
    fontFamily: Fonts.ManropeBold,
  },
  title: {
    fontSize: 3,
    fontFamily: Fonts.ManropeBold,
    margin: wp(1),
  },
});
export default TilesCard;
function saveSelectedTile(item: PropertyDetailI) {
  store.dispatch({
    type: RegisterUserType.SAVE_SELECTED_TILE,
    payload: { ...item },
  });
  store.dispatch({
    type: RegisterUserType.SAVE_UNITS,
    payload: 0,
  });
}
