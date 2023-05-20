import { TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";

import Build1 from "@src/assets/images/build1.svg";
import Build2 from "@src/assets/images/build2.svg";
import Build3 from "@src/assets/images/build3.svg";
import { wp } from "../common/Responsive";
import ResponsiveText from "../common/ResponseiveText";
import Fonts from "@src/theme/fonts";
import WalletIcon from "@src/assets/images/wallet_icon.svg";
import { valueConverstion, valueWithCommas } from "@src/utils/helperFunction";
import { RootState } from "@src/redux/reducers";
import RegisterModal from "../AdvertiseModal/RegisterModal";

const WalletCard = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [value, setValue] = useState(false);
  // memoized state to avoid
  const getState = () => (state: RootState) => state;
  const memoizedState = createSelector(
    getState(),
    (data) => data.registerUser.registerUserData
  );
  const registerUserData = useSelector(memoizedState);

  return (
    <View
      style={{
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
        borderRadius: wp(3),
        paddingHorizontal: wp(2),
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          // justifyContent: "space-between",
          paddingTop: wp(4),
        }}
      >
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("MySqFt");
          }}
          style={{ alignItems: "center", width: wp(29) }}
        >
          <Build1 />
          <ResponsiveText
            style={{ fontSize: 4.27, marginTop: wp(2), marginBottom: wp(1) }}
          >
            I own
          </ResponsiveText>
          <View style={{ flexDirection: "row" }}>
            <ResponsiveText
              style={{ fontSize: 4.5, fontFamily: Fonts.ManropeBold }}
            >
              {valueWithCommas(
                Number(
                  registerUserData?.propertiesData?.data?.ownedSmallerUnits ?? 0
                )
              )}{" "}
            </ResponsiveText>
            <ResponsiveText
              style={{
                fontSize: 3.2,
                alignSelf: "flex-end",
                marginBottom: wp(0.5),
              }}
            >
              Sqft
            </ResponsiveText>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
            setValue(false);
          }}
          style={{ alignItems: "center", width: wp(30) }}
        >
          <Build2 />

          <ResponsiveText
            style={{ fontSize: 4.27, marginTop: wp(2), marginBottom: wp(1) }}
          >
            Profit
          </ResponsiveText>
          <View style={{ flexDirection: "row" }}>
            <ResponsiveText
              style={{
                fontSize: 3.8,
                alignSelf: "flex-end",
                marginBottom: wp(0.5),
              }}
            >
              Rs.{" "}
            </ResponsiveText>
            <ResponsiveText
              style={{ fontSize: 4.5, fontFamily: Fonts.ManropeBold }}
            >
              {valueConverstion(
                Number(registerUserData?.propertiesData?.data?.profit ?? 0)
              )}
            </ResponsiveText>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
            setValue(true);
          }}
          style={{ alignItems: "center", width: wp(29) }}
        >
          <Build3 />
          <ResponsiveText
            style={{ fontSize: 4.27, marginTop: wp(2), marginBottom: wp(1) }}
          >
            Value
          </ResponsiveText>
          <View style={{ flexDirection: "row" }}>
            <ResponsiveText
              style={{
                fontSize: 3.8,
                alignSelf: "flex-end",
                marginBottom: wp(0.5),
              }}
            >
              Rs.{" "}
            </ResponsiveText>
            <ResponsiveText
              style={{ fontSize: 4.5, fontFamily: Fonts.ManropeBold }}
            >
              {valueConverstion(
                Number(
                  registerUserData?.propertiesData?.data?.currentValue ?? 0
                )
              )}
            </ResponsiveText>
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{ backgroundColor: "#ECECEC", height: 1, marginVertical: wp(3) }}
      />
      <TouchableOpacity
        onPress={() => props.navigation.push("Wallet")}
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: wp(3),
        }}
      >
        <WalletIcon />
        <ResponsiveText
          style={{ fontSize: 3.73, color: "#9E9E9E", marginHorizontal: wp(2) }}
        >
          Wallet
        </ResponsiveText>
        <View style={{ flexDirection: "row" }}>
          <ResponsiveText
            style={{
              fontSize: 3.3,
              alignSelf: "flex-end",
              marginBottom: wp(0.5),
            }}
          >
            Rs.{" "}
          </ResponsiveText>
          <ResponsiveText
            style={{ fontSize: 3.73, fontFamily: Fonts.ManropeBold }}
          >
            {valueWithCommas(
              Math.floor(
                Number(
                  registerUserData?.propertiesData?.data?.balance
                    ?.walletBalance ?? 0
                )
              )
            )}
          </ResponsiveText>
        </View>
      </TouchableOpacity>
      <RegisterModal
        value={value}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </View>
  );
};

export default WalletCard;
