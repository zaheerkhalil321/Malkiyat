import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  DrawerActions,
  NavigationProp,
  ParamListBase,
} from "@react-navigation/native";

import React from "react";
import HamberIon from "@src/assets/images/Vector.svg";
import BellIcon from "@src/assets/images/notifications.svg";
import { wp } from "../common/Responsive";
import ResponsiveText from "../common/ResponseiveText";
import Fonts from "@src/theme/fonts";
interface Props {
  name: string | undefined | null;
  navigation: NavigationProp<ParamListBase>;
}
const Header = (props: Props) => {
  return (
    <View style={style.container}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity
          onPress={() =>
            props.navigation.dispatch(DrawerActions.toggleDrawer())
          }
          style={style.burgerContainer}
        >
          <HamberIon />
        </TouchableOpacity>
        <View>
          <ResponsiveText style={style.titleText}>
            Hi, {props.name}
          </ResponsiveText>
        </View>
      </View>
      {/* <View>
        <BellIcon color={"#2BACE3"} />
      </View> */}
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    // backgroundColor: "red",
    paddingHorizontal: wp(4),
    height: wp(20),
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  burgerContainer: {
    backgroundColor: "white",
    width: wp(10),
    height: wp(10),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: wp(2),
    marginRight: wp(4),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  titleText: {
    fontFamily: Fonts.ManropeBold,
    fontSize: 4.5,
  },
});
export default Header;
