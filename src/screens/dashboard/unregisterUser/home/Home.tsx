import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";

import Container from "@src/components/common/Container";
import ResponsiveText from "@src/components/common/ResponseiveText";
import {
  NavigationProp,
  ParamListBase,
  useTheme,
} from "@react-navigation/native";

import { hp, wp } from "@src/components/common/Responsive";
import HomeCard from "@src/components/home/HomeCard";
import BackIcon from "@src/assets/images/back_arrow.svg";
import { RootState } from "@src/redux/reducers";
import MUnregisterUserApiService from "@src/services/MUnregisterUserApiService";
import { UnRegUserType } from "@src/redux/action-types";
import { HomeScreenI, PropertyDetailI } from "@src/services/model";
import SkeletonPlaceholder from "@src/components/home/HomeLoader";
import CustomErrorModal from "@src/components/common/CustomErrorModal";
import HomeHeader from "@src/components/ui/HomeHeader/HomeHeader";
import ProfileSvg from "@src/assets/images/HomeIcons/Profile.svg";
import { useSafeDispatch } from "@src/hooks/useSafeDispatch";

const Home = (
  props: JSX.IntrinsicAttributes & {
    item: PropertyDetailI;
    navigation: NavigationProp<ParamListBase>;
  }
) => {
  const { colors } = useTheme();
  const unregisterUserReducer = useSelector((state: RootState) => state);
  const [loading, setLoading] = useState<boolean>(false);
  const [slideIdx, incSlideIdx] = useState(0);
  const [data, setData] = useState<HomeScreenI[]>(
    unregisterUserReducer?.unregisterUser?.homeData
  );
  const dispatch = useSafeDispatch();

  useEffect(() => {
    if (_.size(data) == 0) {
      if (_.size(unregisterUserReducer?.unregisterUser?.homeData) == 0) {
        fetchData();
      } else {
        setData(unregisterUserReducer?.unregisterUser?.homeData);
      }
    }
  }, [setData]);
  const fetchData = async () => {
    setLoading(true);
    const response = await MUnregisterUserApiService.getHomeScreenData();

    if (_.size(response.data?.data) > 0) {
      setData(response.data?.data);
      setLoading(false);

      if (response?.data) {
        dispatch({
          type: UnRegUserType.UNREGISTER_HOME_DATA,
          payload: response.data?.data,
        });
      }
    } else {
      <CustomErrorModal />;
      setLoading(false);
    }
  };
  return (
    <Container>
      {/* <View style={{
        height: wp(18),
        alignItems: "center",
        paddingLeft: wp(4),
        flexDirection: "row",
      }}>
        <Pressable onPress={() => props.navigation.goBack()}>
          <BackIcon />
        </Pressable>
        <ResponsiveText style={{ fontSize: 5.87, marginLeft: wp(4) }}>
          Malkiyat
        </ResponsiveText>
        <ResponsiveText style={{ fontSize: 5.87, marginLeft: wp(4) }}>login</ResponsiveText>
      </View> */}
      <HomeHeader
        backgroundColor={"white"}
        show={false}
        {...props}
        title={"Malkiyat"}
        label={"Login"}
        icon={<ProfileSvg strokeWidth={10} width={wp(5)} height={wp(5)} />}
      />
      <View
        style={{
          flex: 1,
          paddingBottom: hp(5),
        }}
      >
        <View style={styles.dotContainer}>
          <View style={styles.dotsContainer}>
            {_.size(data) > 0 &&
              data?.map((item, idx) => (
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
        </View>
        {loading && (
          <View style={{ paddingHorizontal: wp(5), marginTop: wp(0) }}>
            <SkeletonPlaceholder />
          </View>
        )}
        <ScrollView
          scrollEventThrottle={1000}
          onScroll={(event) => {
            if (event.nativeEvent.contentOffset.x == 0) {
              return incSlideIdx(0);
            } else {
              const valuePercentage =
                Number(
                  (event.nativeEvent.contentOffset.x /
                    Dimensions.get("window").width) *
                    1.1
                ) + 1;
              if (valuePercentage > 1.5 && valuePercentage < 2) {
                return incSlideIdx(1);
              } else if (valuePercentage > 2) {
                incSlideIdx(Math.floor(valuePercentage));
              }
            }
          }}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, paddingHorizontal: wp(3) }}
          horizontal
        >
          {_.size(data) > 0 &&
            data?.map((x, index) => {
              return (
                <View
                  key={index}
                  style={{ marginLeft: index == 0 ? 0 : wp(4) }}
                >
                  <HomeCard
                    item={x as unknown as PropertyDetailI}
                    navigation={props.navigation}
                  />
                </View>
              );
            })}
        </ScrollView>
      </View>
    </Container>
  );
};
const styles = StyleSheet.create({
  container: {
    height: wp(18),
    alignItems: "center",
    paddingLeft: wp(4),
    flexDirection: "row",
  },
  dotContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: hp(1),
    marginBottom: hp(3),
  },
  dotsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  dotPill: {
    height: 10,
    width: 10,
    borderRadius: 10,
    marginRight: 8,
    backgroundColor: "#CCE0FF",
  },
  dotpillActive: {
    height: 10,
    width: 10,
  },
});
export default Home;
