import React, { useState } from "react";
import { View, Text } from "react-native";
import {
  NavigationProp,
  ParamListBase,
  Route,
  useTheme,
} from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSelector } from "react-redux";

import PropertyInfo from "./PropertyInfo";
import PropertyBanner from "./PropertyBanner";
import PropertyCalculation from "./PropertyCalculation";
import PropertyHistroy from "./PropertyHistroy";
import { wp } from "../common/Responsive";
import ResponsiveText from "../common/ResponseiveText";
import Fonts from "@src/theme/fonts";
import { PropertyTabData } from "@src/helpers/DataSet";
import { PropertyDetailI, Route as RouteParamsI } from "@src/services/model";
import { RootState } from "@src/redux/reducers";

interface ProperityI {
  route: Route<string, RouteParamsI>;
  navigation: NavigationProp<ParamListBase>;
  selectedTileData: PropertyDetailI | undefined;
  selectedPopertyCal?: (sqft: string) => void;
}

const ProperityDetails = (props: ProperityI) => {
  const authReducer = useSelector((state: RootState) => state.authReducer);
  const { selectedTileData } = props;
  const { colors } = useTheme();
  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="always"
      automaticallyAdjustContentInsets={true}
    >
      <View
        style={{
          backgroundColor: "white",
          borderColor: colors.Primary,
          borderWidth: 0.8,
          borderRadius: wp(2),
          paddingHorizontal: wp(4),
          paddingVertical: wp(4),
        }}
      >
        <>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: wp(1),
            }}
          >
            <View>
              <ResponsiveText
                style={{
                  color: colors.Primary,
                  fontFamily: Fonts.ManropeBold,
                  fontSize: 4.3,
                }}
              >
                {selectedTileData?.propertyName}
              </ResponsiveText>
              <ResponsiveText
                style={{
                  fontSize: 3.5,
                  color: colors.PlaceHolderText,
                  marginTop: 3,
                }}
              >
                {selectedTileData?.address}
              </ResponsiveText>
            </View>
            {/* <View style={{ alignSelf: "flex-end" }}>
            <ResponsiveText style={{ fontSize: 3.5 }}>
              ID:
              <ResponsiveText
                style={{
                  fontSize: 3.5,
                  color: colors.Primary,
                  fontFamily: Fonts.ManropeBold,
                }}
              >
                {selectedTileData?.propertyId}
              </ResponsiveText>
            </ResponsiveText>
          </View> */}
          </View>
          <View
            style={{
              backgroundColor: colors.BorderColor,
              height: 1,
            }}
          />
        </>
        <PropertyInfo selectedTileData={selectedTileData} />
        <View
          style={{
            marginVertical: wp(3),
            height: wp(34),
            // backgroundColor: "red",
          }}
        >
          <PropertyBanner />
          {/* <SliderBanner /> */}
        </View>
        <View style={{ marginTop: wp(4), marginBottom: wp(5) }}>
          <PropertyCalculation
            propertyType={"buy"}
            selectedPopertyCal={(data) =>
              props?.selectedPopertyCal && props?.selectedPopertyCal!(data)
            }
            // selectedTileData={selectedTileData}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {PropertyTabData.map((item, index) => (
            <View key={index}>
              <PropertyHistroy
                loginUser={authReducer?.token ? true : false}
                selectedTileData={selectedTileData}
                key={index}
                navigation={props.navigation}
                item={item}
                obj={{
                  id: selectedTileData?.propertyId,
                  latitude: selectedTileData?.latitude,
                  longitude: selectedTileData?.longitude,
                  title: selectedTileData?.propertyName,
                  des: selectedTileData?.propertyDesc,
                }}
              />
            </View>
          ))}
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};
export default React.memo(ProperityDetails);
