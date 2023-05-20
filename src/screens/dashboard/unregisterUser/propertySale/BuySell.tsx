import { View, TouchableOpacity, Alert, StyleSheet } from "react-native";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import _ from "lodash";

import ResponsiveText from "@src/components/common/ResponseiveText";
import { wp } from "@src/components/common/Responsive";
import PropertyCalculation from "@src/components/home/PropertyCalculation";
import Fonts from "@src/theme/fonts";
import BuySellModal from "./BuySellModal";
import { PropertyDetailI, TransactionInterface } from "@src/services/model";
import { RootState } from "@src/redux/reducers";
import MRegisterUserApiService from "@src/services/MRegisterUserApiService";
import { valueWithCommas } from "@src/utils/helperFunction";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSafeDispatch } from "@src/hooks/useSafeDispatch";
const { updateBalanceAfterTransaction } = MRegisterUserApiService;

interface Props {
  selectedTileData: PropertyDetailI | undefined;
  dis?: boolean;
}

type PropertyType = "buy" | "sell";

const BuySell = (props: Props) => {
  const navigation = useNavigation();
  const [propertyType, setPropertyType] = useState<PropertyType>("sell");
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<string | undefined>(
    undefined
  );
  const [actualSqft, setActualSqft] = React.useState<string | undefined>(
    undefined
  );
  const registerReducer = useSelector((state: RootState) => state.registerUser);
  const dispatch = useSafeDispatch();
  const balance =
    registerReducer.registerUserData?.propertiesData?.balance?.walletBalance ??
    undefined;
  async function performTransaction(): Promise<void> {
    var totalAmount =
      Number(actualSqft) * Number(props.selectedTileData!?.perSmallerUnitPrice);

    if (
      Number(
        registerReducer.registerUserData?.propertiesData?.balance?.walletBalance
      ) < totalAmount! ||
      _.isNaN(
        registerReducer.registerUserData?.propertiesData?.balance?.walletBalance
      )
    ) {
      Alert.alert("Your amount is insufficent to perform this transaction!");
    } else {
      const transactionObj: TransactionInterface = {
        transactionFrom: Number(
          registerReducer.registerUserData?.userInfo?.userId ?? 0
        ),
        transactionTo: 2,
        purchaseAmount: totalAmount,
        purchaseUnits: Number(actualSqft),
        propertyId: Number(props.selectedTileData?.propertyId),
        paymentMethodId: 0,
        proofOfPurchaseId: 0,
        proofOfDeliveryId: 0,
        buyFromMalkiyat: false,
        orderRef: 0,
        onlyCashIn: "false",
      };
      setLoading(true);
      try {
        const res = await MRegisterUserApiService.transactionApi(
          transactionObj
        );
        setLoading(false);
        setModalVisible(false);
        if (res.data.status == 200) {
          setActualSqft(undefined);

          try {
            const res: any = dispatch(
              updateBalanceAfterTransaction(
                registerReducer.registerUserData?.userInfo?.userId,
                navigation
              )
            );
            if (res) {
              setLoading(false);
            }
          } catch (error) {
            setLoading(false);
          }
        } else {
          console.warn(res.data.message);
        }
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
    }
  }
  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="always"
      automaticallyAdjustContentInsets={true}
    >
      <View
        pointerEvents={props.dis ? "none" : "auto"}
        style={styles.container}
      >
        <View style={styles.content}>
          <TouchableOpacity
            onPress={() => setPropertyType("buy")}
            style={{
              ...styles.btn,
              backgroundColor: propertyType == "buy" ? "#3578DB" : "#F4F4F4",
            }}
          >
            <ResponsiveText
              style={{ color: propertyType == "buy" ? "white" : "#3B4161" }}
            >
              I want to Buy
            </ResponsiveText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setPropertyType("sell")}
            style={{
              ...styles.btn,
              backgroundColor: propertyType == "sell" ? "#3578DB" : "#F4F4F4",
            }}
          >
            <ResponsiveText
              style={{ color: propertyType == "sell" ? "white" : "#3B4161" }}
            >
              I want to Sell
            </ResponsiveText>
          </TouchableOpacity>
        </View>
        {propertyType == "buy" ? (
          <>
            <View style={{ alignItems: "center", paddingTop: wp(3) }}>
              <ResponsiveText style={{ fontSize: 5, marginBottom: wp(4) }}>
                Live Price
              </ResponsiveText>

              <ResponsiveText style={{ fontSize: 5, paddingTop: wp(3) }}>
                Rs.{" "}
                <ResponsiveText
                  style={{ fontSize: 8, fontFamily: Fonts.ManropeBold }}
                >
                  {valueWithCommas(props.selectedTileData?.perSmallerUnitPrice)}
                </ResponsiveText>
              </ResponsiveText>
            </View>
            <View
              style={{
                marginTop: wp(4),
                marginBottom: wp(5),
              }}
            >
              <PropertyCalculation
                propertyType={propertyType}
                selectedTileData={props?.selectedTileData ?? undefined}
                selectedPopertyCal={(sqft) => {
                  setActualSqft(sqft);
                }}
              />
            </View>
          </>
        ) : (
          <>
            <View style={{ alignItems: "center", paddingTop: wp(3) }}>
              <ResponsiveText style={{ fontSize: 5, marginBottom: wp(4) }}>
                Current Price
              </ResponsiveText>

              <ResponsiveText style={{ fontSize: 5, paddingTop: wp(3) }}>
                Rs.{" "}
                <ResponsiveText
                  style={{ fontSize: 8, fontFamily: Fonts.ManropeBold }}
                >
                  {valueWithCommas(props.selectedTileData?.perSmallerUnitPrice)}
                </ResponsiveText>
              </ResponsiveText>
            </View>
            <View
              style={{
                marginTop: wp(4),
                marginBottom: wp(5),
              }}
            >
              <PropertyCalculation
                selectedTileData={props?.selectedTileData ?? undefined}
                selectedPopertyCal={(sqft) => {
                  setActualSqft(sqft);
                }}
              />
            </View>
          </>
        )}

        <TouchableOpacity
          style={{
            backgroundColor:
              !_.isUndefined(balance) &&
                !_.isNull(balance) &&
                Number(balance) > 0 &&
                Number(actualSqft) > 0 &&
                propertyType != "sell"
                ? "#3578DB"
                : "grey",
            height: wp(12),
            borderRadius: wp(10),
            alignItems: "center",
            justifyContent: "center",
          }}
          disabled={
            !_.isUndefined(balance) &&
              !_.isNull(balance) &&
              Number(balance) > 0 &&
              Number(actualSqft) > 0 &&
              propertyType != "sell"
              ? false
              : true
          }
          onPress={() => {
            if (propertyType == "sell") {
              Alert.alert("Coming Soon!");
            } else {
              if (
                Number(actualSqft) >
                Number(props.selectedTileData?.smallerUnitArea)
              ) {
                Alert.alert(
                  `Available Units are only ${props.selectedTileData?.smallerUnitArea}`
                );
              } else {
                setModalVisible(true);
                setModalContent(
                  `You will get ${actualSqft} sqft(s) in rupees ${String(
                    Number(actualSqft) *
                    Number(props.selectedTileData!?.perSmallerUnitPrice)
                  )} `
                );
              }
            }
          }}
        >
          <ResponsiveText
            style={{ color: "white", fontFamily: Fonts.ManropeBold }}
          >
            {propertyType == "buy" ? " BUY NOW" : "SELL NOW"}
          </ResponsiveText>
        </TouchableOpacity>
        <ResponsiveText
          style={{ marginTop: wp(3), fontSize: 3.3, textAlign: "center" }}
        >
          For 30 days , Malkiyat will buy back your sqft
        </ResponsiveText>
        {/* <BuySellModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        modalContent={modalContent!}
        selectedTileData={props.selectedTileData}
        confirmPayment={() => performTransaction()}
        loading={loading}
      /> */}
        <BuySellModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          modalContent={`You will get ${actualSqft} sqft(s) in rupees ${String(
            Number(actualSqft) *
            Number(props.selectedTileData!?.perSmallerUnitPrice)
          )} `}
          sqFt={actualSqft!}
          unitPrice={props.selectedTileData!?.perSmallerUnitPrice}
          confirmPayment={() => performTransaction()}
          loading={loading}
          propertyName={props.selectedTileData?.propertyName!}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    borderRadius: wp(3),
    paddingVertical: wp(3),
    paddingHorizontal: wp(5),
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#F4F4F4",
    padding: wp(1),
    borderRadius: wp(2),
  },
  btn: {
    width: wp(40),
    padding: wp(1.5),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: wp(2),
  },
});
export default BuySell;
