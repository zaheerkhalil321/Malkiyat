import React from "react";
import { View } from "react-native";
import ThumbIcon from "@src/assets/images/stampIcon.svg";
import ResponsiveText from "../common/ResponseiveText";
import { wp } from "../common/Responsive";
import { useTheme } from "@react-navigation/native";
import Fonts from "@src/theme/fonts";
export default function ProperityBanner() {
  const { colors } = useTheme();
  return (
    <View
      style={{
        backgroundColor: "#F4F4F4",
        paddingVertical: wp(3),
        borderRadius: wp(2),
        paddingHorizontal: wp(3),
      }}
    >
      <ResponsiveText
        style={{
          fontSize: 4,
          color: colors.Primary,
          fontFamily: Fonts.ManropeBold,
          marginBottom: wp(2),
        }}
      >
        Malkiyat guarantee
      </ResponsiveText>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View style={{ flex: 0.8, alignItems: "center" }}>
          <ThumbIcon />
        </View>

        <View style={{ flex: 1 }}>
          <ResponsiveText style={{ fontSize: 4, lineHeight: 25 }}>
            We sell at market ki qeemat with 30 day buy back
          </ResponsiveText>
        </View>
      </View>
    </View>
  );
}
