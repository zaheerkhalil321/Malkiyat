import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";

import ResponsiveText from "./ResponseiveText";
import { wp } from "./Responsive";
import Fonts from "@src/theme/fonts";

interface props {
  title: string;
  onPress?: (data: any) => void;
  disabled?: boolean;
}

const AuthButton = (props: props) => {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      disabled={props.disabled}
      onPress={props.onPress}
      style={
        //@ts-ignore
        styles.btn(colors, props.disabled)
      }
    >
      <ResponsiveText style={{ color: "white", fontFamily: Fonts.ManropeSemiBold }}>{props.title}</ResponsiveText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  //@ts-ignore
  btn: (colors, disable) => ({
    backgroundColor: disable ? "#bebebe" : '#2BACE3',
    width: wp(80),
    height: wp(12),
    borderRadius: wp(2.5),
    justifyContent: "center",
    alignItems: "center",

  }),
});

export default AuthButton;
