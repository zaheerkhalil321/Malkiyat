import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
} from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import {
  useTheme,
  NavigationProp,
  ParamListBase,
} from "@react-navigation/native";

import ResponsiveText from "@src/components/common/ResponseiveText";
import Fonts from "@src/theme/fonts";

const dataSet = [
  {
    heading: "How Malkiyat works?",
    description: "We buy property in our name",
  },
  {
    heading: "Divide",
    description:
      "Then property is divided into smallest physical unit: a square feet",
  },

  {
    heading: "Buy 1 Square Foot",

    description:
      "    You are able to buy a square foot in property for as little as Rs 3,000",
  },
];
interface Props {
  navigation: NavigationProp<ParamListBase>;
}
function WalkThrough(props: Props) {
  // const navigation = useNavigation<HomeScreenProp>();
  // const Colors = ThemeStyle();
  const [slideIdx, incSlideIdx] = useState(0);
  const [image, setImage] = useState(require("@src/assets/images/Walk1.png"));
  useEffect(() => {
    <View>
      {slideIdx === 0 && setImage(require("@src/assets/images/Walk1.png"))}
      {slideIdx === 1 && setImage(require("@src/assets/images/Walk2.png"))}
      {slideIdx === 2 && setImage(require("@src/assets/images/Walk3.png"))}
    </View>;
  });

  useEffect(() => {}, []);
  const incrementNavigate = () => {
    if (slideIdx < 2) {
      incSlideIdx(slideIdx + 1);
    } else {
      setTimeout(() => {
        incSlideIdx(0);
      }, 1000);
      props.navigation.navigate("AuthStack");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <StatusBar backgroundColor={"white"} barStyle={"dark-content"} />

        <View style={styles.content}>
          <Image source={image} />
          <View>
            <ResponsiveText style={styles.heading}>
              {dataSet[slideIdx].heading}
            </ResponsiveText>
          </View>

          <ResponsiveText style={styles.description}>
            {dataSet[slideIdx].description}
          </ResponsiveText>
          <View style={styles.dotContainer}>
            <View style={styles.dotsContainer}>
              {["", "", ""].map((item, idx) => (
                <View
                  key={idx}
                  style={[
                    styles.dotPill,
                    idx === slideIdx ? styles.dotpillActive : {},
                    idx === slideIdx ? { backgroundColor: "#3577DB" } : {},
                  ]}
                />
              ))}
            </View>
            <View>
              <TouchableOpacity onPress={incrementNavigate}>
                <ResponsiveText style={{ color: "#3B4161" }}>
                  Next
                </ResponsiveText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  dotContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    position: "absolute",
    bottom: wp(5),
    paddingHorizontal: wp(10),
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  heading: {
    fontFamily: Fonts.ManropeBold,
    fontSize: 6,
    color: "#3577DB",
    marginTop: wp(3),
  },

  description: {
    marginTop: wp(3),
    color: "#3B4161",
    width: wp("80%"),
    textAlign: "center",
  },
  dotsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dotPill: {
    borderWidth: 1,
    borderColor: "#E3E9F2",
    height: 10,
    width: 10,
    borderRadius: 10,
    marginRight: 8,
  },
  dotpillActive: {
    height: 12,
    width: 12,
  },
});
export default WalkThrough;
