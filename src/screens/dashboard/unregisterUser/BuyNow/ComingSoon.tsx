import { View, Text } from "react-native";
import React from "react";
import Fonts from "@src/theme/fonts";
import Container from "@src/components/common/Container";
import Header from "@src/components/common/Header";

const ComingSoon = (props) => {
  return (
    <Container>
      <Header {...props} title="" />
      <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
        <Text style={{ fontSize: 20, fontFamily: Fonts.ManropeSemiBold }}>
          Coming Soon
        </Text>
      </View>
    </Container>
  );
};

export default ComingSoon;
