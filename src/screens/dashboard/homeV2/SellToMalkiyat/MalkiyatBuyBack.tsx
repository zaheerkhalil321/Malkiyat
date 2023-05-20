import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";

import Container from "@src/components/common/Container";
import Arrow from "@src/assets/images/arrow_left.svg";
import { wp } from "@src/components/common/Responsive";
import ResponsiveText from "@src/components/common/ResponseiveText";
import Fonts from "@src/theme/fonts";
import Icon1 from "@src/assets/images/pro.svg";
import Icon2 from "@src/assets/images/own.svg";
import Icon3 from "@src/assets/images/Gurrante.svg";
import Icon4 from "@src/assets/images/eden.svg";
import ProgressCircle from "react-native-progress-circle";
import MRegisterUserApiService from "@src/services/MRegisterUserApiService";
import { RootState } from "@src/redux/reducers";
import { BuyBackDetailsI } from "@src/services/model";
import {
  calculateTimeStamp,
  circleProgressHours,
  propertyAdressCheck,
  valueConverstion,
} from "@src/utils/helperFunction";
import { handelColor } from "../CashOut/PendingState";
const MalkiyatBuyBack = (props) => {
  const [buybackData, setBuyBackData] = useState<BuyBackDetailsI[]>([]);
  const [tooltipVisible, setTooltipVisible] = React.useState<boolean>(false);

  const registerUserReducer = useSelector(
    (state: RootState) => state.registerUser.registerUserData
  );

  useEffect(() => {
    (async function () {
      const res = await MRegisterUserApiService.buyBackDetails(
        registerUserReducer?.userInfo?.userId
      );
      setBuyBackData(res.data?.data ?? []);
    })();
  }, []);

  return (
    <Container>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginVertical: wp(5),
          marginLeft: wp(5),
        }}
      >
        <TouchableOpacity
          onPress={() => {
            props.navigation.goBack();
          }}
          activeOpacity={0.8}
          style={{
            width: wp(15),
            marginRight: 5,
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              width: wp(11.73),
              height: wp(11.73),
              borderRadius: wp(3),
              justifyContent: "center",
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.2,
              shadowRadius: 1.41,

              elevation: 2,
            }}
          >
            <Arrow width={wp(5)} height={wp(5)} />
          </View>
        </TouchableOpacity>
        <ResponsiveText
          style={{
            fontSize: 5,
            fontFamily: Fonts.ManropeBold,
          }}
        >
          Buyback Sqft
        </ResponsiveText>
      </View>
      <View
        style={{
          flexDirection: "row",
          marginBottom: wp(3),
          marginTop: wp(3),
          justifyContent: "space-between",
          marginHorizontal: wp(6),
          // backgroundColor: "red",
        }}
      >
        <View
          style={{
            ...styles.iconCon,
            // ...{ backgroundColor: "red" }
          }}
        >
          <Icon1 />
          <ResponsiveText style={{ fontSize: 3.2, marginTop: wp(1) }}>
            Property
          </ResponsiveText>
        </View>
        <TouchableOpacity
          style={{
            ...styles.iconCon,
            // ...{ backgroundColor: "yellow" }
          }}
        >
          <Icon2 />
          <ResponsiveText style={{ fontSize: 3.2, marginTop: wp(1) }}>
            I own
          </ResponsiveText>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.iconCon,
            // ...{ backgroundColor: "red" }
          }}
        >
          {/* <Icon3 width={wp(10)} height={wp(11)} /> */}
          <Image
            style={{ width: wp(10), height: wp(11), resizeMode: "contain" }}
            source={require("@src/assets/images/gurante.png")}
          />
          <ResponsiveText style={{ fontSize: 3.2, marginTop: wp(1) }}>
            Guarantee
          </ResponsiveText>
        </TouchableOpacity>
      </View>
      <View style={{ marginHorizontal: wp(5) }}>
        <View
          style={{ backgroundColor: "#ECECEC", height: 1, marginBottom: wp(5) }}
        />
        {buybackData.map((item) => {
          return (
            <Pressable
              key={item.propertyName}
              onPress={() => {
                props.navigation.navigate("PropertyBuyBack", {
                  id: item.propertyId,
                });
              }}
              style={{
                borderWidth: 1,
                borderColor: "#FAAD39",
                // marginHorizontal: wp(0.5),
                paddingVertical: wp(4),
                paddingHorizontal: wp(4),
                borderRadius: wp(2),
                marginBottom: wp(3),
                // height: 85,
                justifyContent: "center",
                alignItems: "center",
                // marginHorizontal: wp(4),

                // flexDirection: "row",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  style={{
                    width: wp(12.8),
                    height: wp(12.8),
                    resizeMode: "contain",
                  }}
                  source={{ uri: item?.iconUrl }}
                />
                <View style={{ flex: 1, marginLeft: wp(3.5) }}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <ResponsiveText
                        // numberOfLines={1}
                        style={{
                          fontSize: 2.93,
                          fontFamily: Fonts.ManropeBold,
                          color: "#757575",
                          // maxWidth: wp(21),
                        }}
                      >
                        {item.propertyName}
                      </ResponsiveText>
                      <ResponsiveText
                        style={{
                          fontSize: 0.8,
                          color: "#757575",
                          marginTop: wp(1),
                        }}
                      >
                        {"      "}
                        {"\u2B24"}
                        {"      "}
                      </ResponsiveText>

                      <ResponsiveText
                        numberOfLines={1}
                        style={{
                          fontSize: 2.93,
                          color: "#757575",
                          maxWidth: wp(50),
                          textAlign: "left",
                        }}
                      >
                        {propertyAdressCheck(item.propertyName, item.address)}
                        {/* {item.address.length > 30
                          ? item.address.slice(0, 25) + ".."
                          : item.address} */}
                      </ResponsiveText>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      marginTop: wp(1),
                      // backgroundColor: 'red'
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        width: wp(35),
                        justifyContent: "center",
                      }}
                    >
                      <ResponsiveText
                        style={{ fontSize: 4, fontFamily: Fonts.ManropeBold }}
                      >
                        {valueConverstion(item?.ownedUnits ?? 0)}{" "}
                      </ResponsiveText>
                      <ResponsiveText style={{ fontSize: 4 }}>
                        {item.smallerUnit}
                      </ResponsiveText>
                    </View>

                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <ProgressCircle
                        outerCircleStyle={{}}
                        containerStyle={{}}
                        percent={circleProgressHours(
                          item.purchasedDate as unknown as Date,
                          item.expiryDate
                        )}
                        radius={wp(3.5)}
                        borderWidth={3.7}
                        color={handelColor(
                          circleProgressHours(
                            item.purchasedDate as unknown as Date,
                            item.expiryDate
                          )
                        )}
                        shadowColor="#ECECEC"
                        bgColor="white"
                      ></ProgressCircle>
                      <View style={{ marginLeft: wp(2) }}>
                        <ResponsiveText
                          style={{
                            fontSize: 3.5,
                            color: handelColor(
                              circleProgressHours(new Date(), item.expiryDate)
                            ),
                            fontFamily: Fonts.ManropeBold,
                          }}
                        >
                          {moment(item?.expiryDate).diff(moment(), "minutes") >
                          0
                            ? calculateTimeStamp(
                                Date.now() ?? undefined,
                                moment(item?.expiryDate, "YYYY-MM-DD HH:mm:ss")
                              )
                            : "0 mins"}
                        </ResponsiveText>
                        <ResponsiveText
                          style={{ fontSize: 2.67, color: "#BCBCBC" }}
                        >
                          Remaining
                        </ResponsiveText>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </Pressable>
          );
        })}
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  iconCon: {
    // flex: 1,
    // backgroundColor: "red",
    alignItems: "center",
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
export default MalkiyatBuyBack;
