import React from "react";
import { View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { useSelector } from "react-redux";
import FastImage from "react-native-fast-image";

import Swiper from "react-native-swiper";
import Fonts from "@src/theme/fonts";
import ResponsiveText from "../common/ResponseiveText";
import { useTheme } from "@react-navigation/native";
import { RootState } from "@src/redux/reducers";
function SliderBanner() {
  const unRegisterUser = useSelector(
    (state: RootState) => state.unregisterUser
  );
  const { colors } = useTheme();

  return (
    <>
      {unRegisterUser?.bannerList?.length! > 0 ? (
        <Swiper
          paginationStyle={{ bottom: -15 }}
          showsButtons={false}
          loop
          autoplay={true}
          dot={<View style={styles.swiperDot} />}
          activeDot={<View style={styles.swiperActiveDot} />}
        >
          {unRegisterUser?.bannerList?.map((item) => {
            return (
              <View
                key={item.bannerId}
                style={{
                  backgroundColor: "#F4F4F4",
                  paddingVertical: wp(3),
                  borderRadius: wp(2),
                  paddingHorizontal: wp(3),
                }}
              >
                <ResponsiveText
                  style={{
                    fontSize: 4,
                    color: colors.Primary,
                    fontFamily: Fonts.ManropeBold,
                    marginBottom: wp(2),
                  }}
                >
                  {/* Malkiyat guarantee */}
                  {item.bannerName.charAt(0).toUpperCase() +
                    item.bannerName.slice(1)}
                </ResponsiveText>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <View style={{ flex: 0.8, alignItems: "center" }}>
                    {/* <ThumbIcon
                  width={wp(25)}
                  height={wp(20)}
                  style={styles.image}
                /> */}
                    <FastImage
                      style={{
                        width: wp(30),
                        height: wp(20),
                        // backgroundColor: "red",
                      }}
                      source={{ uri: item.bannerImg }}
                      resizeMode="contain"
                    />
                  </View>

                  <View style={{ flex: 1 }}>
                    <ResponsiveText style={{ fontSize: 4, lineHeight: 20 }}>
                      {item.bannerDesc}
                      {/* We sell at market ki qeemat with 30 day buy back */}
                    </ResponsiveText>
                  </View>
                </View>
              </View>
            );
          })}
        </Swiper>
      ) : (
        <></>
        // <ActivityIndicator size="small" />
      )}
    </>
  );
}

const styles = {
  image: {
    // height: wp(60),
    // width: wp(60),
    // backgroundColor: "red",
    // resizeMode: "contain",
    // borderRadius: 100,
  },

  swiperDot: {
    backgroundColor: "#7D7C7C",
    height: 5,
    width: 5,
    marginRight: 5,
    borderRadius: 4,
  },
  swiperActiveDot: {
    backgroundColor: "#3577DB",
    height: 8,
    width: 8,
    marginRight: 5,
    borderRadius: 6,
  },
  getStartedContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
};
export default SliderBanner;
