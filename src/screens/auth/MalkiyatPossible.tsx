import { View, Image, TouchableOpacity } from "react-native";
import React from "react";

import Container from "@src/components/common/Container";
import { wp } from "@src/components/common/Responsive";
import ResponsiveText from "@src/components/common/ResponseiveText";
import Fonts from "@src/theme/fonts";
const MalkiyatPossible = (props) => {
  return (
    <Container>
      <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
        <ResponsiveText
          style={{
            fontSize: 4.8,
            fontFamily: Fonts.ManropeBold,
            color: "#3577DB",
            marginBottom: wp(5),
          }}
        >
          Malkiyat makes possible...
        </ResponsiveText>
        <Image
          style={{ width: wp(76.8), height: wp(44), marginVertical: wp(3) }}
          source={require("@src/assets/images/pic1.png")}
        />
        <Image
          style={{ width: wp(76.8), height: wp(48), marginBottom: wp(3) }}
          source={require("@src/assets/images/pic2.png")}
        />
        <Image
          style={{ width: wp(73.87), height: wp(35.73) }}
          source={require("@src/assets/images/pic3.png")}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            // backgroundColor: "red",
            width: wp(90),
            marginTop: wp(10),
            position: "absolute",
            bottom: wp(5),
          }}
        >
          <View>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("HomeView")}
            >
              <ResponsiveText
                style={{
                  fontSize: 4,

                  fontFamily: Fonts.ManropeBold,
                  color: "#689AE4",
                  alignSelf: "flex-start",
                  marginLeft: wp(5),
                }}
              >
                Skip
              </ResponsiveText>
            </TouchableOpacity>
            <ResponsiveText
              style={{
                fontSize: 3,
                marginTop: wp(1),
                alignSelf: "flex-start",
                marginRight: wp(5),
              }}
            >
              I understand fractionalisation
            </ResponsiveText>
          </View>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("SlideWalkthrough");
            }}
          >
            <ResponsiveText
              style={{
                fontSize: 4,
                fontFamily: Fonts.ManropeBold,
                color: "#3577DB",

                alignSelf: "flex-end",
              }}
            >
              Next
            </ResponsiveText>
            <ResponsiveText
              style={{
                fontSize: 3,
                marginTop: wp(1),
                alignSelf: "flex-end",
              }}
            >
              Learn How
            </ResponsiveText>
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
};

export default MalkiyatPossible;
