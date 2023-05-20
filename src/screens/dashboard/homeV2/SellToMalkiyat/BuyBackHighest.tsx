import { View, TextInput, TouchableOpacity } from "react-native";
import React, { ReactNode, useEffect, useMemo, useState } from "react";
import {
  ParamListBase,
  RouteProp,
  NavigationProp,
} from "@react-navigation/native";
import _ from "lodash";
import AnimatedNumbers from "react-native-animated-numbers";
import { useSelector } from "react-redux";

import Container from "@src/components/common/Container";
import HomeHeader from "@src/components/ui/HomeHeader/HomeHeader";
import SellIcon from "@src/assets/images/sell_icon.svg";
import ResponsiveText from "@src/components/common/ResponseiveText";
import Fonts from "@src/theme/fonts";
import { wp } from "@src/components/common/Responsive";
import Content from "@src/components/common/Content";
import { BuyBackPropertyListI } from "@src/services/model";
import MRegisterUserApiService from "@src/services/MRegisterUserApiService";
import { RootState } from "@src/redux/reducers";
import {
  CHECK_DEBUGGER_STATE,
  valueConverstion,
  valueWithCommas,
} from "@src/utils/helperFunction";
import CalculationModal from "@src/components/AdvertiseModal/CalculationModal";
interface Props {
  navigation: NavigationProp<ParamListBase>;
  route: RouteProp<ParamListBase>;
}
const BuyBackHighest = (props: Props) => {
  const item = props.route!.params! as BuyBackPropertyListI;

  const [subPropertyList, setSubPropertyList] = useState<
    { subPropertyId: number; purchasedPrice: number }[]
  >([]);
  const registerUserReducer = useSelector(
    (state: RootState) => state.registerUser.registerUserData
  );
  const [modalObj, setModalObj] = useState<{
    modalVisible: boolean;
    unitsToSearch: string;
    text: ReactNode;
    totalPrice: number;
  }>({
    modalVisible: false,
    unitsToSearch: "",
    text: undefined,
    totalPrice: 0,
  });

  useEffect(() => {
    (async function () {
      const res = await MRegisterUserApiService.buyBackUnitst(
        registerUserReducer?.userInfo?.userId,
        item.propertyId,
        item.expiryDate
      );

      setSubPropertyList(res.data.data);
    })();
  }, []);
  useEffect(() => {
    if (Number(modalObj.unitsToSearch) > _.size(subPropertyList)) {
      setModalObj(() => ({
        modalVisible: true,
        unitsToSearch: String(_.size(modalObj.unitsToSearch)),
        totalPrice: 0,
        text: (
          <View>
            <ResponsiveText
              style={{
                textAlign: "center",
                fontSize: 4,
                fontFamily: Fonts.ManropeBold,
                marginTop: wp(4),
              }}
            >
              Only {valueWithCommas(_.size(subPropertyList))} units are
              available.
            </ResponsiveText>
            <ResponsiveText style={{ textAlign: "center" }}>
              {/* {res?.data?.data?.message} */}
            </ResponsiveText>
          </View>
        ),
      }));
    } else {
      if (Number(modalObj.unitsToSearch) > 0) {
        setModalObj((prev) => ({
          ...prev,
          totalPrice: subPropertyList
            .slice(0, Number(prev.unitsToSearch))
            .reduce((acc, dem) => acc + dem.purchasedPrice, 0),
        }));
      } else if (!modalObj.unitsToSearch && modalObj.totalPrice) {
        setModalObj((prev) => ({
          ...prev,
          totalPrice: 0,
        }));
      }
    }
  }, [modalObj.unitsToSearch]);
  console.log(modalObj);

  return (
    <Container>
      <HomeHeader
        label={""}
        icon={undefined}
        back
        backgroundColor={"white"}
        show={true}
        {...props}
        title={"Buyback Sqft"}
      />
      <Content>
        <View style={{ alignItems: "center" }}>
          <SellIcon />
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: wp(4),
            marginTop: wp(10),
            marginBottom: wp(3),
          }}
        >
          <View>
            <ResponsiveText
              style={{
                color: "#8A8A8E",
                fontSize: 3.2,
                marginTop: wp(0.5),
              }}
            >
              Malkiyat buyback up to {item.ownedUnits} Sqft
            </ResponsiveText>
          </View>

          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("BuyBackDetail", {
                list: subPropertyList,
                item: item,
              });
            }}
            // disabled={loader ? true : false}
            // onPress={() => {
            //     props.navigation.navigate("SellDetails", {
            //         bidData: bidDataState,
            //         newSqfts: newSqfts,
            //     });
            // }}
          >
            <ResponsiveText
              style={{
                color: "#3577DB",
                fontSize: 3.2,
                fontFamily: Fonts.ManropeSemiBold,
              }}
            >
              Details
            </ResponsiveText>
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: "center" }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-end",
              // marginTop: -wp(10),
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
                valueConverstion(
                  _.size(subPropertyList) > 0
                    ? subPropertyList[0].purchasedPrice
                    : 0
                )}
            </ResponsiveText>
            {!CHECK_DEBUGGER_STATE() && (
              <AnimatedNumbers
                includeComma
                animateToNumber={Number(
                  _.size(subPropertyList) > 0
                    ? subPropertyList[0].purchasedPrice
                    : 0
                )}
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
            style={{ width: wp(70), height: wp(10) }}
            editable={_.size(subPropertyList) > 0 ? true : false}
            onChangeText={(text) => {
              text = text.replace(/[^0-9]/g, "");
              setModalObj((prev) => ({
                ...prev,
                unitsToSearch: Number(text) > 0 ? text : "",
              }));
            }}
            defaultValue={""}
            keyboardType="numeric"
            placeholder="Enter Sqft"
            value={modalObj.unitsToSearch}
          />
        </View>
        <View style={{ paddingHorizontal: wp(4), marginVertical: wp(4) }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <ResponsiveText
              style={{
                fontSize: 3.73,
                fontFamily: Fonts.ManropeSemiBold,
              }}
            >
              Total: Rs.{" "}
              {CHECK_DEBUGGER_STATE() &&
                valueConverstion(modalObj.totalPrice ?? 0)}
            </ResponsiveText>
            {!CHECK_DEBUGGER_STATE() && (
              <AnimatedNumbers
                includeComma
                animateToNumber={Number(modalObj.totalPrice ?? 0)}
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
          onPress={() => {
            props.navigation.navigate("MalkiyatReview", {
              item: item,
              modalObj: modalObj,
              list: subPropertyList,
            });
          }}
          // onPress={handleClick}
          disabled={
            _.size(subPropertyList) > 0 && Number(modalObj.unitsToSearch) > 0
              ? false
              : true
          }
          style={{
            height: wp(14.93),
            borderRadius: wp(10),
            backgroundColor:
              _.size(subPropertyList) > 0 && Number(modalObj.unitsToSearch) > 0
                ? "#2BACE3"
                : "#dedede",
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
          {/* {!loader && <Arrow />} */}
        </TouchableOpacity>
      </View>
      <CalculationModal
        modalVisible={modalObj.modalVisible}
        setModalVisible={() =>
          setModalObj((prev) => ({
            ...prev,
            modalVisible: !modalObj.modalVisible,
          }))
        }
        text={modalObj.text}
        onPress={() => {
          setModalObj((prev) => ({
            ...prev,
            modalVisible: !modalObj.modalVisible,
          }));
        }}
      />
    </Container>
  );
};

export default BuyBackHighest;
