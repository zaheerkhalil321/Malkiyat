import { View } from "react-native";
import React from "react";
import Image from "react-native-fast-image";
import ResponsiveText from "../common/ResponseiveText";
import Fonts from "@src/theme/fonts";
import { wp } from "../common/Responsive";
import { AboutProperty } from "@src/services/model";

const AboutPropertyComponents = (props: AboutProperty) => {
  return (
    <>
      <View
        key={props.propertyId}
        style={{
          borderColor: "#FF9A2E",
          borderWidth: 1,
          borderRadius: wp(3),
          width: wp(37.2),
          height: wp(25.6),
          alignItems: "center",
          justifyContent: "center",
          marginBottom: wp(5),
        }}
      >
        <Image
          source={{ uri: props.iconUrl }}
          style={{ width: wp(11.73), height: wp(11.73) }}
          resizeMode="contain"
        />
        <ResponsiveText
          style={{
            fontSize: 3.73,
            fontFamily: Fonts.ManropeSemiBold,
            marginTop: wp(2),
          }}
        >
          {props.description}
        </ResponsiveText>
      </View>
    </>
  );
};

export default AboutPropertyComponents;
