import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useTheme } from "@react-navigation/native";
import _ from "lodash";

import Container from "@src/components/common/Container";
import HomeHeader from "@src/components/ui/HomeHeader/HomeHeader";
import ProfileSvg from "@src/assets/images/HomeIcons/Profile.svg";
import { wp } from "@src/components/common/Responsive";
import ResponsiveText from "@src/components/common/ResponseiveText";
import Fonts from "@src/theme/fonts";
import ProperityCalculation from "@src/components/home/PropertyCalculation";
import Content from "@src/components/common/Content";
import { RootState } from "@src/redux/reducers";
import CheckIcon from "@src/assets/images/check.svg";
import Step1 from "@src/assets/images/step2.svg";
import MUnregisterUserApiService from "@src/services/MUnregisterUserApiService";
import { ProofOfPurchaseI } from "@src/services/model";
import ColorCheckBox from "@src/assets/images/svg/coloredCheckBox.svg";
import { UnitsValidation } from "@src/helpers/unitsValidation";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const RegisterProofPurchase = (props) => {
  const { colors } = useTheme();
  const [edit, setEdit] = useState(false);
  const [radioButtons, setRadioButtons] = React.useState<{
    radio1: boolean;
    radio2: boolean;
  }>({ radio1: true, radio2: false });
  const [checkBox, setCheckBox] = React.useState(false);
  const [purchaseInstructions, setPurchaseInstructions] = React.useState<
    ProofOfPurchaseI[]
  >([]);
  const registerReducer = useSelector((state: RootState) => state.registerUser);
  // useEffect(
  //     () =>
  //         props.navigation.addListener("beforeRemove", (e) => {
  //             // Prevent default behavior of leaving the screen
  //             e.preventDefault();
  //             props.navigation.navigate("DashBoardStack", {
  //                 screen: "RegisterUserStack",
  //             });

  //             // Prompt the user before leaving the screen
  //         }),
  //     [props.navigation]
  // );
  useEffect(() => {
    const allData = async () => {
      const response = await MUnregisterUserApiService.proofOfPurchaseData();
      setPurchaseInstructions(response.data);
    };
    allData();
  }, []);

  return (
    <Container style={{ backgroundColor: "#F4F4F4" }}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="always"
        automaticallyAdjustContentInsets={true}
      >
        <HomeHeader
          back
          backgroundColor={"white"}
          show={false}
          {...props}
          title={"Malkiyat"}
          // label={"Already a Member"}
          // icon={<ProfileSvg strokeWidth={10} width={wp(5)} height={wp(5)} />}
        />

        <Content style={{ backgroundColor: "#F4F4F4" }}>
          <View style={{ paddingHorizontal: wp(5) }}>
            <View
              style={{
                paddingTop: wp(1.5),
                alignItems: "center",
                // backgroundColor: "red",
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
                    // alignItems: "center",
                    justifyContent: "space-between",
                    // backgroundColor: "red",
                    width: "100%",
                  }}
                >
                  <View>
                    <Text
                      numberOfLines={1}
                      style={{
                        color: colors.Primary,
                        fontFamily: Fonts.ManropeBold,
                        fontSize: 13,
                        // backgroundColor: "red",
                        width: wp(28),
                      }}
                    >
                      {registerReducer.selectedTileData?.propertyName}
                    </Text>
                    <ResponsiveText
                      style={{
                        fontSize: 3,
                        color: colors.TextColor,
                        marginBottom: wp(1),
                      }}
                    >
                      {registerReducer.selectedTileData?.propertyStatus}
                    </ResponsiveText>
                  </View>
                  <Text
                    // numberOfLines={1}
                    style={{
                      fontSize: 12,
                      color: colors.PlaceHolderText,
                      // marginTop: 3,
                      // backgroundColor: "red",
                      // width: wp(52),
                      marginBottom: wp(1),
                      width: wp(45),
                      marginLeft: "auto",
                      textAlign: "right",
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

              <View
                style={{
                  flexDirection: "row",
                  // alignItems: "center",
                }}
              >
                <View style={{ width: wp(20) }}>
                  <Text
                    style={{ color: colors.PlaceHolderText, fontSize: wp(3.2) }}
                  >
                    Buyer
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={{ color: colors.Primary, marginTop: wp(3) }}
                  >
                    {registerReducer?.registerUserData?.userInfo?.firstName +
                      " " +
                      registerReducer?.registerUserData?.userInfo
                        ?.lastName!}{" "}
                  </Text>
                </View>
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <View
                    style={{
                      backgroundColor: "#B4B4B4",
                      width: 1,
                      height: wp(8),
                      alignItems: "center",
                      justifyContent: "center",
                      marginHorizontal: wp(3),
                      // marginLeft: wp(3),
                    }}
                  />
                </View>

                <ProperityCalculation
                  fon
                  edit={edit}
                  border
                  propertyType={"buy"}
                  selectedPopertyCal={(data) =>
                    props?.selectedPopertyCal &&
                    props?.selectedPopertyCal!(data)
                  }
                  // selectedTileData={registerReducer.selectedTileData} //   selectedTileData={selectedTileData}
                />
              </View>
            </View>
            <TouchableOpacity
              onPress={() => {
                setEdit(!edit);
              }}
            >
              <ResponsiveText
                style={{
                  fontSize: 3.5,
                  alignSelf: "flex-end",
                  marginTop: wp(2),
                  fontFamily: Fonts.ManropeSemiBold,
                  color: colors.Primary,
                }}
              >
                Edit
              </ResponsiveText>
            </TouchableOpacity>
            <ResponsiveText
              style={{
                fontSize: 3.5,
                // marginTop: wp(4),
                fontFamily: Fonts.ManropeSemiBold,
                marginBottom: wp(2),
                marginTop: wp(2),
              }}
            >
              Proof of Purcahse - Preferences
            </ResponsiveText>

            <View
              style={{
                backgroundColor: "white",
                borderColor: colors.Primary,
                borderWidth: 0.8,
                borderRadius: wp(2),
                paddingHorizontal: wp(4),
                paddingVertical: wp(3),
                marginBottom: wp(5),
                // height: wp(44),
              }}
            >
              <ResponsiveText
                style={{ fontSize: 3.5, fontFamily: Fonts.ManropeSemiBold }}
              >
                {/* Proof of purchase: */}
              </ResponsiveText>
              <View
                style={{
                  flexDirection: "row",
                  marginLeft: wp(5),
                  marginTop: wp(3),
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setRadioButtons({
                      radio1: true,
                      radio2: false,
                    });

                    //   props.setPay(props.item.id);
                  }}
                  style={{
                    width: wp(6),
                    height: wp(6),
                    borderRadius: wp(10),
                    borderWidth: 2.5,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {radioButtons.radio1 && (
                    <View
                      style={{
                        width: wp(3),
                        height: wp(3),
                        borderRadius: wp(10),
                        backgroundColor: "#333333",
                        // backgroundColor: props.item.id == props.pay ? "#333333" : "white",
                        // padding: 10,
                      }}
                    ></View>
                  )}
                </TouchableOpacity>
                <ResponsiveText
                  style={{
                    // fontSize: 3.5,
                    //   backgroundColor: "red",
                    width: wp(70),
                    marginLeft: 5,
                    color: colors.Primary,
                    fontFamily: Fonts.ManropeSemiBold,
                  }}
                >
                  {purchaseInstructions[0]?.price > 0
                    ? "Rs" +
                      " " +
                      purchaseInstructions[0].price +
                      " " +
                      purchaseInstructions[0]?.description.split(":")[0] +
                      ":"
                    : "Free"}
                  <ResponsiveText style={{ fontFamily: Fonts.ManropeSemiBold }}>
                    {purchaseInstructions[0]?.price > 0
                      ? purchaseInstructions[0]?.description.split(":")[1]
                      : purchaseInstructions[0]?.description}
                    .{" "}
                  </ResponsiveText>
                </ResponsiveText>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginLeft: wp(5),
                  marginTop: wp(3),
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setRadioButtons({ radio1: false, radio2: true });
                  }}
                  style={{
                    width: wp(6),
                    height: wp(6),
                    borderRadius: wp(10),
                    borderWidth: 2.5,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {radioButtons.radio2 && (
                    <View
                      style={{
                        width: wp(3),
                        height: wp(3),
                        borderRadius: wp(10),
                        backgroundColor: "#333333",
                        // backgroundColor: props.item.id == props.pay ? "#333333" : "white",
                        // padding: 10,
                      }}
                    ></View>
                  )}
                </TouchableOpacity>
                <ResponsiveText
                  style={{
                    // fontSize: 3.5,
                    //   backgroundColor: "red",
                    width: wp(70),
                    marginLeft: 5,
                    color: colors.Primary,
                    fontFamily: Fonts.ManropeSemiBold,
                  }}
                >
                  {purchaseInstructions[1]?.price > 0
                    ? "Rs" +
                      " " +
                      purchaseInstructions[1]?.price +
                      " " +
                      purchaseInstructions[1]?.description.split(":")[0] +
                      ":"
                    : "Free"}
                  <ResponsiveText style={{ fontFamily: Fonts.ManropeSemiBold }}>
                    {purchaseInstructions[1]?.price > 0
                      ? purchaseInstructions[1]?.description.split(":")[1]
                      : purchaseInstructions[1]?.description}
                    .{" "}
                  </ResponsiveText>
                </ResponsiveText>
              </View>
              <ResponsiveText
                style={{
                  fontSize: 3.5,
                  marginTop: wp(3),
                  fontFamily: Fonts.ManropeSemiBold,
                }}
              >
                Delivery:
              </ResponsiveText>
              <View
                style={{
                  flexDirection: "row",
                  marginLeft: wp(5),
                  marginTop: wp(3),
                  alignItems: "center",
                }}
              >
                <CheckIcon />
                <ResponsiveText
                  style={{
                    // fontSize: 3.5,
                    //   backgroundColor: "red",
                    width: wp(70),
                    marginLeft: 5,
                    color: colors.Primary,
                    fontFamily: Fonts.ManropeSemiBold,
                  }}
                >
                  {purchaseInstructions[2]?.price > 0
                    ? "Rs" +
                      " " +
                      purchaseInstructions[2].price +
                      " " +
                      purchaseInstructions[2]?.description.split(":")[0] +
                      ":"
                    : "Free"}
                  <ResponsiveText style={{ fontFamily: Fonts.ManropeSemiBold }}>
                    {purchaseInstructions[2]?.price > 0
                      ? purchaseInstructions[2]?.description.split(":")[1]
                      : purchaseInstructions[2]?.description}
                    .{" "}
                  </ResponsiveText>
                </ResponsiveText>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginLeft: wp(5),
                  marginTop: wp(3),
                  // alignItems: "center",
                }}
              >
                <TouchableOpacity
                  style={{ marginTop: wp(1) }}
                  onPress={() => setCheckBox(!checkBox)}
                >
                  {checkBox ? (
                    <ColorCheckBox width={wp(4)} height={wp(4)} />
                  ) : (
                    <View
                      style={{
                        borderColor: colors.Primary,
                        borderWidth: 1,
                        width: wp(4),
                        height: wp(4),
                        borderRadius: wp(1),
                      }}
                    ></View>
                  )}
                </TouchableOpacity>

                <ResponsiveText
                  style={{
                    // fontSize: 3.5,
                    // backgroundColor: "red",
                    width: wp(70),
                    marginLeft: 5,
                    color: colors.Primary,
                    fontFamily: Fonts.ManropeSemiBold,
                  }}
                >
                  {purchaseInstructions[3]?.price > 0
                    ? "Rs" +
                      " " +
                      purchaseInstructions[3].price +
                      " " +
                      purchaseInstructions[3]?.description.split(":")[0] +
                      ":"
                    : "Free"}
                  <ResponsiveText style={{ fontFamily: Fonts.ManropeSemiBold }}>
                    {purchaseInstructions[3]?.price > 0
                      ? purchaseInstructions[3]?.description.split(":")[1]
                      : purchaseInstructions[3]?.description}
                    .{" "}
                  </ResponsiveText>
                </ResponsiveText>
              </View>

              <TouchableOpacity
                onPress={() => {
                  if (_.size(purchaseInstructions) > 0) {
                    props.navigation.navigate("RegisterPayment", {
                      purchaseId: radioButtons.radio1
                        ? purchaseInstructions[0].proofId
                        : purchaseInstructions[1].proofId,
                      deliveryId: checkBox
                        ? purchaseInstructions[3].proofId
                        : purchaseInstructions[2].proofId,
                      pofCharges: radioButtons.radio1
                        ? purchaseInstructions[0].price
                        : purchaseInstructions[1].price,
                      courerCharges: checkBox
                        ? purchaseInstructions[3].price
                        : 0,
                    });
                  }
                }}
                disabled={!UnitsValidation() ? true : false}
                style={{
                  width: wp(35),
                  height: wp(12),
                  borderRadius: wp(10),
                  backgroundColor: !UnitsValidation()
                    ? "#aeaeae"
                    : colors.Primary,
                  alignSelf: "flex-end",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: wp(3),
                  // marginRight: wp(5),
                  // marginBottom: wp(5),
                }}
              >
                <ResponsiveText style={{ color: "white", fontWeight: "bold" }}>
                  Next
                </ResponsiveText>
              </TouchableOpacity>
            </View>
          </View>
        </Content>
      </KeyboardAwareScrollView>
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
  addressInput: {
    width: "80%",
    height: "13%",
    borderWidth: 1,
    marginLeft: "auto",
    borderRadius: 5,
    marginVertical: wp(2),
    paddingHorizontal: wp(3),
  },
});

export default RegisterProofPurchase;
