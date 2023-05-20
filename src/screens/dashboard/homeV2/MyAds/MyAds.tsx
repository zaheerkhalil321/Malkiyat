import {
  View,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { createSelector } from "reselect";
import { useSelector } from "react-redux";
import _ from "lodash";

import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from "@react-navigation/native";

import Container from "@src/components/common/Container";
import HomeHeader from "@src/components/ui/HomeHeader/HomeHeader";
import { wp } from "@src/components/common/Responsive";
import ResponsiveText from "@src/components/common/ResponseiveText";
import { RootState } from "@src/redux/reducers";
import MRegisterUserApiService from "@src/services/MRegisterUserApiService";
import { store } from "@src/redux/store";
import Loader from "@src/components/ui/loader/Loader";
import AdsInner from "@src/components/RegisterHomeV2/AdsInner";
import Fonts from "@src/theme/fonts";
import Icon1 from "@src/assets/images/pro.svg";
import Icon2 from "@src/assets/images/own.svg";
import Icon3 from "@src/assets/images/sqq.svg";
import Icon4 from "@src/assets/images/doco.svg";
import Content from "@src/components/common/Content";
import NoAds from "@src/assets/images/no_ads.svg";
import { useSafeDispatch } from "@src/hooks/useSafeDispatch";
type Props = {
  navigation: NavigationProp<ParamListBase>;
  route: RouteProp<any>;
};

export type Tabs = "buyer" | "seller";
const MyAds = (props: Props) => {
  const dispatch = useSafeDispatch();
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<Tabs>(props?.route?.params?.type ?? "buyer");
  const [tabs, setTabs] = useState("active");
  const [tabsActive, setTabsActive] = useState(["active"]);
  const getState = () => (state: RootState) => state;
  const memoizedState = createSelector(
    getState(),
    (data) => data.registerUser.userAdsData
  );
  const registerUserAds = useSelector(memoizedState);
  React.useEffect(() => {
    fetchDetails();
  }, [props.navigation]);

  React.useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", backAction);
    };
  }, []);
  function backAction(): boolean | null | undefined {
    if (props.route.name == "MyAds") {
      if (props.navigation.isFocused()) {
        props.navigation.navigate("HomeDrawer");
        return true;
      }
    } else {
      props.navigation.goBack();
      return false;
    }
  }

  // console.log(registerUserAds, 'adsss')
  function fetchDetails() {
    if (_.size(registerUserAds) == 0) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }

    dispatch(
      MRegisterUserApiService.myAdsApi(
        Number(
          store.getState()?.registerUser?.registerUserData?.userInfo?.userId!
        )
      )
    );
  }

  return (
    <Container>
      <View>
        <HomeHeader
          routePathName="HomeDrawer"
          back
          backgroundColor={"white"}
          show={true}
          {...props}
          title={"My Ads"}
          bell
          handleBackButtonPress={() => props.navigation.navigate("HomeDrawer")}
        />
      </View>
      <View
        style={{
          backgroundColor: "#EEEEEF",
          flexDirection: "row",
          marginTop: wp(4),
          marginVertical: wp(4),
          marginHorizontal: wp(4),
          borderRadius: wp(10),
          justifyContent: "space-between",
          padding: wp(1),
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setTab("buyer");
          }}
          style={{
            backgroundColor: tab == "buyer" ? "#2BACE3" : "#EEEEEF",
            width: wp(45.33),
            height: wp(7.47),
            borderRadius: wp(4),
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ResponsiveText
            style={{
              fontSize: 4.27,
              color: tab == "buyer" ? "white" : "black",
            }}
          >
            I want to buy
          </ResponsiveText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setTab("seller");
          }}
          style={{
            backgroundColor: tab == "seller" ? "#2BACE3" : "#EEEEEF",
            width: wp(45.33),
            height: wp(7.47),
            borderRadius: wp(4),
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ResponsiveText
            style={{
              fontSize: 4.27,
              color: tab == "seller" ? "white" : "black",
            }}
          >
            I want to sell
          </ResponsiveText>
        </TouchableOpacity>
      </View>
      <View
        style={{
          backgroundColor: "#EEEEEF",
          flexDirection: "row",
          marginTop: wp(4),
          marginVertical: wp(4),
          marginHorizontal: wp(4),
          borderRadius: wp(10),
          justifyContent: "space-between",
          padding: wp(1),
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            if (!tabsActive.includes("active")) {
              setTabs("active");
              setTabsActive(["active"]);
            }
            // registerUserAds
            //   .filter((item) => item.bidType == tab)
            //   .filter((item) => item.status == tabsActive).map((item, index) => {
            //     if (item.status == 'active') {
            //       Alert.alert('dwdw')
            //       // setTabsActive('active');
            //     } else {
            //       // setTabsActive('inactive');
            //     }
            //   })
          }}
          style={{
            borderColor: "#2BACE3",
            backgroundColor: tabs == "active" ? "#2BACE3" : "#EEEEEF",
            width: wp(45.33),
            height: wp(7.47),
            borderRadius: wp(4),
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ResponsiveText
            style={{ color: tabs == "active" ? "white" : "black", fontSize: 4 }}
          >
            Active
          </ResponsiveText>
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={() => {
            setTabs("completed");
            setTabsActive("completed");
          }}
          style={{
            borderWidth: 1,
            borderColor: "#2BACE3",
            width: wp(20),
            height: wp(10.4),
            borderRadius: wp(2),
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: tabs == "completed" ? "#2BACE3" : "white",
          }}
        >
          <ResponsiveText
            style={{
              color: tabs == "completed" ? "white" : "black",
              fontSize: 3,
            }}
          >
            Conpleted
          </ResponsiveText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setTabs("inProgress");
            setTabsActive("inProgress");
          }}
          style={{
            borderWidth: 1,
            borderColor: "#2BACE3",
            width: wp(20),
            height: wp(10.4),
            borderRadius: wp(2),
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: tabs == "inProgress" ? "#2BACE3" : "white",
          }}
        >
          <ResponsiveText
            style={{
              color: tabs == "inProgress" ? "white" : "black",
              fontSize: 3,
            }}
          >
            In Progress
          </ResponsiveText>
        </TouchableOpacity> */}
        <TouchableOpacity
          onPress={() => {
            if (tabsActive.includes("active")) {
              setTabs("cancelled");
              setTabsActive(["cancelled", "completed", "inProgress", ""]);
            }
          }}
          style={{
            borderColor: "#2BACE3",
            backgroundColor: tabs == "cancelled" ? "#2BACE3" : "#EEEEEF",
            width: wp(45.33),
            height: wp(7.47),
            borderRadius: wp(4),
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ResponsiveText
            style={{
              color: tabs == "cancelled" ? "white" : "black",
              fontSize: 4,
            }}
          >
            Cancelled
          </ResponsiveText>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",
          marginBottom: wp(3),
          marginTop: wp(5),
          justifyContent: "center",
          marginHorizontal: wp(3),
          // backgroundColor: "red",
        }}
      >
        <View
          style={{
            ...styles.iconCon,
            width: wp(20),
            // ...{ backgroundColor: "red" }
          }}
        >
          <Icon1 />
          <ResponsiveText style={{ fontSize: 3.2, marginTop: wp(1) }}>
            Property
          </ResponsiveText>
        </View>
        <View
          style={{
            ...styles.iconCon,
            // ...{ backgroundColor: "yellow" },
            width: wp(23),
          }}
        >
          <Icon2 />
          <ResponsiveText style={{ fontSize: 3.2, marginTop: wp(1) }}>
            {tab == "buyer" ? "want to buy" : "want to sell"}
          </ResponsiveText>
        </View>
        <View
          style={{
            ...styles.iconCon,
            // ...{ backgroundColor: "red" },
            width: wp(24),
          }}
        >
          <Icon3 />
          <ResponsiveText style={{ fontSize: 3.2, marginTop: wp(1) }}>
            Demand Price
          </ResponsiveText>
        </View>
        <View
          style={{
            ...styles.iconCon,
            // ...{ backgroundColor: "yellow" },
            width: wp(21),
          }}
        >
          <Icon4 />
          <ResponsiveText style={{ fontSize: 3.2, marginTop: wp(1) }}>
            Last Sqft{"\n"}sold price
          </ResponsiveText>
        </View>
      </View>
      {_.size(
        registerUserAds &&
          registerUserAds
            .filter((item) => item.bidType == tab)
            .filter((item) => tabsActive.includes(item.status))
      ) == 0 && (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <NoAds />
          <ResponsiveText style={{ marginTop: 20 }}>
            No Ads available
          </ResponsiveText>
        </View>
      )}
      <Content style={{ paddingHorizontal: wp(2.5) }}>
        {registerUserAds &&
          registerUserAds
            .filter((item) => item.bidType == tab)
            .filter((item) => tabsActive.includes(item.status))
            .map((item, index) => {
              return (
                <TouchableOpacity
                  disabled={item.status == "active" ? false : true}
                  key={index}
                  onPress={() => {
                    props.navigation.navigate("MyAdsReview", { item: item });
                  }}
                >
                  <AdsInner tabs={tab} {...item} />
                </TouchableOpacity>
              );
            })}
      </Content>
      <Loader visible={loading} />
    </Container>
  );
};
const styles = StyleSheet.create({
  percen: {
    color: "#4CAF50",
    fontSize: 2.93,
    fontFamily: Fonts.ManropeBold,
    marginBottom: wp(0.5),
  },
  iconCon: {
    // flex: 1,
    // backgroundColor: "red",
    alignItems: "center",
    // alignSelf: 'flex-start'
  },
  innerCon: {
    fontSize: 3.47,
    // flex: 1,
    // backgroundColor: "red",
    // textAlign: "center",
  },
  outer: {
    backgroundColor: "#F8F8F8",
    borderWidth: 1,
    borderColor: "#BDBDBD",
    marginHorizontal: wp(4),
    paddingVertical: wp(3),
    paddingHorizontal: wp(4),
    borderRadius: wp(2),
  },
  boldText: {
    fontSize: 3.47,
    flex: 1,
    // backgroundColor: "red",
    textAlign: "center",
    fontFamily: Fonts.ManropeBold,
  },
});
export default MyAds;
