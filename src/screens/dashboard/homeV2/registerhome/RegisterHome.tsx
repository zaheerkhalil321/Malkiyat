import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  RefreshControl,
  ToastAndroid,
  BackHandler,
  Platform,
  Alert,
  Pressable,
} from "react-native";
import SimpleToast from "react-native-simple-toast";
import React, { useCallback, useState, useEffect } from "react";
import _ from "lodash";

import { useNavigationState, useTheme } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import Header from "@src/components/RegisterHomeV2/Header";
import Container from "@src/components/common/Container";
import WalletCard from "@src/components/RegisterHomeV2/WalletCard";
import { wp } from "@src/components/common/Responsive";
import Adds from "@src/assets/images/My_ads.png";
import Sq from "@src/assets/images/My_sq_ft.png";
import Wallet from "@src/assets/images/My_Wallet.png";
import Buy from "@src/assets/images/Buy_sq_ft.png";
import Trans from "@src/assets/images/transaction_icon.png";
import Trends from "@src/assets/images/Trends.png";
import Icon1 from "@src/assets/images/history_profile.svg";
import Icon2 from "@src/assets/images/history_map.svg";
import Icon3 from "@src/assets/images/history_one.svg";
import Icon4 from "@src/assets/images/history_clock.svg";
import Fonts from "@src/theme/fonts";
import ResponsiveText from "@src/components/common/ResponseiveText";
import ViewMore from "@src/assets/images/button.svg";
import { RootState } from "@src/redux/reducers";
import {
  calculateTimeStamp,
  circleProgressHours,
  valueWithCommas,
} from "@src/utils/helperFunction";
import Proof from "@src/assets/images/proof.png";
import MRegisterUserApiService from "@src/services/MRegisterUserApiService";
import useActions from "@src/utils/useActions";
import Loader from "@src/components/ui/loader/Loader";
import KycProof from "@src/assets/images/Kyc_proof.svg";
import UpArrow from "@src/assets/images/up_arrow.svg";
import DownArrow from "@src/assets/images/down_arrow.svg";
import { useSafeDispatch } from "@src/hooks/useSafeDispatch";
import { store } from "@src/redux";
import MalIcon from "@src/assets/images/malGur.svg";
import ProgressCircle from "react-native-progress-circle";
import moment from "moment";
import { handelColor } from "../CashOut/PendingState";
const TRANSACTION_HISTORY_LIMIT = 4;

export type LoadingType = "FIRST_TIME" | "PULL_TO_REFRESH";

