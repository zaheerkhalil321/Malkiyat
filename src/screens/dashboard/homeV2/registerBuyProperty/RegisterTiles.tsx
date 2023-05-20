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
  RouteProp,
  useFocusEffect,
  useTheme,
} from "@react-navigation/native";

import { hp, wp } from "@src/components/common/Responsive";
import HomeCard from "@src/components/home/HomeCard";
import BackIcon from "@src/assets/images/back_arrow.svg";
import { RootState } from "@src/redux/reducers";
import MUnregisterUserApiService from "@src/services/MUnregisterUserApiService";
import {
  ActionType,
  RegisterUserType,
  UnRegUserType,
} from "@src/redux/action-types";
import { HomeScreenI, PropertyDetailI } from "@src/services/model";
import SkeletonPlaceholder from "@src/components/home/HomeLoader";
import CustomErrorModal from "@src/components/common/CustomErrorModal";
import TilesCard from "@src/components/RegisterHomeV2/TilesCard";
import WalletCard from "@src/components/RegisterHomeV2/WalletCard";
import Fonts from "@src/theme/fonts";
import HomeHeader from "@src/components/ui/HomeHeader/HomeHeader";
import { useSafeDispatch } from "@src/hooks/useSafeDispatch";

const RegisterTiles = (
  props: JSX.IntrinsicAttributes & {
    item: PropertyDetailI;
    navigation: NavigationProp<ParamListBase>;
    route: RouteProp<ParamListBase>;
  }
) => {
  const { colors } = useTheme();
  const unregisterUserReducer = useSelector((state: RootState) => state);
  const selectedTileData = useSelector(
    (state: RootState) => state.registerUser.selectedTileData
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [slideIdx, incSlideIdx] = useState(0);
  const [data, setData] = useState<HomeScreenI[]>(
    unregisterUserReducer?.unregisterUser?.homeData
  );
  const dispatch = useDispatch();

  // ?INCASE UNITS PERSIST WE CAN REMOVE THEM FROM STORE
  useFocusEffect(
    React.useCallback(() => {
      if (Number(selectedTileData.units) > 0) {
        dispatch({
          type: RegisterUserType.SAVE_UNITS,
          payload: 0,
        });
      }
    }, [])
  );

  useEffect(() => {
    fetchData();
  }, [setData]);
  const fetchData = async () => {
    _.size(unregisterUserReducer?.unregisterUser?.homeData) == 0 &&
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
      // Alert.alert("Something went wrong!");
      setLoading(false);
    }
  };
  const registerUserData = useSelector(
    (state: RootState) => state.registerUser.registerUserData
  );
  return (
    <Container>
      {/* <View style={styles.container}>
        <Pressable onPress={() => props.navigation.goBack()}>
          <BackIcon />
        </Pressable>
        <ResponsiveText
          style={{
            fontFamily: Fonts.ManropeBold,
            fontSize: 4.5,
            marginLeft: wp(4),
          }}
        >
          Hi,{" "}
          {registerUserData?.userInfo?.firstName?.replace(/^./, (str) =>
            str.toUpperCase()
          ) +
            " " +
            registerUserData?.userInfo?.lastName?.replace(/^./, (str) =>
              str.toUpperCase()
            )}
        </ResponsiveText>
      </View> */}
      <HomeHeader
        back
        backgroundColor={"white"}
        show={true}
        {...props}
        title={
          registerUserData?.userInfo?.firstName?.replace(/^./, (str) =>
            str.toUpperCase()
          ) +
          " " +
          registerUserData?.userInfo?.lastName?.replace(/^./, (str) =>
            str.toUpperCase()
          )
        }
        bell
      />
      <View style={{ paddingHorizontal: wp(4), paddingBottom: wp(0.5) }}>
        <WalletCard {...props} />
      </View>
      <View
        style={{
          flex: 1,
          paddingBottom: hp(2),
          // backgroundColor: 'red'
        }}
      >
        <View style={styles.dotContainer}>
          <View style={styles.dotsContainer}>
            {_.size(data) > 0
              ? data?.map((item, idx) => (
                  <View
                    key={idx}
                    style={[
                      styles.dotPill,
                      idx === slideIdx ? styles.dotpillActive : {},
                      idx === slideIdx ? { backgroundColor: "#3577DB" } : {},
                    ]}
                  />
                ))
              : null}
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
          {_.size(data) > 0
            ? data?.map((x, index) => {
                return (
                  <View
                    key={index}
                    style={{ marginLeft: index == 0 ? 0 : wp(4) }}
                  >
                    <TilesCard
                      item={x as unknown as PropertyDetailI}
                      navigation={props.navigation}
                    />
                  </View>
                );
              })
            : null}
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
    // backgroundColor: "red",
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
export default RegisterTiles;
