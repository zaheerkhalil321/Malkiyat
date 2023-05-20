import { View, StyleSheet, ScrollView, Alert } from "react-native";
import { useTheme } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PagerView from "react-native-pager-view";
import ProgressCircle from "react-native-progress-circle";

import Container from "@src/components/common/Container";
import Header from "@src/components/common/Header";
import { hp, wp } from "@src/components/common/Responsive";
import ResponsiveText from "@src/components/common/ResponseiveText";
import BoxLayout from "@src/components/common/BoxLayout";
import MUnregisterUser from "@src/services/MUnregisterUserApiService";
import { RootState } from "@src/redux/reducers";
import {
  calculateTimeStamp,
  SqftSpace,
  valueWithCommas,
} from "@src/utils/helperFunction";
import Fonts from "@src/theme/fonts";
import _ from "lodash";
import { useSafeDispatch } from "@src/hooks/useSafeDispatch";

const PropertyHistory = (props: any) => {
  const { data } = props.route?.params ?? undefined;
  const { colors } = useTheme();
  const [sliderState, setSliderState] = useState<number>();

  const dispatch = useSafeDispatch();
  const soldHistory = useSelector(
    (state: RootState) => state.unregisterUser.propertySoldHisotry
  );
  useEffect(() => {
    dispatch(MUnregisterUser.getSqftSoldHistoryById(data.id));
  }, [data.id]);
  function calculateGraphPerc() {
    const amount = (
      (soldHistory!?.sqFtSoldHistory?.soldSmallerUnit! /
        soldHistory?.sqFtSoldHistory?.totalSqFts!) *
      100
    ).toFixed();
    if (amount == "NaN") {
      return "0";
    } else if (Number(amount) < 1) {
      return "<1";
    } else {
      return amount;
    }
  }
  function graphProgress() {
    const val =
      (soldHistory!?.sqFtSoldHistory?.soldSmallerUnit! /
        soldHistory?.sqFtSoldHistory?.totalSqFts!) *
      100;

    return val;
  }
  return (
    <Container
      style={{ backgroundColor: "#F4F4F4" }}
      statusBarColor={"#F4F4F4"}
      barStyle={"dark-content"}
    >
      <Header {...props} title="Sqft Sold History" backgroundColor="white" />
      <ScrollView>
        <PagerView
          onPageSelected={(e) => {
            setSliderState(e.nativeEvent.position);
          }}
          style={{ height: hp(24), marginTop: wp(4) }}
        >
          <BoxLayout key={1} h={hp(23)} direction="row">
            <View
              style={
                {
                  // flexDirection: "column",
                  // backgroundColor: "red",
                  // justifyContent: "flex-start",
                }
              }
            >
              <ResponsiveText
                style={{ fontFamily: Fonts.ManropeBold, fontSize: 5 }}
              >
                Total Sold
              </ResponsiveText>
              <ResponsiveText
                style={{
                  paddingTop: wp(2),
                }}
              >
                <ResponsiveText
                  style={{
                    fontWeight: "bold",
                    color: colors.Primary,
                    fontSize: 8,
                  }}
                >
                  {soldHistory!?.sqFtSoldHistory != null
                    ? `${soldHistory!?.sqFtSoldHistory?.soldSmallerUnit} `
                    : "0 "}
                </ResponsiveText>

                <ResponsiveText style={{ fontSize: 5, color: "#808793" }}>
                  {/* {soldHistory!?.sqFtSoldHistory != null
                    ? soldHistory?.sqFtSoldHistory?.smallerUnit
                    : "sq-ft"} */}
                  Sqft
                </ResponsiveText>
              </ResponsiveText>
            </View>
            <ProgressCircle
              percent={graphProgress()}
              radius={80}
              borderWidth={30}
              color={colors.Primary}
              shadowColor="#132136"
              bgColor="#fff"
            >
              <ResponsiveText style={{ fontSize: 7 }}>
                {calculateGraphPerc()} %
              </ResponsiveText>
            </ProgressCircle>
          </BoxLayout>
          {/* <BoxLayout key={2} h={hp(30)} direction="column" align="flex-start">
            <ResponsiveText style={styles.text}>
              SQ-Ft Sold Graph
            </ResponsiveText>
            {soldHistory?.soldHistoryByMonths && (
              <Chart key={2} data={soldHistory?.soldHistoryByMonths} />
              // <SoldChart key={2} data={soldHistory?.soldHistoryByMonths} />
            )}
          </BoxLayout> */}
        </PagerView>
        {/* <View
          style={{
            //   backgroundColor: 'yellow',
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: wp(2),
          }}
        >
          {[...Array(2)].map((key, idx) => (
            <View
              key={idx}
              style={[
                styles.dotPill,
                idx === sliderState ? styles.dotpillActive : {},
                idx === sliderState
                  ? { backgroundColor: "#1C75BC", borderColor: "white" }
                  : {},
              ]}
            />
          ))}
        </View> */}
        <View>
          <ResponsiveText style={styles.text}>Purchase History</ResponsiveText>
          <View>
            {soldHistory?.soldPropertiesHistories?.map((item, index) => {
              return (
                <BoxLayout
                  h={80}
                  direction="column"
                  align="flex-start"
                  key={index}
                >
                  <ResponsiveText
                    style={{ fontSize: 3, color: colors.Primary }}
                  >
                    {`${calculateTimeStamp(item.dateTime!)}`}
                  </ResponsiveText>
                  <ResponsiveText style={{ fontSize: 3 }}>
                    {`${item.firstName!?.substring(
                      0,
                      3
                    )}** ${item.lastName!?.substring(0, 1)}** bought `}
                    <ResponsiveText
                      style={{
                        fontWeight: "bold",
                        // backgroundColor: "red",
                      }}
                    >
                      {SqftSpace(String(item.soldSmallerUnit))}
                    </ResponsiveText>{" "}
                    Sqft for Rs{" "}
                    <ResponsiveText
                      style={{
                        fontWeight: "bold",
                      }}
                    >
                      {valueWithCommas(item.smallerUnitPrice)}{" "}
                    </ResponsiveText>
                    Per Sqft
                  </ResponsiveText>
                </BoxLayout>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  text: {
    paddingVertical: hp(2),
    paddingLeft: 20,
    fontWeight: "bold",
  },
  dotPill: {
    borderWidth: 1,
    borderColor: "#3577DB",
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

export default PropertyHistory;
