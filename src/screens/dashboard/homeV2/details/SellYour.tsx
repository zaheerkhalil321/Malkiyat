import { View, Text } from "react-native";
import React from "react";
import ResponsiveText from "@src/components/common/ResponseiveText";
import HigherOffer from "@src/components/home/HigherOffer";
import { wp } from "@src/components/common/Responsive";
import Advance from "@src/components/home/Advance";
import Fonts from "@src/theme/fonts";

const SellYour = () => {
  return (
    <View
      pointerEvents="none"
      style={{
        flex: 1,
        backgroundColor: "#F8F8F8",
        paddingHorizontal: wp(4),
        paddingVertical: wp(4),
      }}
    >
      <HigherOffer />
      <ResponsiveText
        style={{
          marginTop: wp(5),
          marginBottom: wp(3),
          fontSize: 4.27,
          fontFamily: Fonts.ManropeBold,
          marginLeft: wp(5),
        }}
      >
        Advance
      </ResponsiveText>
      <Advance />
    </View>
  );
};

export default SellYour;
