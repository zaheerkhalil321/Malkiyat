import React from "react";
import { View, Image } from "react-native";

import Swiper from "react-native-swiper";
import { wp } from "../common/Responsive";

function DetailsSlider() {
  return (
    <View
      style={{
        height: wp(78.4),
        marginBottom: wp(5),
      }}
    >
      <Swiper
        paginationStyle={{ bottom: -25 }}
        showsButtons={false}
        autoplay={true}
        dot={<View style={styles.swiperDot} />}
        activeDot={<View style={styles.swiperActiveDot} />}
      >
        {[...Array(3)].map((_, i) => {
          return (
            <View key={i} style={styles.slide1}>
              <Image
                style={{
                  width: wp(91.47),
                  height: wp(78.4),
                  borderWidth: 1,
                  borderColor: "#3577DB",
                  borderRadius: wp(2),
                }}
                source={require("@src/assets/images/ban.png")}
              />
            </View>
          );
        })}
      </Swiper>
    </View>
  );
}

const styles = {
  slide1: {
    // flexDirection: "row",
    // justifyContent: "space-between",
    // alignItems: "center",
    // paddingRight: wp(10),
  },

  swiperDot: {
    backgroundColor: "#CCE0FF",
    height: 10,
    width: 10,
    marginRight: 15,
    borderRadius: 4,
  },
  swiperActiveDot: {
    backgroundColor: "#3577DB",
    height: 10,
    width: 10,
    marginRight: 15,
    borderRadius: 6,
  },
};
export default DetailsSlider;
