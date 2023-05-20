import {
  NavigationProp,
  ParamListBase,
  useTheme,
} from "@react-navigation/native";
import React from "react";
import { View, TouchableOpacity } from "react-native";
import DocumentIcon from "@src/assets/images/Document.svg";
import Fonts from "@src/theme/fonts";
import ResponsiveText from "../common/ResponseiveText";
import { wp } from "../common/Responsive";

interface Props {
  item: any;
  navigation: NavigationProp<ParamListBase>;
}

const Thumbnail = (props: Props) => {
  const { item } = props;

  return (
    <TouchableOpacity
      style={{
        margin: wp(2),
        width: wp(24),
      }}
      onPress={() =>
        props.navigation.navigate("PDFView", {
          data: item.item,
        })
      }
    >
      <View
        style={{
          backgroundColor: "#F4F4F4",
          width: wp(24),
          height: wp(23),
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
        <DocumentIcon />
      </View>
      <View style={{ marginTop: wp(2) }}>
        <ResponsiveText
          style={{
            fontSize: 2.6,
            textAlign: "center",
            fontFamily: Fonts.ManropeBold,
          }}
        >
          {item.item.documentName}
        </ResponsiveText>
      </View>
    </TouchableOpacity>
  );
};

export default Thumbnail;
