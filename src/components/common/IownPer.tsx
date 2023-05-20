import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { wp } from "./Responsive";
import ResponsiveText from "./ResponseiveText";
import Fonts from "@src/theme/fonts";
import { findValue } from "@src/screens/dashboard/homeV2/details/Iown";
const IownPer = (props) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        props.onPress();
      }}
      style={{
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "#FF9A2E",
        borderRadius: wp(4),
        paddingHorizontal: wp(5),
        paddingVertical: wp(4),
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <Image
            style={{
              width: wp(6.4),
              height: wp(7.47),
              resizeMode: "contain",
              marginRight: wp(3),
            }}
            source={props.image}
          />
          <View>
            <ResponsiveText style={{ fontSize: 4.27 }}>
              {props.title}
            </ResponsiveText>
            <ResponsiveText style={{ color: "#8A8A8E", fontSize: 3.47 }}>
              <ResponsiveText style={{ color: "#2BACE3", fontSize: 3.47 }}>
                {props.text}
              </ResponsiveText>
              <ResponsiveText style={{ color: "#2BACE3", fontSize: 3.47 }}>
                {" "}
                average
              </ResponsiveText>
            </ResponsiveText>
          </View>
        </View>
        <ResponsiveText
          style={{
            fontSize: 5.53,
            fontFamily: Fonts.ManropeBold,
            color:
              Number(props.lastThreeYearIncrease) > 0 ? "#4CAF50" : "#8A8A8E",
          }}
        >
          {findValue(props.lastThreeYearIncrease)}%
        </ResponsiveText>
      </View>
    </TouchableOpacity>
  );
};

export default IownPer;
