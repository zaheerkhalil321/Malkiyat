import { View } from "react-native";
import React from "react";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { wp } from "../common/Responsive";
const HomeLoader = () => {
  return (
    <SkeletonPlaceholder>
      <View
        style={{
          height: wp(50),
          borderTopRightRadius: wp(8),
          borderTopLeftRadius: wp(8),
        }}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: wp(8),
        }}
      >
        <View
          style={{
            width: wp(30),
            height: wp(30),
            borderRadius: wp(100),
          }}
        />
        <View style={{ marginLeft: 20 }}>
          <View style={{ width: wp(30), height: wp(8), borderRadius: 4 }} />
          <View
            style={{
              marginTop: 6,
              width: wp(50),
              height: wp(8),
              borderRadius: 4,
            }}
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginTop: wp(8),
        }}
      >
        <View style={{ width: wp(40), height: wp(8), borderRadius: 4 }} />
        <View style={{ marginLeft: 20 }}>
          <View
            style={{
              width: wp(40),
              height: wp(8),
              borderRadius: 4,
            }}
          />
        </View>
      </View>
      <View
        style={{
          alignItems: "center",
          //   marginVertical: wp(5),
          marginTop: wp(8),
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={{ alignItems: "center" }}>
          <View
            style={{
              width: wp(15),
              height: wp(15),
              borderRadius: wp(100),
              marginBottom: wp(3),
            }}
          />
          <View style={{ width: wp(23), height: wp(8), borderRadius: 4 }} />
        </View>
        <View style={{ alignItems: "center" }}>
          <View
            style={{
              width: wp(15),
              height: wp(15),
              borderRadius: wp(100),
              marginBottom: wp(3),
            }}
          />
          <View style={{ width: wp(23), height: wp(8), borderRadius: 4 }} />
        </View>
        <View style={{ alignItems: "center" }}>
          <View
            style={{
              width: wp(15),
              height: wp(15),
              borderRadius: wp(100),
              marginBottom: wp(3),
            }}
          />
          <View style={{ width: wp(23), height: wp(8), borderRadius: 4 }} />
        </View>
      </View>
    </SkeletonPlaceholder>
  );
};

export default HomeLoader;
