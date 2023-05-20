import {
  View,
  StyleSheet,
  useWindowDimensions,
  Animated,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { createSelector } from "reselect";
import _ from "lodash";
import { SwipeListView } from "react-native-swipe-list-view";
import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from "@react-navigation/native";
import { useSelector } from "react-redux";

import Container from "@src/components/common/Container";
import HomeHeader from "@src/components/ui/HomeHeader/HomeHeader";
import { wp } from "@src/components/common/Responsive";
import Fonts from "@src/theme/fonts";
import ResponsiveText from "@src/components/common/ResponseiveText";
import IconComponent from "@src/components/RegisterHomeV2/IconComponent";
import InnerComponent from "@src/components/RegisterHomeV2/InnerComponent";
import { RootState } from "@src/redux/reducers";
import MRegisterUserApiService from "@src/services/MRegisterUserApiService";
import { store } from "@src/redux/store";
import {
  checkValueGreaterThanZero,
  valueConverstion,
} from "@src/utils/helperFunction";
import { PropertyI } from "@src/services/model";
import Loader from "@src/components/ui/loader/Loader";
import NoSqftIcon from "@src/assets/images/no_sqft.svg";
import { useSafeDispatch } from "@src/hooks/useSafeDispatch";
type Props = {
  navigation: NavigationProp<ParamListBase>;
  route: RouteProp<ParamListBase>;
};
const SWIPE_LEFT_BACKGROUNDCOLOR = "#2AACE3";
const SWIPE_RIGHT_BACKGROUNDCOLOR = "#FF9A2E";
var openRowRefs = [] as any;

const MySqFt = (props: Props) => {
  const dispatch = useSafeDispatch();
  const [loading, setLoading] = useState(false);
  const [prevState, setPrevState] = useState<{
    rowNo: string;
    prevValue: number;
    prevRepeat: boolean;
  }>({ rowNo: "0", prevValue: -110, prevRepeat: true });

  const registerUserProperty = useSelector(
    (state: RootState) => state.registerUser.userPropertyData
  );

  const { width: screenWidth } = useWindowDimensions();

  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      fetchDetails();
    });
    return unsubscribe;
  }, [props.navigation]);

  function fetchDetails() {
    if (_.size(registerUserProperty?.data?.propertiesList) == 0) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
    dispatch(
      MRegisterUserApiService.userPropertyList(
        Number(
          store.getState()?.registerUser?.registerUserData?.userInfo?.userId!
        )
      )
    );
  }

  var rowAnimatedValues = {};

  rowAnimatedValues = React.useMemo(() => {
    if (_.size(registerUserProperty?.data?.propertiesList) > 0) {
      registerUserProperty?.data?.propertiesList?.forEach((_, i) => {
        rowAnimatedValues[`${i}`] = {
          rowHeight: new Animated.Value(95),
          rowFrontTranslate: new Animated.Value(1),
          rowBackWidth: new Animated.Value(100),
        };
      });
      return rowAnimatedValues;
    } else {
      return {};
    }
  }, [registerUserProperty?.data?.propertiesList]);

  const onRowDidOpen = (rowKey, rowMap) => {
    openRowRefs.push(rowMap[rowKey]);
  };
  function closeAllOpenRows() {
    openRowRefs.forEach((ref) => {
      ref?.closeRow && ref?.closeRow();
    });
  }
  const onRightActionStatusChange = (rowKey) => {
    console.log("on right action status change");
  };
  const swipeGestureEnded = (rowKey, data) => {
    if (data.translateX < -150) {
      Animated.timing(rowAnimatedValues[rowKey].rowBackWidth, {
        toValue: screenWidth,
        duration: 200,
        useNativeDriver: false,
      }).start(() => {
        props.navigation.navigate("LowerOffer", {
          params: registerUserProperty?.data?.propertiesList[rowKey],
        });
        setTimeout(() => closeAllOpenRows(), 1000);
      });
      // Animated.timing(rowAnimatedValues[rowKey].rowHeight, {
      //   toValue: 60,
      //   delay: 200,
      //   duration: 200,
      //   useNativeDriver: false,
      // }).start(() => console.log("swipe ended"));
      //  deleteRow(rowKey)
    }
    if (data.translateX > 200) {
      Animated.timing(rowAnimatedValues[rowKey].rowBackWidth, {
        toValue: screenWidth,
        duration: 200,
        useNativeDriver: false,
      }).start(() => {
        props.navigation.navigate("SellSqft", {
          params: registerUserProperty?.data?.propertiesList[rowKey],
        });
        setTimeout(() => closeAllOpenRows(), 1000);
      });
    }
  };
  const renderItem = ({ item, index }: { item: PropertyI; index: number }) => {
    return (
      <TouchableOpacity
        key={index}
        activeOpacity={1}
        onPress={() => console.log("You touched me")}
        style={styles.rowFront}
      >
        <Animated.View
          style={[
            styles.rowFront,
            {
              height: rowAnimatedValues[index].rowHeight,
              transform: [
                {
                  translateX: rowAnimatedValues[
                    index
                  ].rowFrontTranslate.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-screenWidth, 0],
                    extrapolate: "clamp",
                  }),
                },
              ],
            },
          ]}
        >
          <InnerComponent {...item} />
        </Animated.View>
      </TouchableOpacity>
    );
  };
  const renderHiddenActions = (data, rowMap) => (
    <RenderHiddenItem
      data={data}
      rowMap={rowMap}
      rowKey={data.item.key}
      // onClose={() => closeRow(rowMap, data.item.key)}
      // onDelete={() => onDelete(data.item.key)}
    />
  );
  const RenderHiddenItem = (item) => {
    const {
      leftActionActivated,
      rightActionActivated,
      swipeAnimatedValue,
      rowKey,
      data,
      navigation,
      // onClose,
      // onDelete,
    } = item;

    if (rightActionActivated) {
      Animated.timing(rowAnimatedValues[rowKey].rowBackWidth, {
        toValue: Math.abs(swipeAnimatedValue.__getValue()),
        duration: 200,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(rowAnimatedValues[rowKey].rowBackWidth, {
        toValue: Math.abs(swipeAnimatedValue.__getValue()),
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
    return (
      <Animated.View
        style={{
          flexDirection: "row",
          flex: 1,
          marginHorizontal: wp(4),
          borderRadius: wp(2),
          overflow: "hidden",
          marginBottom: wp(3),
        }}
      >
        {!rightActionActivated && (
          <TouchableWithoutFeedback
            onPress={() => {
              props.navigation.navigate("SellSqft", { params: data.item });
              setTimeout(() => closeAllOpenRows(), 1000);
            }}
          >
            <Animated.View
              style={[
                {
                  backgroundColor: SWIPE_LEFT_BACKGROUNDCOLOR,
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                },
                {
                  transform: [
                    {
                      translateX: swipeAnimatedValue.interpolate({
                        inputRange: [0, 120, 200],
                        outputRange: [0, -40, 0],
                        extrapolate: "clamp",
                      }),
                    },
                  ],
                },
              ]}
            >
              <ResponsiveText
                style={{
                  textAlign: "center",
                  color: "white",
                  fontFamily: Fonts.ManropeBold,
                }}
              >
                Sell your{"\n"}Sqft
              </ResponsiveText>
            </Animated.View>
          </TouchableWithoutFeedback>
        )}
        {!leftActionActivated && !rightActionActivated && (
          <TouchableWithoutFeedback
            onPress={() => {
              props.navigation.navigate("LowerOffer", { params: data.item });
              setTimeout(() => closeAllOpenRows(), 1000);
            }}
          >
            <Animated.View
              style={[
                {
                  backgroundColor: SWIPE_RIGHT_BACKGROUNDCOLOR,
                  flex: 0.8,
                  alignItems: "flex-end",
                  justifyContent: "center",
                  paddingRight: wp(5),
                },
              ]}
            >
              <ResponsiveText
                style={{
                  textAlign: "center",
                  color: "white",
                  fontFamily: Fonts.ManropeBold,
                }}
              >
                Buy more{"\n"}Sqft
              </ResponsiveText>
            </Animated.View>
          </TouchableWithoutFeedback>
        )}

        {rightActionActivated && (
          <TouchableWithoutFeedback
            onPress={() => {
              console.log("right swipe");
            }}
          >
            <Animated.View
              style={[
                {
                  backgroundColor: SWIPE_RIGHT_BACKGROUNDCOLOR,
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                },
                {
                  // width: rowAnimatedValues[rowKey].rowBackWidth,
                  transform: [
                    {
                      translateX: swipeAnimatedValue.interpolate({
                        inputRange: [-200, -100, -50, 0],
                        outputRange: [0, 140, -640, 100],
                        extrapolate: "clamp",
                      }),
                    },
                  ],
                },
              ]}
            >
              <ResponsiveText
                style={{
                  textAlign: "center",
                  color: "white",
                  fontFamily: Fonts.ManropeBold,
                }}
              >
                Buy more{"\n"}Sqft
              </ResponsiveText>
            </Animated.View>
          </TouchableWithoutFeedback>
        )}
      </Animated.View>
    );
  };

  return (
    <Container>
      <View>
        <HomeHeader
          back
          backgroundColor={"white"}
          show={true}
          {...props}
          title={"My Sqft"}
          bell
        />
      </View>
      <IconComponent {...props} />
      <View
        style={{
          backgroundColor: "#F8F8F8",
          borderWidth: 1,
          borderColor: "#BDBDBD",
          marginHorizontal: wp(4),
          paddingVertical: wp(3),
          paddingHorizontal: wp(4),
          borderRadius: wp(2),
          marginBottom: wp(3),
        }}
      >
        {checkValueGreaterThanZero(
          Number(registerUserProperty?.data?.totalProfitPercentage)
        ) && (
          <ResponsiveText
            style={{
              ...styles.percen,
              color:
                Number(registerUserProperty?.data?.totalProfitPercentage) > 0
                  ? "#4CAF50"
                  : "red",
            }}
          >
            {parseFloat(
              String(registerUserProperty?.data?.totalProfitPercentage ?? 0)
            ).toFixed(0)}
            {"%"}
          </ResponsiveText>
        )}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <ResponsiveText
            style={{
              ...styles.innerCon,
              fontFamily: Fonts.ManropeSemiBold,
              ...{ fontSize: 4 },
              width: wp(16),
            }}
          >
            Total
          </ResponsiveText>
          <View
            style={{
              flexDirection: "row",
              width: wp(21),
            }}
          >
            <ResponsiveText
              numberOfLines={1}
              style={{
                ...styles.innerCon,
                fontFamily: Fonts.ManropeBold,
                fontSize: 4,
              }}
            >
              {valueConverstion(
                registerUserProperty?.data?.ownedUnitsTotal ?? 0
              )}
            </ResponsiveText>
            <ResponsiveText
              style={{
                fontSize: 3.2,
                alignSelf: "flex-end",
                // marginBottom: wp(0.5),
              }}
            >
              {" "}
              Sqft
            </ResponsiveText>
          </View>
          <View
            style={{
              flexDirection: "row",
              width: wp(21),
            }}
          >
            <ResponsiveText
              style={{
                ...styles.innerCon,
                fontFamily: Fonts.ManropeBold,
                fontSize: 4,
              }}
            >
              {valueConverstion(
                registerUserProperty?.data?.currentTotalValue ?? 0
              )}
            </ResponsiveText>
          </View>

          <ResponsiveText
            style={{
              ...styles.innerCon,
              fontFamily: Fonts.ManropeBold,
              fontSize: 4,
              width: wp(21),
              textAlign: "right",
            }}
          >
            {valueConverstion(registerUserProperty?.data?.totalProfit ?? 0)}
          </ResponsiveText>
        </View>
      </View>
      {_.size(registerUserProperty?.data?.propertiesList) == 0 && (
        <View
          style={{ justifyContent: "center", alignItems: "center", flex: 4 }}
        >
          <NoSqftIcon />
          <ResponsiveText style={{ marginTop: wp(5) }}>
            No Sqft to show yet
          </ResponsiveText>
        </View>
      )}

      <View
        pointerEvents={prevState.prevRepeat ? "none" : "auto"}
        style={styles.container}
      >
        {_.size(registerUserProperty?.data?.propertiesList) > 0 && (
          <SwipeListView
            {...props}
            data={registerUserProperty?.data?.propertiesList ?? []}
            renderItem={renderItem}
            renderHiddenItem={renderHiddenActions}
            leftOpenValue={120}
            rightOpenValue={-110}
            stopLeftSwipe={210}
            stopRightSwipe={-201}
            rightActivationValue={-180}
            leftActivationValue={190}
            rightActionValue={-screenWidth}
            leftActionValue={screenWidth}
            onRightActionStatusChange={onRightActionStatusChange}
            onLeftActionStatusChange={() => console.log("check")}
            swipeGestureEnded={swipeGestureEnded}
            swipeToOpenPercent={10}
            swipeToClosePercent={10}
            previewOpenValue={prevState.prevValue}
            previewDuration={300}
            previewRepeatDelay={500}
            previewRepeat={prevState.prevRepeat}
            previewOpenDelay={300}
            previewRowKey={prevState.rowNo}
            onRowDidOpen={onRowDidOpen}
            disableLeftSwipe={prevState.prevRepeat}
            disableRightSwipe={prevState.prevRepeat}
            onLeftAction={(f) => console.log(f)}
            //@ts-ignore
            onPreviewEnd={() => {
              setPrevState({
                rowNo: "0",
                prevValue: 120,
                prevRepeat: prevState.prevValue == 120 ? false : true,
              });
            }}
            useNativeDriver={false}
          />
        )}
      </View>
      <Loader visible={loading} />
    </Container>
  );
};
const styles = StyleSheet.create({
  percen: {
    color: "#4CAF50",
    fontSize: 2.93,
    alignSelf: "flex-end",
    fontFamily: Fonts.ManropeBold,
    marginBottom: wp(0.5),
  },
  iconCon: {
    alignItems: "center",
  },
  innerCon: {
    fontSize: 3.47,
  },
  outer: {
    backgroundColor: "#F8F8F8",
    borderWidth: 1,
    borderColor: "#BDBDBD",
    marginHorizontal: wp(4),
    paddingVertical: wp(3),
    paddingHorizontal: wp(4),
    borderRadius: wp(2),
    marginBottom: wp(3),
  },
  boldText: {
    fontSize: 3.47,
    flex: 1,
    textAlign: "center",
    fontFamily: Fonts.ManropeBold,
  },
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  backTextWhite: {
    color: "#FFF",
  },
  rowFront: {
    backgroundColor: "white",
    marginHorizontal: wp(2),
    flex: 1,
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: "red",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: wp(3),
    borderRadius: wp(2),
  },
  backRightBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 75,
  },
  backRightBtnLeft: {
    backgroundColor: "#FF9A2E",
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: "red",
    right: 0,
  },
  backBtn: {
    position: "absolute",
    bottom: 0,
    top: 0,
    justifyContent: "center",
  },
  backLeftBtn: {
    alignItems: "flex-end",
    backgroundColor: "green",
    paddingRight: 16,
  },
});
export default MySqFt;
