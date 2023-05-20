import React, { useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import axios, { AxiosPromise, AxiosResponse } from "axios";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useTheme } from "@react-navigation/native";
import { useSelector } from "react-redux";
import _ from "lodash";
import IncreasePerYear, {
  DataYear,
} from "@src/screens/dashboard/homeV2/details/IncreasePerYear";
import PropertyInfo from "@src/screens/dashboard/homeV2/details/PropertyInfo";
import { CustomYearIncreaseI } from "@src/services/model";

import LocationTabs from "@src/screens/dashboard/homeV2/details/LocationTabs";

import SoldHistory from "@src/screens/dashboard/homeV2/details/SoldHistory";

import MUnregisterUserApiService from "@src/services/MUnregisterUserApiService";
import { allPropertyDataSave } from "@src/redux/action-creators/unregisteruser";
import ResFileIcon from "@src/assets/images/info_tab.svg";
import IncreaseIcon from "@src/assets/images/increase_tab.svg";
import MapIcon from "@src/assets/images/location_tab.svg";
import SoldIcon from "@src/assets/images/soldHistory_tab.svg";
import SellIcon from "@src/assets/images/sell_tab.svg";
import Fonts from "@src/theme/fonts";
import { wp } from "@src/components/common/Responsive";
import deviceInfoModule from "react-native-device-info";
import SellYour from "@src/screens/dashboard/homeV2/details/SellYour";
import ResponsiveText from "@src/components/common/ResponseiveText";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import RegisterTopTab from "@src/components/RegisterHomeV2/RegisterTopTab";
import { RootState } from "@src/redux/reducers";
import { store } from "@src/redux";
import Iown from "../details/Iown";
import { useSafeDispatch } from "@src/hooks/useSafeDispatch";
const {
  getPropertyDetails,
  getPropertyPriceDetails,
  getPropertySoldHistory,
  getPropertyLocation,
  getIown,
} = MUnregisterUserApiService;

const { Navigator, Screen } = createMaterialTopTabNavigator();

