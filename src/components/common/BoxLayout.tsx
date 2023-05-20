import { useTheme } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View } from "react-native";
import { hp, wp } from "./Responsive";

const BoxLayout = (props: any) => {
  return (
    <View key={props.key} style={styles.slide}>
      <View style={{ ...styles.slider1, height: props.h }}>
        <View
          style={{
            flexDirection: props.direction,
            flex: 1,
            padding: wp(4),
            justifyContent: "space-between",
            alignItems: props.align,
          }}
        >
          {props.children}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pagerView: {
    flex: 1,
  },
  slider1: {
    backgroundColor: "white",
    borderRadius: wp(2),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    marginBottom: wp(3),
  },
  slider2: {
    height: hp(25),
    backgroundColor: "white",
    borderRadius: wp(2),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  slide: {
    paddingHorizontal: wp(4),
    backgroundColor: "#F4F4F4",
  },
});

export default BoxLayout;
