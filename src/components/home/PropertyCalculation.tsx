import React, { useState } from "react";
import {
  View,
  TextInput,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { useTheme } from "@react-navigation/native";
import { SimpleAnimation } from "react-native-simple-animations";
import _ from "lodash";

import ResponsiveText from "../common/ResponseiveText";
import { wp } from "../common/Responsive";
import Tooltip from "../common/Tooltip";
import { valueWithCommas } from "@src/utils/helperFunction";
import { RegisterUserType } from "@src/redux/action-types";
import { RootState } from "@src/redux/reducers";
import { useSafeDispatch } from "@src/hooks/useSafeDispatch";
interface ProperityCalI {
  selectedPopertyCal: (sqft: string) => void;
  propertyType: string;
  edit: boolean;
  border: boolean;
  fon: boolean;
}

const ProperityCalculation = (props: Partial<ProperityCalI>) => {
  const selectedTileData = useSelector(
    (state: RootState) => state.registerUser.selectedTileData
  );
  const navigation = useNavigation();
  const dispatch = useSafeDispatch();
  const { colors } = useTheme();
  const [pCal, setPCal] = React.useState<{
    amount: string | undefined;
    sqft: string | undefined;
  }>({
    amount: undefined,
    sqft: undefined,
  });

  const [visible, setVisible] = useState<boolean>(false);
  const [tooltipVisible, setTooltipVisible] = React.useState<boolean>(false);
  const routes = navigation.getState()?.routes;
  React.useEffect(() => {
    //! user cannot enter 0 units
    if (selectedTileData?.units == 0) {
      setPCal({
        amount: undefined,
        sqft: undefined,
      });
      dispatch({
        type: RegisterUserType.SAVE_UNITS,
        payload: 0,
      });
      return;
    }
    // (DECIMAL UNITS) show intimation if rounDed unints and actual units are not equal

    if (selectedTileData?.units != Math.round(selectedTileData?.units!)) {
      setVisible(true);
    } else {
      visible && setVisible(false);
    }

    if (
      // ? if value is in amount then find units and units cannot be greater then remaining units of property

      !_.isUndefined(selectedTileData?.units) &&
      selectedTileData!?.units > 0
    ) {
      const giveUnits =
        Math.floor(Number(selectedTileData?.soldPercentage)) == 100
          ? Number(selectedTileData?.units)
          : Number(Math.floor(Number(selectedTileData?.units))) >
            Number(selectedTileData?.smallerUnitArea) -
              Number(selectedTileData?.soldSmallUnits)
          ? Number(selectedTileData?.smallerUnitArea) -
            Number(selectedTileData?.soldSmallUnits)
          : Number(selectedTileData?.units);
      setPCal({
        amount: String(
          Math.round(giveUnits * selectedTileData?.perSmallerUnitPrice)
        ),

        sqft: String(Math.floor(giveUnits)) ?? undefined,
      });
    }
  }, [selectedTileData?.units!, selectedTileData?.perSmallerUnitPrice, routes]);

  function handleChange(value: string, name: "sqft" | "amount"): void {
    var unitPrice = selectedTileData?.perSmallerUnitPrice;
    if (!value) {
      setPCal({
        amount: undefined,
        sqft: undefined,
      });
      dispatch({
        type: RegisterUserType.SAVE_UNITS,
        payload: 0,
      });
      return;
    }
    //* if we have less then 1 and value is in point then consider it Zero value
    if (
      name == "sqft" &&
      value.includes(".") &&
      Math.floor(Number(value)) == 0
    ) {
      setPCal({
        amount: undefined,
        sqft: undefined,
      });
      dispatch({
        type: RegisterUserType.SAVE_UNITS,
        payload: 0,
      });
    } else {
      value = value.replace(/[^0-9]/g, "");

      if (name == "sqft") {
        //* UNITS cannot be greater then remaining units
        const givenUnits =
          Math.floor(Number(selectedTileData?.soldPercentage)) == 100
            ? Number(Math.floor(Number(value)))
            : Number(Math.floor(Number(value))) >
              Number(selectedTileData?.smallerUnitArea) -
                Number(selectedTileData?.soldSmallUnits)
            ? Number(selectedTileData?.smallerUnitArea) -
              Number(selectedTileData?.soldSmallUnits)
            : Number(Math.floor(Number(value)));
        setPCal({
          amount: String(Number(givenUnits) * Number(unitPrice)),
          sqft: String(givenUnits),
        });
        dispatch({
          type: RegisterUserType.SAVE_UNITS,
          payload: givenUnits,
        });
        visible && setVisible(false);
        props!?.selectedPopertyCal &&
          props?.selectedPopertyCal(String(givenUnits));
      } else {
        // ? if value is in amount then find units and units cannot be greater then remaining units of property
        let actualUnits = Number(Number(value) / Number(unitPrice));

        const givenUnits =
          Math.floor(Number(selectedTileData?.soldPercentage)) == 100
            ? actualUnits
            : Number(Math.floor(Number(actualUnits))) > //! TODO FIX
              Number(selectedTileData?.smallerUnitArea) -
                Number(selectedTileData?.soldSmallUnits)
            ? Number(selectedTileData?.smallerUnitArea) -
              Number(selectedTileData?.soldSmallUnits)
            : actualUnits;
        dispatch({
          type: RegisterUserType.SAVE_UNITS,
          payload: givenUnits,
        });
        if (actualUnits != Math.round(actualUnits)) {
          setVisible(true);
        } else {
          visible && setVisible(false);
        }
        setPCal({
          amount: String(Math.round(givenUnits * unitPrice)),
          sqft: String(Math.floor(givenUnits)),
        });
        // ? Here we need units for other screens specially for parent component
        if (props!?.selectedPopertyCal!) {
          let actualUnits = String(Number(value) / Number(unitPrice));
          if (Number(actualUnits) - Math.floor(Number(actualUnits)) === 0) {
            props!?.selectedPopertyCal!(actualUnits);
          } else {
            props!?.selectedPopertyCal!(actualUnits.split(".")[0]);
          }
        }
      }
    }
  }
  return (
    <View
      style={{
        // flexDirection: "row",
        flex: 1,
        // borderColor: colors.BorderColor,
        // borderWidth: 1,
        // padding: wp(3),
        borderRadius: wp(2),
      }}
    >
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          // borderColor: colors.BorderColor,
          // borderWidth: 1,
          // padding: wp(3),
          // borderRadius: wp(2),
        }}
      >
        <View
          style={{
            flex: 1,
            // paddingLeft: wp(6),
            // backgroundColor: "red",
          }}
        >
          <ResponsiveText
            style={{ color: colors.PlaceHolderText, fontSize: 3.2 }}
          >
            {props.propertyType == "buy" ? "I will own" : "I will sell"}
          </ResponsiveText>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottomColor:
                Number(pCal.sqft) > Number(selectedTileData?.smallerUnitArea)
                  ? "red"
                  : colors.Primary,
              borderBottomWidth: props.border ? 0 : 1,
              paddingVertical: Platform.OS == "ios" ? wp(2) : 0,
              // marginBottom: wp(3),
            }}
          >
            <TextInput
              numberOfLines={1}
              editable={props.edit}
              maxLength={14}
              value={
                pCal.sqft ? String(Math.round(Number(pCal.sqft))) : pCal.amount
              }
              style={{
                fontSize: props.fon ? 13 : 18,
                width: "100%",
                color: colors.Primary,
              }}
              placeholderTextColor={colors.Primary}
              onChangeText={(text: string) => {
                handleChange(text, "sqft");
              }}
              keyboardType="numeric"
              placeholder="Enter Sq Ft"
            />
          </View>
        </View>
        <View
          style={{
            backgroundColor: "#B4B4B4",
            width: 1,
            height: wp(8),
            alignItems: "center",
            justifyContent: "center",
            marginHorizontal: wp(4),
          }}
        />
        <View
          style={{
            flex: 1,
            // paddingLeft: wp(5),
            // backgroundColor: "yellow",
          }}
        >
          <ResponsiveText
            style={{ color: colors.PlaceHolderText, fontSize: 3.2 }}
          >
            {props.propertyType == "buy" ? "I will pay" : "I will receive"}
          </ResponsiveText>
          <View
            style={{
              flexDirection: "row",
              // justifyContent: 'space-between',
              alignItems: "center",
              borderBottomColor:
                Number(pCal.sqft) > Number(selectedTileData?.smallerUnitArea)
                  ? "red"
                  : colors.Primary,
              borderBottomWidth: props.border ? 0 : 1,
              paddingVertical: Platform.OS == "ios" ? wp(2) : 0,
            }}
          >
            <TextInput
              numberOfLines={1}
              // editable={props.edit}
              maxLength={14}
              value={
                pCal?.amount
                  ? String(valueWithCommas(Math.floor(Number(pCal?.amount))))
                  : undefined
              }
              style={{
                // backgroundColor: "red",
                fontSize: props.fon ? 13 : 18,
                width: "100%",
                color: colors.Primary,
                // height: wp(15),
              }}
              placeholderTextColor={colors.Primary}
              onChangeText={(text) => handleChange(text, "amount")}
              keyboardType="number-pad"
              placeholder="Enter Amount"
            />
            {/* <Text style={{color: colors.PlaceHolderText}}>Sq Ft</Text> */}
          </View>
        </View>
        {visible && Number(pCal.sqft) > 0 && (
          <View style={{ position: "absolute", left: wp(25), top: wp(3) }}>
            <Tooltip
              color={colors.Primary}
              visible={tooltipVisible}
              setVisible={() => setTooltipVisible(false)}
              content={
                <ResponsiveText
                  style={{ color: "white", fontWeight: "bold" }}
                >{`For ${Math.floor(Number(pCal.sqft))} sqft,${Math.floor(
                  Math.floor(Number(pCal.sqft)) == 0
                    ? Number(pCal.amount)
                    : Math.floor(Number(pCal.sqft)) *
                        Number(selectedTileData?.perSmallerUnitPrice)
                )} Rupees will be deducted.`}</ResponsiveText>
              }
              placement="top"
              onClose={() => setTooltipVisible(false)}
            >
              <SimpleAnimation
                delay={200}
                duration={2000}
                staticType="bounce"
                direction="down"
              >
                <TouchableOpacity onPress={() => setTooltipVisible(true)}>
                  <Icon name="alert-circle" size={20} color={"red"} />
                </TouchableOpacity>
              </SimpleAnimation>
            </Tooltip>
          </View>
        )}
      </View>
      {/* <ResponsiveText style={{ fontSize: 2.5 }}>
        1% commission will be detected{" "}
      </ResponsiveText> */}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    ...Platform.select({
      android: {},
      ios: {},
    }),
  },
});

export default ProperityCalculation;
