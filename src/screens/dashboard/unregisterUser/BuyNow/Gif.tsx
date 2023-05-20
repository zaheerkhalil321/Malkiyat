import { View } from "react-native";
import React, { useEffect } from "react";

import Container from "@src/components/common/Container";
import HomeHeader from "@src/components/ui/HomeHeader/HomeHeader";
import { wp } from "@src/components/common/Responsive";
import { useTheme } from "@react-navigation/native";
import Icon from "@src/assets/images/gif.svg";

const Gif = (props) => {
  useEffect(() => {
    setTimeout(() => {
      props.navigation.replace("EnterId");
    }, 1000);
  }, []);

  return (
    <Container style={{ backgroundColor: "white" }}>
      <HomeHeader
        back
        backgroundColor={"white"}
        show={true}
        {...props}
        title={"Malkiyat"}
      />
      <View style={{ marginTop: wp(15), alignItems: "center" }}>
        <Icon />
      </View>
    </Container>
  );
};

export default Gif;
