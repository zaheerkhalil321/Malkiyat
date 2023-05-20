import { View, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import {
  NavigationProp,
  ParamListBase,
  RouteProp,
  useTheme,
} from "@react-navigation/native";
import ProgressCircle from "react-native-progress-circle";

import Container from "@src/components/common/Container";
import ResponsiveText from "@src/components/common/ResponseiveText";
import { wp } from "@src/components/common/Responsive";
import Fonts from "@src/theme/fonts";
import Icon1 from "@src/assets/images/history_profile.svg";
import Icon2 from "@src/assets/images/history_map.svg";
import Icon3 from "@src/assets/images/history_one.svg";
import Icon4 from "@src/assets/images/history_clock.svg";
import {
  calculateTimeStamp,
  valueConverstion,
} from "@src/utils/helperFunction";
import { RootState } from "@src/redux/reducers";
import { PropertyDetailI } from "@src/services/model";

interface Props {
  navigation: NavigationProp<ParamListBase>;
  route: RouteProp<ParamListBase>;
  propInfo: PropertyDetailI;
}

const SoldHistory = (props: Props) => {
  const reducerState = useSelector(
    (state: RootState) => state.unregisterUser.propertyAllData
  );

  const { colors } = useTheme();
  return (
    <Container>
      <View
        style={{
          paddingHorizontal: wp(4),
          paddingVertical: wp(4),
          flex: 1,
          marginBottom: wp(55),
        }}
      >
        <View
          style={{
            flexDirection: "row",
            height: wp(39.47),
            backgroundColor: "#2BACE3",
            alignItems: "center",
            justifyContent: "space-between",
            borderRadius: wp(2),
            paddingHorizontal: wp(7),
          }}
        >
          <View
            style={{
              flexDirection: "column",
              justifyContent: "flex-start",
            }}
          >
            <ResponsiveText
              style={{
                fontFamily: Fonts.ManropeSemiBold,
                fontSize: 5,
                color: "white",
              }}
            >
              Total Sold
            </ResponsiveText>
            <ResponsiveText
              style={{
                paddingTop: wp(3),
              }}
            >
              <ResponsiveText
                style={{
                  fontFamily: Fonts.ManropeBold,
                  color: "white",
                  fontSize: 8.53,
                }}
              >
                {valueConverstion(
                  reducerState?.propertySoldHistory?.sqFtSoldHistory
                    ?.soldSmallerUnit ?? 0
                )}
              </ResponsiveText>

              <ResponsiveText style={{ fontSize: 5, color: "white" }}>
                {" "}
                Sqft
              </ResponsiveText>
            </ResponsiveText>
          </View>
          <ProgressCircle
            //   percent={graphProgress()}
            percent={Number(
              reducerState?.propertySoldHistory?.sqFtSoldHistory?.percentage ??
                0
            )}
            radius={62}
            borderWidth={25}
            color={"#FF9A2E"}
            shadowColor="white"
            bgColor="#2BACE3"
          >
            <ResponsiveText
              style={{
                fontSize: 4.8,
                fontFamily: Fonts.ManropeBold,
                color: "white",
                textAlign: "center",
              }}
            >
              {/* {calculateGraphPerc()} % */}
              {Math.floor(
                Math.floor(Number(props.propInfo?.soldPercentage!)) ?? 0
              )}
              %{"\n"}
              Sold
            </ResponsiveText>
          </ProgressCircle>
        </View>
        <ResponsiveText
          style={{
            fontSize: 4.27,
            fontFamily: Fonts.ManropeBold,
            marginTop: wp(5),
            marginBottom: wp(3),
          }}
        >
          Square Feet Sold History
        </ResponsiveText>
        <View
          style={{
            paddingVertical: wp(3),
            paddingHorizontal: wp(3),
            borderWidth: 1,
            borderRadius: wp(2),
            borderColor: colors.Primary,
            marginBottom: wp(7),
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
              <Icon1 />
            </View>
            <View style={styles.iconCon}>
              <Icon2 />
            </View>
            <View style={styles.iconCon}>
              <Icon3 width={17} height={17} />
            </View>
            <View style={styles.iconCon}>
              <Icon4 />
            </View>
          </View>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            {reducerState?.propertySoldHistory?.soldPropertiesHistories?.map(
              (item, index) => {
                return (
                  <View
                    key={index}
                    style={{ paddingHorizontal: wp(0), flex: 1 }}
                  >
                    <View style={{ backgroundColor: "#F2F2F2", height: 1 }} />
                    <View style={styles.outer}>
                      <ResponsiveText style={styles.innerCon}>
                        {item.username.slice(0, 3) + "***"}
                      </ResponsiveText>
                      <ResponsiveText style={styles.innerCon}>
                        {item.city}
                      </ResponsiveText>
                      <ResponsiveText style={styles.innerCon}>
                        <ResponsiveText style={styles.boldText}>
                          {item?.soldSmallerUnit}
                        </ResponsiveText>{" "}
                        Sqft
                      </ResponsiveText>
                      <ResponsiveText style={styles.innerCon}>
                        {calculateTimeStamp(item?.dateTime)}
                      </ResponsiveText>
                    </View>
                  </View>
                );
              }
            )}
          </ScrollView>
        </View>
      </View>
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
    paddingVertical: wp(2),
  },
  boldText: {
    fontSize: 3.47,
    flex: 1,
    // backgroundColor: "red",
    textAlign: "center",
    fontFamily: Fonts.ManropeBold,
  },
});
export default SoldHistory;
