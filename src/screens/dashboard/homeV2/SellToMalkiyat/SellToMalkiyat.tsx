import {
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Image,
} from "react-native";
import React, { useMemo, useRef, useState } from "react";
import {
  ParamListBase,
  RouteProp,
  NavigationProp,
} from "@react-navigation/native";
import AnimatedNumbers from "react-native-animated-numbers";
import _ from "lodash";

import Container from "@src/components/common/Container";
import HomeHeader from "@src/components/ui/HomeHeader/HomeHeader";
import ResponsiveText from "@src/components/common/ResponseiveText";
import Fonts from "@src/theme/fonts";
import { wp } from "@src/components/common/Responsive";
import Arrow from "@src/assets/images/left_arrow.svg";
import Content from "@src/components/common/Content";

import {
  CHECK_DEBUGGER_STATE,
  valueConverstion,
} from "@src/utils/helperFunction";
import { errorModal } from "@src/redux/action-creators";
import { useSafeDispatch } from "@src/hooks/useSafeDispatch";

interface Props {
  navigation: NavigationProp<ParamListBase>;
  route: RouteProp<ParamListBase>;
}
const SellToMalkiyat = (props: Props) => {
  const { item, priceDetails } = props.route!.params! as any;

  const [newSqfts, setNewSqfts] = useState<number | string>("");
  const [continueBtn, setContinueBtn] = useState<boolean>(false);

  const dispatch = useSafeDispatch();

  const memoizedTotal = useMemo(() => {
    return calculateTotalProfit(
      Number(newSqfts),
      item.params.plotsPurchasePriceList
    );
  }, [newSqfts, setNewSqfts]);

  const handleSqfts = (args: string) => {
    args = args.replace(/[^0-9]/g, "");
    if (Number(args) > Number(priceDetails?.unitsForSale)) {
      dispatch(
        errorModal(
          `You have only ${priceDetails?.unitsForSale} sqft to sell!`,
          true,
          "Error"
        )
      );
      // Alert.alert(`You have only ${priceDetails?.unitsForSale} sqft to sell!`);
      setNewSqfts(priceDetails?.unitsForSale!);
    } else {
      if (Number(item?.params?.buyBackCount) < Number(args)) {
        dispatch(
          errorModal(
            `You can only sell ${item?.params?.buyBackCount} to malkiyat.`,
            true,
            "Error"
          )
        );
        setNewSqfts(item?.params?.buyBackCount);

        // Alert.alert(
        //   `You can only sell ${item?.params?.buyBackCount} to malkiyat.`
        // );
      } else setNewSqfts(Number(args));
    }
  };

  const handleClick = async () => {
    props.navigation.navigate("MalkiyatReview", {
      ...item?.params,
      ...priceDetails,
      newSqfts: newSqfts,
      type: "Seller",
    });
  };
  return (
    <Container>
      <HomeHeader
        label={""}
        icon={undefined}
        back
        backgroundColor={"white"}
        show={true}
        {...props}
        title={"Sell to Malkiyat"}
      />
      <Content>
        <View
          style={{
            borderWidth: 1,
            borderColor: "#FAAD39",
            // marginHorizontal: wp(0.5),
            // paddingVertical: wp(5),
            paddingHorizontal: wp(4),
            borderRadius: wp(2),
            marginBottom: wp(3),
            height: 85,
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: wp(4),
            marginTop: wp(8),
            // flexDirection: "row",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Image
              style={{
                width: wp(12.8),
                height: wp(12.8),
                resizeMode: "contain",
              }}
              source={{ uri: item?.params?.logoUrl! }}
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
                    numberOfLines={1}
                    style={{
                      fontSize: 2.93,
                      fontFamily: Fonts.ManropeBold,
                      color: "#757575",
                      maxWidth: wp(21),
                    }}
                  >
                    {item?.params?.propertyName ?? ""}
                  </ResponsiveText>
                  <ResponsiveText
                    numberOfLines={1}
                    style={{
                      fontSize: 2.93,
                      color: "#757575",
                      maxWidth: wp(50),
                    }}
                  >
                    {"  "}
                    {item?.params?.propertyAddress}
                    {/* {props?.propertyAddress?.slice(0, 22) + "..."} */}
                  </ResponsiveText>
                </View>

                {/* <ResponsiveText style={styles.percen}>
                            {parseFloat(String(props?.profitPercentage! ?? 0.0)).toFixed(1)}%
                        </ResponsiveText> */}
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  marginTop: wp(3),
                }}
              >
                <View style={{ flexDirection: "row", width: wp(21) }}>
                  <ResponsiveText
                    style={{ fontSize: 4.8, fontFamily: Fonts.ManropeBold }}
                  >
                    {valueConverstion(item?.params?.ownedSmallerUnits ?? 0)}{" "}
                  </ResponsiveText>
                  <ResponsiveText>{"sqt"}</ResponsiveText>
                </View>

                <ResponsiveText
                  style={{
                    fontSize: 4.8,
                    fontFamily: Fonts.ManropeBold,
                    width: wp(21),
                  }}
                >
                  {valueConverstion(item?.params?.purchasePrice ?? 0)}
                </ResponsiveText>
                <ResponsiveText
                  style={{
                    width: wp(21),
                    fontSize: 4.8,
                    fontFamily: Fonts.ManropeBold,
                    textAlign: "right",
                  }}
                >
                  {valueConverstion(item?.params?.profitPerProperty ?? 0)}
                </ResponsiveText>
              </View>
            </View>
          </View>
        </View>
        <View style={{ alignItems: "center" }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-end",
              marginTop: wp(15),
            }}
          >
            <ResponsiveText
              style={{
                fontSize: 4,
                fontFamily: Fonts.ManropeSemiBold,
                color: "#8A8A8E",
                marginBottom: wp(1.5),
              }}
            >
              Rs.{" "}
            </ResponsiveText>
            <ResponsiveText
              style={{
                fontSize: 8.53,
                fontFamily: Fonts.ManropeSemiBold,
                color: "#2BACE3",
              }}
            >
              {CHECK_DEBUGGER_STATE() &&
                valueConverstion(priceDetails?.fairPrice ?? 0)}
            </ResponsiveText>
            {!CHECK_DEBUGGER_STATE() && (
              <AnimatedNumbers
                includeComma
                animateToNumber={Number(priceDetails?.fairPrice ?? 0)}
                fontStyle={{
                  fontSize: 32,
                  fontFamily: Fonts.ManropeBold,
                  color: "#2BACE3",
                }}
              />
            )}
            <ResponsiveText
              style={{
                fontSize: 4,
                fontFamily: Fonts.ManropeSemiBold,
                color: "#8A8A8E",
                marginBottom: wp(1.5),
              }}
            >
              {" "}
              per Sqft
            </ResponsiveText>
          </View>
        </View>
        <View
          style={{
            borderColor: "#3577DB",
            borderWidth: 2,
            paddingHorizontal: wp(4),
            marginHorizontal: wp(4),
            borderRadius: wp(1),
            // paddingVertical: wp(4),
            height: wp(14),
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: wp(10),
            // backgroundColor: "red",
          }}
        >
          <ResponsiveText
            style={{
              fontSize: 3.2,
              fontFamily: Fonts.ManropeBold,
              color: "#3577DB",
              position: "absolute",
              top: -10,
              left: 10,
              paddingHorizontal: 5,
              backgroundColor: "white",
            }}
          >
            I want to sell
          </ResponsiveText>
          <TextInput
            value={newSqfts.toString()}
            style={{ width: wp(70), height: wp(10) }}
            // editable={bidData?.ownedSmallerUnits! > 0 ? true : false}
            onChangeText={handleSqfts}
            defaultValue={""}
            keyboardType="numeric"
            placeholder="Enter Sqft"
          />
        </View>
        <View style={{ paddingHorizontal: wp(4) }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: wp(5),
            }}
          >
            <ResponsiveText
              style={{
                fontSize: 3.73,
                fontFamily: Fonts.ManropeSemiBold,
              }}
            >
              Total: Rs.{" "}
              {CHECK_DEBUGGER_STATE() && valueConverstion(memoizedTotal ?? 0)}
            </ResponsiveText>
            {!CHECK_DEBUGGER_STATE() && (
              <AnimatedNumbers
                includeComma
                animateToNumber={
                  (priceDetails?.fairPrice ?? 0) * Number(newSqfts) ?? 0
                }
                fontStyle={{
                  fontSize: 14,
                  fontFamily: Fonts.ManropeBold,
                  color: "black",
                  paddingBottom: 1,
                }}
              />
            )}
          </View>
        </View>
      </Content>
      <View
        style={{
          paddingHorizontal: wp(4),
          paddingVertical: wp(4),
          borderTopColor: "#EEEEEE",
          borderTopWidth: 1,
        }}
      >
        <TouchableOpacity
          onPress={handleClick}
          disabled={continueBtn ? true : !Number(newSqfts) ? true : false}
          style={{
            height: wp(14.93),
            borderRadius: wp(10),
            backgroundColor: continueBtn
              ? "#dedede"
              : !Number(newSqfts)
              ? "#dedede"
              : "#2BACE3",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <ResponsiveText
            style={{
              color: "white",
              fontFamily: Fonts.ManropeBold,
              fontSize: 4.53,
              marginRight: wp(3),
            }}
          >
            Continue
          </ResponsiveText>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

export default SellToMalkiyat;

function calculateTotalProfit(units: number, list: number[]) {
  let total: number = 0;
  for (let i = 0; i < units; i++) {
    total += list[i];
  }
  return total;
}
