import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { useSelector } from "react-redux";

import Container from "@src/components/common/Container";
import HomeHeader from "@src/components/ui/HomeHeader/HomeHeader";
import ProfileSvg from "@src/assets/images/HomeIcons/Profile.svg";
import { wp } from "@src/components/common/Responsive";
import ResponsiveText from "@src/components/common/ResponseiveText";
import Fonts from "@src/theme/fonts";
import { useTheme } from "@react-navigation/native";
import ProperityCalculation from "@src/components/home/PropertyCalculation";
import Content from "@src/components/common/Content";
import { RootState } from "@src/redux/reducers";

import Step1 from "@src/assets/images/step1.svg";
import { UnitsValidation } from "@src/helpers/unitsValidation";
import { RegisterUserType } from "@src/redux/action-types";
import { useSafeDispatch } from "@src/hooks/useSafeDispatch";
const UnregisterBuyNow = (props) => {
  const dispatch = useSafeDispatch();
  const { colors } = useTheme();
  const registerReducer = useSelector((state: RootState) => state.registerUser);

  React.useEffect(() => {
    return () => {
      dispatch({
        type: RegisterUserType.SAVE_UNITS,
        payload: 0,
      });
    };
  }, []);

  return (
    <Container style={{ backgroundColor: "#F4F4F4" }}>
      <HomeHeader
        back
        backgroundColor={"white"}
        show={false}
        {...props}
        title={"Malkiyat"}
        label={"Login"}
        icon={<ProfileSvg strokeWidth={10} width={wp(5)} height={wp(5)} />}
      />

      <Content style={{ backgroundColor: "#F4F4F4" }}>
        <View style={{ paddingHorizontal: wp(5) }}>
          <View
            style={{
              paddingTop: wp(1.5),
              alignItems: "center",
            }}
          >
            <Step1 />
          </View>
          <ResponsiveText
            style={{
              marginTop: wp(2),
              fontFamily: Fonts.ManropeSemiBold,
              marginBottom: wp(2),
            }}
          >
            Purchase Details
          </ResponsiveText>
          <View
            style={{
              backgroundColor: "white",
              borderColor: colors.Primary,
              borderWidth: 0.8,
              borderRadius: wp(2),
              paddingHorizontal: wp(4),
              paddingVertical: wp(3),
              // height: wp(44),
            }}
          >
            <Text
              numberOfLines={1}
              style={{
                color: colors.Primary,
                fontFamily: Fonts.ManropeBold,
                fontSize: 16,
                // backgroundColor: "red",
                width: wp(30),
              }}
            >
              {registerReducer.selectedTileData?.propertyName}
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: wp(1),
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  // backgroundColor: "red",
                  width: "100%",
                }}
              >
                <ResponsiveText
                  style={{
                    fontSize: 3,
                    color: colors.TextColor,
                    marginBottom: wp(1),
                  }}
                >
                  {registerReducer.selectedTileData?.propertyStatus}
                </ResponsiveText>
                <Text
                  // numberOfLines={1}
                  style={{
                    fontSize: 12,
                    color: colors.PlaceHolderText,
                    // marginTop: 3,
                    // backgroundColor: "red",
                    // width: wp(50),
                    width: wp(45),
                    marginLeft: "auto",
                    textAlign: "right",
                    marginTop: -wp(6),
                  }}
                >
                  {registerReducer.selectedTileData?.address}
                </Text>
              </View>
            </View>
            <View
              style={{
                backgroundColor: colors.BorderColor,
                width: "100%",
                height: 1,
                marginBottom: wp(2),
              }}
            />
            <ProperityCalculation
              propertyType={"buy"}
              selectedPopertyCal={(data) =>
                props?.selectedPopertyCal && props?.selectedPopertyCal!(data)
              }
            />
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("UnregisterBuyNowVal");
            // formikRef.current?.handleSubmit();
          }}
          disabled={!UnitsValidation() ? true : false}
          style={{
            width: wp(35),
            height: wp(12),
            borderRadius: wp(10),
            backgroundColor: !UnitsValidation() ? "#aeaeae" : colors.Primary,
            alignSelf: "flex-end",
            justifyContent: "center",
            alignItems: "center",
            marginRight: wp(5),
            marginVertical: wp(5),
          }}
        >
          <ResponsiveText style={{ color: "white", fontWeight: "bold" }}>
            Next
          </ResponsiveText>
        </TouchableOpacity>
      </Content>
    </Container>
  );
};
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  viewContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  forgotText: {
    fontSize: 3.5,
    marginTop: wp(3),
  },
  orText: {
    // marginVertical: wp(4),
    marginTop: wp(4),
    textAlign: "center",
  },
  logoStyle: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
  },

  social: {
    // flexDirection: "row",
    marginTop: wp(2),
  },
  //@ts-ignore
  socialContainer: (color: string) => ({
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: wp(1),
    // borderWidth: 0.5,
    // borderColor: color,
    // width: wp(35),
    height: wp(10),
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  }),
  errorField: {
    marginTop: wp(2),
    fontSize: 3,
    color: "red",
  },
});

export default UnregisterBuyNow;
