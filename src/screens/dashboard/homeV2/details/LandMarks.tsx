import { View } from "react-native";
import React from "react";
import Image from "react-native-fast-image";

import { wp } from "@src/components/common/Responsive";
import { useTheme } from "@react-navigation/native";
import ResponsiveText from "@src/components/common/ResponseiveText";
import Fonts from "@src/theme/fonts";

const LandMarks = (props) => {
  const { colors } = useTheme();
  return (
    <View
      style={{
        paddingVertical: wp(3),
        paddingHorizontal: wp(3),
        borderWidth: 1,
        borderRadius: wp(2),
        borderColor: colors.Primary,
        marginBottom: wp(4),
        flexDirection: "row",
      }}
    >
      <View style={{ alignItems: "center" }}>
        <Image
          style={{
            backgroundColor: "#F6F6F6",
            width: wp(16.53),
            height: wp(16.53),
            borderRadius: wp(2),
          }}
          source={{ uri: props.iconUrl }}
        />
        <ResponsiveText
          style={{
            fontSize: 3.73,
            color: "#757575",
            marginTop: wp(1),
            width: wp(20),
            textAlign: "center",
          }}
        >
          {props?.iconName}
        </ResponsiveText>
      </View>
      <View style={{ marginLeft: wp(2), justifyContent: "center" }}>
        <ResponsiveText
          style={{ fontSize: 5.87, fontFamily: Fonts.ManropeBold }}
        >
          {props?.description}
        </ResponsiveText>
      </View>
    </View>
  );
};

export default LandMarks;
