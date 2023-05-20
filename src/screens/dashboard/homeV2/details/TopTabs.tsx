import { View, TouchableOpacity } from "react-native";
import React from "react";

import ResponsiveText from "@src/components/common/ResponseiveText";
import { wp } from "@src/components/common/Responsive";
import Fonts from "@src/theme/fonts";

const TopTabs = (props) => {
  return (
    <View
      style={{
        flexDirection: "row",
        marginTop: wp(2),
        marginBottom: wp(2),
      }}
    >
      <TouchableOpacity
        onPress={() => {
          props.setTabs("google");
        }}
        style={{
          backgroundColor: props.tabs == "google" ? "#DDF2F9" : "white",
          paddingHorizontal: wp(3),
          paddingVertical: wp(4),
          borderRadius: wp(2),
        }}
      >
        <ResponsiveText
          style={{
            fontSize: 3.73,
            fontFamily: Fonts.ManropeBold,
            color: props.tabs == "google" ? "#2BACE3" : "#9E9E9E",
          }}
        >
          Google Map
        </ResponsiveText>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          props.setTabs("project");
        }}
        style={{
          backgroundColor: props.tabs == "project" ? "#DDF2F9" : "white",
          paddingHorizontal: wp(3),
          paddingVertical: wp(4),
          borderRadius: wp(2),
        }}
      >
        <ResponsiveText
          style={{
            fontSize: 3.73,
            fontFamily: Fonts.ManropeBold,
            color: props.tabs == "project" ? "#2BACE3" : "#9E9E9E",
          }}
        >
          Project Map
        </ResponsiveText>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          props.setTabs("land");
        }}
        style={{
          backgroundColor: props.tabs == "land" ? "#DDF2F9" : "white",
          paddingHorizontal: wp(3),
          paddingVertical: wp(4),
          borderRadius: wp(2),
        }}
      >
        <ResponsiveText
          style={{
            fontSize: 3.73,
            fontFamily: Fonts.ManropeBold,
            color: props.tabs == "land" ? "#2BACE3" : "#9E9E9E",
          }}
        >
          Landmarks nearby
        </ResponsiveText>
      </TouchableOpacity>
    </View>
  );
};

export default TopTabs;
