import {
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  BackHandler,
} from "react-native";
import React, { useEffect } from "react";
import Container from "@src/components/common/Container";
import Content from "@src/components/common/Content";
import ResponsiveText from "@src/components/common/ResponseiveText";
import Fonts from "@src/theme/fonts";
import { wp } from "@src/components/common/Responsive";
import Con from "@src/assets/images/rev.svg";
import Union from "@src/assets/images/Union.svg";
import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from "@react-navigation/native";
import HomeIcon from "@src/assets/images/home_i.svg";
import Icon from "@src/assets/images/congrate_i.svg";
import Icon2 from "@src/assets/images/congrate_i.png";
interface Props {
  navigation: NavigationProp<ParamListBase>;
  route: RouteProp<any>;
}

const AdvertiseCongrate = (props: Props) => {
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);
  function backAction() {
    props.navigation.push("HomeDrawer");
    return true;
  }
  return (
    <Container style={{ backgroundColor: "white" }}>
      <Content
        bounces={false}
        contentContainerStyle={{ flexGrow: 1 }}
        style={{ flex: 1 }}
      >
        <View>
          {/* <View
            style={{
              backgroundColor: "#2BACE3",
              height: wp(60),
              borderBottomEndRadius: 20,
              alignItems: "center",
              flex: 1,
            }}
          >
            <ResponsiveText
              style={{
                fontFamily: Fonts.ManropeBold,
                fontSize: 5.6,
                color: "white",
                marginTop: wp(5),
              }}
            >
              Malkiyat
            </ResponsiveText>
          </View> */}
          <ImageBackground
            style={{
              width: wp(100),
              height: wp(100),
              justifyContent: "center",
              alignItems: "center",
            }}
            source={Icon2}
          >
            <ResponsiveText
              style={{
                fontFamily: Fonts.ManropeBold,
                fontSize: 5.6,
                color: "white",
                // marginTop: wp(5),
              }}
            >
              Malkiyat
            </ResponsiveText>
          </ImageBackground>
        </View>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <View style={{ position: "absolute", top: -wp(33) }}>
            <Con />
          </View>
          <ResponsiveText
            style={{
              fontSize: 6.4,
              fontFamily: Fonts.ManropeBold,
              color: "#4E4E4E",
              marginTop: -wp(20),
            }}
          >
            Congratulations!
          </ResponsiveText>
          <ResponsiveText
            style={{
              fontSize: 6.4,
              color: "#4E4E4E",
              marginTop: wp(2),
            }}
          >
            Your demand is advertised
          </ResponsiveText>
        </View>
      </Content>
      <View
        style={{
          paddingHorizontal: wp(4),
          paddingVertical: wp(4),
          borderTopColor: "#EEEEEE",
          borderTopWidth: 1,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate("RegisterUserStack", {
              screen: "MyAds",
              params: { type: props.route.params?.obj?.bidType },
            })
          }
          style={{
            width: wp(43.73),
            height: wp(14.93),
            borderRadius: wp(10),
            borderColor: "#00B9F7",
            borderWidth: 1,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <ResponsiveText
            style={{
              color: "#00B9F7",
              fontFamily: Fonts.ManropeBold,
              fontSize: 4,
              textAlign: "center",
            }}
          >
            View advertised demand
          </ResponsiveText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.push("HomeDrawer")}
          style={{
            width: wp(43.73),
            height: wp(14.93),
            borderRadius: wp(10),
            backgroundColor: "#2BACE3",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <HomeIcon />
          <ResponsiveText
            style={{
              color: "white",
              fontFamily: Fonts.ManropeBold,
              fontSize: 4.53,
              marginLeft: 5,
            }}
          >
            Go to home
          </ResponsiveText>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

export default AdvertiseCongrate;
