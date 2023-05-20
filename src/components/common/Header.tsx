import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import {
  NavigationProp,
  ParamListBase,
  useTheme,
} from "@react-navigation/native";
import Fonts from "@src/theme/fonts";
import ResponseiveText from "./ResponseiveText";
import { wp } from "./Responsive";

import Arrow from "@src/assets/images/arrow_left.svg";

interface Props {
  title: string;
  navigation: NavigationProp<ParamListBase>;
  backgroundColor?: string;
}

const Header = (props: Props) => {
  const { colors } = useTheme();
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        style={{
          width: wp(15),
        }}
        onPress={() => props.navigation.goBack()}
      >
        <View
          style={{
            backgroundColor: props.backgroundColor
              ? props.backgroundColor
              : "#F4F4F4",
            width: wp(13),
            height: wp(13),
            borderRadius: wp(2),
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
          <Arrow width={wp(4)} height={wp(4)} />
        </View>
      </TouchableOpacity>
      <ResponseiveText
        style={
          //@ts-ignore
          styles.header(colors.homeInfoComponent)
        }
      >
        {props.title}
      </ResponseiveText>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: wp(18),
    paddingHorizontal: wp(4),
  },
  //@ts-ignore
  header: (color: string) => ({
    marginLeft: wp(3),
    fontSize: 5,
    fontFamily: Fonts.ManropeBold,
    color: color,
  }),
  sideView: {
    flexDirection: "row",
    alignItems: "center",
  },
  //@ts-ignore
  sideText: (color: string) => ({
    fontSize: 3.5,
    fontFamily: Fonts.ManropeRegular,
    color: color,
    marginRight: wp(1),
  }),
});
export default Header;
