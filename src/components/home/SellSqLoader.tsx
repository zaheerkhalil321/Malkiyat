import { View, Text } from "react-native";
import React from "react";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

import { wp } from "../common/Responsive";
const SellSqLoader = () => {
  return (
    <SkeletonPlaceholder>
      <View
        style={{
          height: wp(70),
          borderRadius: wp(5),
        }}
      />
      <View
        style={{
          width: wp(30),
          height: wp(8),
          borderRadius: 4,
          marginLeft: wp(5),
          marginTop: wp(7),
        }}
      />
      <View
        style={{
          height: wp(30),
          borderRadius: wp(5),
          marginTop: wp(5),
        }}
      />
    </SkeletonPlaceholder>
  );
};

export default SellSqLoader;