const RegisterHome = (props) => {
  // props.navigation.goBack()
  const [transactionCount, setTransactionCount] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [simple, setSimple] = useState({});
  const [refreshing, setRefreshing] = React.useState(false);
  const actions = useActions({
    refreshingApi: MRegisterUserApiService.refreshingApi,
  });
  const dispatch = useSafeDispatch();
  const [backPressCount, setBackPressCount] = useState(0);
  const [kycProof, setKycProof] = useState(false);
  let backHandlerClickCount = 0;

  React.useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);
  useEffect(() => {
    fetchDetails();
  }, []);
  async function fetchDetails() {
    await dispatch(
      MRegisterUserApiService.useTransactionHistoryList(
        Number(
          store.getState()?.registerUser?.registerUserData?.userInfo?.userId!
        )
      )
    );
  }

  const backAction = useCallback(() => {
    if (props.route.name == "RegisterHome") {
      if (props.navigation.isFocused()) {
        if (backHandlerClickCount === 0) {
          backHandlerClickCount += 1;
          setTimeout(() => setBackPressCount(0), 2000);
          ToastAndroid.show("Press one more time to exit", ToastAndroid.SHORT);
        } else if (backHandlerClickCount === 1) {
          BackHandler.exitApp();
        }
        return true;
      }
    } else {
      props.navigation.goBack();
      return false;
    }
  }, [backPressCount, setBackPressCount]);

  useEffect(() => {
    if (registerUserData?.userInfo?.userId) refreshingData("FIRST_TIME");
    else SimpleToast.show("User Id is not found!");
  }, []);
  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      setSimple({});
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [props.navigation]);
  // const handleBackPress = useCallback(() => {
  //   if (navIndex == 0) {
  //     if (backPressCount === 0) {
  //       setBackPressCount((prevCount) => prevCount + 1);
  //       setTimeout(() => setBackPressCount(0), 2000);
  //       ToastAndroid.show("Press one more time to exit", ToastAndroid.SHORT);
  //     } else if (backPressCount === 1) {
  //       BackHandler.exitApp();
  //     }
  //   }
  //   return true;
  // }, [backPressCount]);

  // const getState = () => (state: RootState) => state;
  // const memoizedState = createSelector(
  //   getState(),
  //   (data) => data.registerUser.registerUserData
  // );
  const registerUserData = useSelector(
    (state: RootState) => state.registerUser.registerUserData
  );

  const { KycStatus } = registerUserData?.propertiesData?.data ?? "";

  // const memoizedState = createSelector(
  //   (state: RootState) => state.registerUser.registerUserData,
  //! callback function to resolve data of first function
  //   (data) => data
  // );

  const index = registerUserData?.propertiesData?.data?.date?.lastIndexOf(".");
  const expiryDateIndex =
    registerUserData?.propertiesData?.data?.currentDate?.lastIndexOf(".");

  const onRefresh = useCallback(() => {
    refreshingData("PULL_TO_REFRESH");
  }, []);

  function refreshingData(type: LoadingType) {
    if (type == "FIRST_TIME") setLoading(true);
    else setRefreshing(true);
    const response: any = actions.refreshingApi(
      registerUserData?.userInfo?.userId
    );
    if (response) {
      setTimeout(() => {
        type == "FIRST_TIME" ? setLoading(false) : setRefreshing(false);
      }, 2000);
    }
  }

  const { colors } = useTheme();
  return (
    <Container>
      <View>
        <Header
          name={
            registerUserData?.userInfo?.firstName?.replace(/^./, (str) =>
              str.toUpperCase()
            ) +
            " " +
            registerUserData?.userInfo?.lastName?.replace(/^./, (str) =>
              str.toUpperCase()
            )
          }
          navigation={props.navigation}
        />
      </View>
      <View style={{ paddingHorizontal: wp(4), paddingBottom: wp(0.5) }}>
        <WalletCard {...props} />
      </View>

      <ScrollView
        onMomentumScrollEnd={() => {
          transactionCount * TRANSACTION_HISTORY_LIMIT <
            _.size(registerUserData?.liveTransactions) &&
            setTransactionCount((prev) => prev + 1);
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={{ paddingHorizontal: wp(4) }}
      >
        {(KycStatus == "3" || KycStatus == "0") && (
          <View
            style={{
              backgroundColor: "#FFF3CD",
              width: wp(91.47),
              borderRadius: wp(2),
              marginTop: wp(3),
              paddingHorizontal: wp(4),
              paddingVertical: wp(4),
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setKycProof(!kycProof);
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <KycProof />
                  <ResponsiveText
                    style={{
                      color: "#856405",
                      fontSize: 4.8,
                      fontFamily: Fonts.ManropeBold,
                      paddingLeft: wp(2),
                      marginTop: wp(0.5),
                    }}
                  >
                    {KycStatus == "3" || KycStatus == "0"
                      ? "Proof of Identity is pending"
                      : null}
                  </ResponsiveText>
                </View>

                {KycStatus == "3" || KycStatus == "0" ? (
                  kycProof ? (
                    <UpArrow color={"#856405"} width={wp(4)} height={wp(4)} />
                  ) : (
                    <DownArrow color={"#856405"} width={wp(4)} height={wp(4)} />
                  )
                ) : null}
              </View>
            </TouchableOpacity>

            <>
              {KycStatus == "3" || KycStatus == "0"
                ? kycProof && (
                    <View>
                      <ResponsiveText
                        style={{ paddingVertical: wp(2.5), color: "#856405" }}
                      >
                        Proof of purchase will be issued after completion of
                        this step.
                      </ResponsiveText>
                      <ResponsiveText style={{ color: "#856405" }}>
                        Sale of Sqft is allowed after completion of{"\n"}this
                        step.
                      </ResponsiveText>
                      <TouchableOpacity
                        onPress={() =>
                          props.navigation.navigate("DashBoardStack", {
                            screen: "UnregisterUserStack",
                            params: {
                              screen: "KycPakistan",
                            },
                          })
                        }
                      >
                        <ResponsiveText
                          style={{
                            alignSelf: "flex-end",
                            paddingRight: wp(5),
                            fontSize: 3.5,
                          }}
                        >
                          Verify Now
                        </ResponsiveText>
                      </TouchableOpacity>
                    </View>
                  )
                : null}
            </>
          </View>
        )}

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: wp(4),
          }}
        >
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("RegisterBuyNowStack");
            }}
          >
            <Image
              style={{
                height: wp(39.47),
                width: wp(59.47),
                resizeMode: "contain",
              }}
              source={Buy}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("MySqFt");
            }}
          >
            <Image
              style={{
                height: wp(39.47),
                width: wp(27.73),
                resizeMode: "contain",
              }}
              source={Sq}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: wp(4),
          }}
        >
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("Trends");
            }}
          >
            <Image
              style={{
                height: wp(39.47),
                width: wp(27.73),
                resizeMode: "contain",
              }}
              source={Trends}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("MyAds");
            }}
          >
            <Image
              style={{
                height: wp(39.47),
                width: wp(27.73),
                resizeMode: "contain",
              }}
              source={Adds}
            />
            {/* <View
              style={{
                backgroundColor: "#2BACE3",
                position: "absolute",
                right: -5,
                top: -5,
                width: wp(6.4),
                height: wp(6.4),
                borderRadius: wp(5),
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ResponsiveText style={{ color: "white" }}>2</ResponsiveText>
            </View> */}
          </TouchableOpacity>

          <View style={{ justifyContent: "space-between" }}>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate("TransactionHistory");
              }}
            >
              <Image
                style={{
                  height: wp(17.6),
                  width: wp(27.73),
                  resizeMode: "contain",
                }}
                source={Trans}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                props.navigation.push("Wallet", {
                  name:
                    registerUserData?.userInfo?.firstName?.replace(
                      /^./,
                      (str) => str.toUpperCase()
                    ) +
                    " " +
                    registerUserData?.userInfo?.lastName?.replace(/^./, (str) =>
                      str.toUpperCase()
                    ),
                });
              }}
            >
              <Image
                style={{
                  height: wp(17.6),
                  width: wp(27.73),
                  resizeMode: "contain",
                }}
                source={Wallet}
              />
            </TouchableOpacity>
          </View>
        </View>
        {registerUserData?.propertiesData?.data?.date != "No" && (
          <Pressable
            onPress={() => {
              props.navigation.navigate("MalkiyatBuyBack");
            }}
            style={{
              justifyContent: "center",
              height: wp(24.53),
              backgroundColor: "#2BACE3",
              borderWidth: 1,
              borderColor: "#FF9A2E",
              borderRadius: 12,
              marginTop: wp(5),
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <MalIcon width={wp(49.87)} height={wp(13.33)} />
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <ProgressCircle
                outerCircleStyle={{}}
                containerStyle={{}}
                percent={circleProgressHours(
                  registerUserData?.propertiesData?.data?.ExpiryAndCreatedDate
                    .purchased_date as unknown as Date,

                  registerUserData?.propertiesData?.data?.ExpiryAndCreatedDate
                    .expiry_date as unknown as Date
                )}
                radius={wp(6)}
                borderWidth={6}
                color={"#FF9A2E"}
                shadowColor="#ECECEC"
                bgColor="#2BACE3"
              ></ProgressCircle>
              <View style={{ marginLeft: wp(3), marginRight: wp(4) }}>
                <ResponsiveText
                  style={{
                    fontSize: 4.27,
                    color: "white",
                    // color: handelColor(
                    //   circleProgressHours(
                    //     item.createdDate,
                    //     item.expiryDate
                    //   )
                    // ),
                    fontFamily: Fonts.ManropeBold,
                  }}
                >
                  {moment(
                    registerUserData?.propertiesData?.data.ExpiryAndCreatedDate
                      .expiry_date,
                    "YYYY-MM-DD HH:mm:ss"
                  ).diff(moment(), "minutes") > 0
                    ? calculateTimeStamp(
                        Date.now() ?? undefined,
                        moment(
                          registerUserData?.propertiesData?.data
                            ?.ExpiryAndCreatedDate.expiry_date,
                          "YYYY-MM-DD HH:mm:ss"
                        )
                      )
                    : "0 mins"}
                  {/* { registerUserData?.propertiesData?.data?.data} */}
                </ResponsiveText>
                <ResponsiveText
                  style={{
                    fontSize: 3.2,
                    color: "#DEDEDE",
                    fontFamily: Fonts.ManropeSemiBold,
                  }}
                >
                  Remaining
                </ResponsiveText>
              </View>
            </View>
          </Pressable>
        )}

        <ResponsiveText
          style={{
            fontSize: 4.27,
            fontFamily: Fonts.ManropeBold,
            marginTop: wp(5),
            marginBottom: wp(3),
          }}
        >
          Purchases happening – Live
        </ResponsiveText>
        <View
          style={{
            paddingVertical: wp(3),
            paddingHorizontal: wp(3),
            borderWidth: 1,
            borderRadius: wp(2),
            borderColor: colors.Primary,
            marginBottom: wp(3),
            // flex: 1,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              marginBottom: wp(3),
            }}
          >
            <View style={styles.iconCon}>
              <Icon4 />
            </View>
            <View style={styles.iconCon}>
              <Icon2 />
            </View>
            <View style={styles.iconCon}>
              <Icon3 />
            </View>
            <View style={styles.iconCon}>
              <Icon1 />
            </View>
          </View>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            {!_.isUndefined(registerUserData?.liveTransactions) &&
            !_.isUndefined(registerUserData?.liveTransactions)
              ? registerUserData?.liveTransactions
                  ?.slice(0, TRANSACTION_HISTORY_LIMIT * transactionCount)
                  ?.map((item, index) => {
                    return (
                      <View
                        key={index}
                        style={{ paddingHorizontal: wp(0), flex: 1 }}
                      >
                        <View
                          style={{ backgroundColor: "#F2F2F2", height: 1 }}
                        />
                        <View style={styles.outer}>
                          <ResponsiveText
                            style={{
                              ...styles.innerCon,
                              lineHeight: 20,
                            }}
                          >
                            {/* {item.username.slice(0, 3) + "***"} */}
                            <ResponsiveText
                              style={{
                                ...styles.innerCon,
                                color: "#3577DB",
                                fontFamily: Fonts.ManropeBold,
                              }}
                            >
                              {calculateTimeStamp(
                                item?.transactionDate,
                                moment()
                              )}
                              {"\n"}
                            </ResponsiveText>
                            ago
                          </ResponsiveText>
                          <ResponsiveText
                            style={{
                              ...styles.innerCon,
                              fontFamily: Fonts.ManropeSemiBold,
                            }}
                          >
                            {/* {item.city} */}
                            {item?.propertyName}
                            {"\n"}
                          </ResponsiveText>
                          <ResponsiveText
                            style={{
                              ...styles.innerCon,
                              color: "#9E9E9E",
                              fontFamily: Fonts.ManropeBold,
                              lineHeight: 20,
                            }}
                          >
                            {/* {item.city} */}
                            {item?.propertyName}
                            {"\n"}
                            <ResponsiveText
                              style={{
                                ...styles.innerCon,
                                color: "#9E9E9E",
                                fontFamily: Fonts.ManropeBold,
                                lineHeight: 20,
                              }}
                            >
                              {item?.biggerUnitArea} {item?.biggerUnit}
                            </ResponsiveText>
                          </ResponsiveText>
                          <ResponsiveText style={styles.innerCon}>
                            <ResponsiveText style={styles.boldText}>
                              {/* {item?.soldSmallerUnit} */}{" "}
                              {valueWithCommas(item?.boughtSmallerUnits)}
                            </ResponsiveText>{" "}
                            Sqft
                          </ResponsiveText>
                          <ResponsiveText style={styles.innerCon}>
                            {/* {calculateTimeStamp(item?.dateTime)} */}
                            {item?.customerName?.slice(0, 3) + "***"}
                          </ResponsiveText>
                        </View>
                      </View>
                    );
                  })
              : null}
          </ScrollView>
        </View>
        {/* {transactionCount * TRANSACTION_HISTORY_LIMIT <
          _.size(registerUserData?.liveTransactions) && (
          <TouchableOpacity
            onPress={() => setTransactionCount((prev) => prev + 1)}
            style={{ alignSelf: "flex-end", marginBottom: 15 }}
          >
            <ViewMore />
          </TouchableOpacity>
        )} */}
      </ScrollView>
      <Loader visible={loading} />
    </Container>
  );
};
const styles = StyleSheet.create({
  iconCon: {
    flex: 1,
    // backgroundColor: "red",
    alignItems: "center",
  },
  innerCon: {
    fontSize: 3.47,
    flex: 1,
    //   backgroundColor: "red",
    textAlign: "center",
  },
  outer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: wp(3),
  },
  boldText: {
    fontSize: 3.47,
    flex: 1,
    // backgroundColor: "red",
    textAlign: "center",
    fontFamily: Fonts.ManropeBold,
  },
});
export default RegisterHome;