function RegisterTopNavigationBar(props) {
  const { colors } = useTheme();
  const [loading, setLoading] = useState<boolean>(false);
  const userId = store.getState().registerUser.registerUserData.userInfo.userId;
  const [propInfo] = React.useState(props.route?.params?.params);

  const dispatch = useSafeDispatch();

  React.useEffect(() => {
    const fetchPropDetails = async () => {
      setLoading(true);
      const [
        propertyDetails,
        propertyPriceDetails,
        propertySoldHistory,
        propertyLocationDetails,
        propertyIownData,
      ] = await axios.all<AxiosResponse>([
        getPropertyDetails(props.route?.params?.params?.propertyId),
        getPropertyPriceDetails(props.route?.params?.params?.propertyId),
        getPropertySoldHistory(props.route?.params?.params?.propertyId),
        getPropertyLocation(props.route?.params?.params?.propertyId),
        getIown(Number(userId), props.route?.params?.params?.propertyId),
      ]);

      let editResponse = propertyPriceDetails.data.yearsIncreaseList.sort(
        (a, b) => b.price - a.price
      );
      let newEditResponse: CustomYearIncreaseI[] = editResponse.map(
        (item, index) => {
          return { ...item, ...DataYear[index] };
        }
      );
      // .sort((a, b) => b.year - a.year);
      dispatch(
        allPropertyDataSave({
          propertyDetails: propertyDetails.data,
          priceDetails: {
            price: _.reverse(newEditResponse),
            documentDetails: propertyPriceDetails.data?.evaluationDocuments,
          },
          propertySoldHistory: propertySoldHistory.data,
          propertyLocationDetails: propertyLocationDetails.data,
          propertyIownData: propertyIownData.data.data,
        })
      );
      setLoading(false);
    };

    fetchPropDetails();
    // }
  }, []);
  function LoadingFunc() {
    return (
      <View
        style={{
          paddingHorizontal: wp(5),
          paddingVertical: wp(8),
        }}
      >
        <SkeletonPlaceholder>
          <View
            style={{
              height: wp(5),
              width: wp(70),
              marginBottom: wp(5),
            }}
          />
          <View
            style={{
              width: wp(91.47),
              height: wp(70),
              borderRadius: wp(2),
              marginBottom: wp(5),
            }}
          />
          <View
            style={{
              height: wp(3),
              width: wp(15),
              marginBottom: wp(5),
              alignSelf: "center",
            }}
          />
          <View style={{ height: wp(5), width: wp(70), marginBottom: wp(5) }} />
          <View
            style={{ width: wp(91.47), height: wp(70), borderRadius: wp(2) }}
          />
        </SkeletonPlaceholder>
      </View>
    );
  }
  return (
    // <SafeAreaView style={{ flex: 1 }}>
    <View
      style={{
        marginTop: deviceInfoModule.hasNotch() ? wp(10) : 0,
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <RegisterTopTab {...props} />
      <Navigator
        initialRouteName="Iown"
        //@ts-ignore
        screenOptions={styles.screenOptions(colors)}
      >
        <Screen
          options={{
            tabBarLabel: "I own",
            tabBarLabelStyle: {
              ...styles.tabBarLabel,
            },
            tabBarIcon: ({ color, focused }) => (
              <View style={styles.tabBarView}>
                <View
                  style={{
                    ...styles.tabBarIconStyle,
                    borderWidth: focused ? 1 : 0,
                  }}
                >
                  <SellIcon />
                </View>
              </View>
            ),
          }}
          name="Iown"
        >
          {(props) =>
            loading ? LoadingFunc() : <Iown propInfo={propInfo} {...props} />
          }
        </Screen>
        <Screen
          options={{
            tabBarLabel: "Property info",
            tabBarLabelStyle: {
              ...styles.tabBarLabel,
            },
            tabBarIcon: ({ color, focused }) => (
              <View style={styles.tabBarView}>
                <View
                  style={{
                    ...styles.tabBarIconStyle,
                    borderWidth: focused ? 1 : 0,
                  }}
                >
                  <ResFileIcon />
                </View>
              </View>
            ),
          }}
          name="PropertyInfo"
        >
          {(props) =>
            loading ? (
              LoadingFunc()
            ) : (
              <PropertyInfo propInfo={propInfo} {...props} />
            )
          }
        </Screen>
        <Screen
          options={{
            tabBarLabel: "Increase per year",
            tabBarLabelStyle: {
              ...styles.tabBarLabel,
            },
            tabBarIcon: ({ color, focused }) => (
              <View style={styles.tabBarView}>
                <View
                  style={{
                    ...styles.tabBarIconStyle,
                    borderWidth: focused ? 1 : 0,
                  }}
                >
                  <IncreaseIcon />
                </View>
              </View>
            ),
          }}
          name="IncreasePerYear"
        >
          {(props) =>
            loading ? (
              LoadingFunc()
            ) : (
              <IncreasePerYear propInfo={propInfo} {...props} />
            )
          }
        </Screen>

        <Screen
          options={{
            tabBarLabel: "Location",
            tabBarLabelStyle: {
              ...styles.tabBarLabel,
            },
            tabBarIcon: ({ color, focused }) => (
              <View style={styles.tabBarView}>
                <View
                  style={{
                    ...styles.tabBarIconStyle,
                    borderWidth: focused ? 1 : 0,
                  }}
                >
                  <MapIcon />
                </View>
              </View>
            ),
          }}
          name="LocationTabs"
        >
          {(props) =>
            loading ? (
              LoadingFunc()
            ) : (
              <LocationTabs propInfo={propInfo} {...props} />
            )
          }
        </Screen>
        <Screen
          options={{
            tabBarLabel: `${Math.floor(
              props.route?.params?.params?.soldPercentage
            )}% sold history`,
            tabBarLabelStyle: {
              ...styles.tabBarLabel,
              marginLeft: -wp(2),
            },
            tabBarIcon: ({ color, focused }) => (
              <View style={styles.tabBarView}>
                <View
                  style={{
                    ...styles.tabBarIconStyle,
                    borderWidth: focused ? 1 : 0,
                  }}
                >
                  <SoldIcon />
                </View>
              </View>
            ),
          }}
          name="SoldHistory"
        >
          {(props) =>
            loading ? (
              LoadingFunc()
            ) : (
              <SoldHistory {...props} propInfo={propInfo} />
            )
          }
        </Screen>
      </Navigator>
    </View>
    // </SafeAreaView>
  );
}

export default RegisterTopNavigationBar;

const styles = StyleSheet.create({
  tabBarIconStyle: {
    width: wp(16.53),
    height: wp(16.53),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: wp(10),
    backgroundColor: "#FBFCFE",
    borderColor: "#3577DB",
  },
  tabBarLabel: {
    marginTop: wp(9),
    textTransform: "none",
    width: wp(15),
    height: wp(9),
  },
  tabBarView: {
    justifyContent: "center",
    alignItems: "center",
  },
  //@ts-ignore
  screenOptions: (colors): any => ({
    tabBarActiveTintColor: colors.Primary,
    tabBarInactiveTintColor: "black",
    tabBarPressColor: "transparent",
    tabBarLabelStyle: {
      fontFamily: Fonts.ManropeRegular,
      textTransform: "none",
    },
    tabBarStyle: {
      backgroundColor: "white",
      display: "flex",
      justifyContent: "center",
      paddingBottom: 0,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,

      elevation: 2,
    },
  }),
});
