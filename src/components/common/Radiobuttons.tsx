import { View, TouchableOpacity } from "react-native";
import React from "react";
import { wp } from "./Responsive";
import ResponsiveText from "./ResponseiveText";
import Fonts from "@src/theme/fonts";

const Radiobuttons = (props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={props.setRadioBtns}
      style={{
        backgroundColor: "white",
        flexDirection: "row",
        paddingHorizontal: wp(3),
        paddingVertical: wp(4),
        borderRadius: wp(1.5),
        borderColor: "#2BACE3",
        borderWidth: 1,
      }}
    >
      <View
        style={{
          width: wp(6),
          height: wp(6),
          borderRadius: wp(10),
          borderWidth: 2,
          alignItems: "center",
          justifyContent: "center",
          borderColor: "#2BACE3",
        }}
      >
        <View
          style={{
            width: wp(3),
            height: wp(3),
            borderRadius: wp(10),
            backgroundColor: props.check ? "#2BACE3" : "white",
          }}
        ></View>
      </View>
      <View style={{ marginLeft: wp(3) }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <ResponsiveText
            style={{
              fontSize: 4.27,
              fontFamily: Fonts.ManropeSemiBold,
            }}
          >
            {props.title}
          </ResponsiveText>
          {props.dis && (
            <View
              style={{
                backgroundColor: "#F2F2F2",
                paddingHorizontal: wp(2),
                paddingVertical: wp(1),
                borderRadius: wp(5),
                marginLeft: wp(2),
              }}
            >
              <ResponsiveText
                style={{
                  fontSize: 3.2,
                  fontFamily: Fonts.ManropeSemiBold,
                }}
              >
                Recommended
              </ResponsiveText>
            </View>
          )}
        </View>
        {props.dis && (
          <ResponsiveText
            style={{ fontSize: 3.73, width: wp(60), marginTop: wp(1) }}
          >
            Picture is printed on Proof of Purchase, for your protection.
          </ResponsiveText>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default Radiobuttons;
