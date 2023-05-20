import { View, TouchableOpacity } from "react-native";
import React from "react";
import { wp } from "./Responsive";
import ResponsiveText from "./ResponseiveText";
import Fonts from "@src/theme/fonts";
import Arrow from "@src/assets/images/left_arrow.svg";
type Props = {
  img: string | undefined;
  onPress?: () => void;
  onPressLater: () => void;
  doit?: boolean;
};
const BottomButtons = (props: Props) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: wp(4),
        paddingVertical: wp(4),
        borderTopColor: "#EEEEEE",
        borderTopWidth: 1,
      }}
    >
      <TouchableOpacity
        onPress={props.onPressLater}
        style={{
          width: wp(38.13),
          height: wp(14.93),
          borderRadius: wp(10),
          borderColor: "#00B9F7",
          borderWidth: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ResponsiveText
          style={{
            color: "#00B9F7",
            fontFamily: Fonts.ManropeBold,
            fontSize: 4.53,
          }}
        >
          Do it later
        </ResponsiveText>
      </TouchableOpacity>
      <TouchableOpacity
        disabled={props.img ? false : true}
        onPress={props.onPress}
        style={{
          width: wp(49.07),
          height: wp(14.93),
          borderRadius: wp(10),
          backgroundColor: props.img ? "#2BACE3" : "#AEDFF4",

          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <ResponsiveText
          style={{
            color: "white",
            fontFamily: Fonts.ManropeBold,
            fontSize: 4.53,
            marginRight: wp(3),
          }}
        >
          {props.doit ? "Do it now" : "Continue"}
        </ResponsiveText>
        <Arrow />
      </TouchableOpacity>
    </View>
  );
};

export default BottomButtons;
