import { View, Text } from "react-native";
import React from "react";
import Container from "@src/components/common/Container";
import Fonts from "@src/theme/fonts";

const SellFt = () => {
  return (
    <Container>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ fontFamily: Fonts.ManropeBold }}>
          Buy Back is coming soon
        </Text>
      </View>
    </Container>
  );
};

export default SellFt;
