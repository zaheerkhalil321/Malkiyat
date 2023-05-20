import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  Platform,
  Alert,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Field, Formik, FormikProps } from "formik";

import Container from "@src/components/common/Container";
import HomeHeader from "@src/components/ui/HomeHeader/HomeHeader";
import ProfileSvg from "@src/assets/images/HomeIcons/Profile.svg";
import { wp } from "@src/components/common/Responsive";
import ResponsiveText from "@src/components/common/ResponseiveText";
import Fonts from "@src/theme/fonts";
import { useTheme } from "@react-navigation/native";
import GoogleLogo from "@src/assets/images/google_logo.svg";
import FaceBookLogo from "@src/assets/images/facebook_logo.svg";
import ProperityCalculation from "@src/components/home/PropertyCalculation";
import {
  CustomCountryPicker,
  CustomInput,
} from "@src/components/common/CustomInput";
import { submit } from "@src/screens/auth/SignUpScreen";
import { registration } from "@src/helpers/FormValidation";
import { RootState } from "@src/redux/reducers";
import Loader from "@src/components/ui/loader/Loader";

import Step1 from "@src/assets/images/step1.svg";
import { FacebookSignIn, GoogleSignIn } from "@src/helpers/authentication";
import useDeviceInfo from "@src/hooks/useDeviceInfo";
import { UnitsValidation } from "@src/helpers/unitsValidation";
interface MyFormValues {
  firstname: string;
  lastname: string;
  email: string;
  mobilenumber: string;
  password: string;
  cpassword: string;
  deviceToken: string;
  deviceName: string;
  deviceId: string;
}
const UnregisterBuyNowVal = (props) => {
  const { colors } = useTheme();
  const [edit, setEdit] = useState(false);
  const formikRef = useRef<FormikProps<MyFormValues>>(null);
  const [eye, setEye] = useState<boolean>(false);
  const [cEye, setCeye] = useState<boolean>(false);
  const registerReducer = useSelector((state: RootState) => state.registerUser);
  const selectedTileData = useSelector(
    (state: RootState) => state.registerUser.selectedTileData
  );
  const authReducer = useSelector((state: RootState) => state.authReducer);
  const { deviceId, deviceName, deviceToken } = useDeviceInfo();

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const handleGoogleSign = () => {
    GoogleSignIn((data: any) => {
      formikRef.current?.setValues({
        ...formikRef.current.values,
        firstname: data?.firstName ?? "",
        lastname: data?.lastName ?? "",
        email: data?.email ?? "",
        deviceId,
        deviceName,
        deviceToken,
      });
    });
  };

  const initialValues: MyFormValues = {
    firstname: "",
    lastname: "",
    email: "",
    mobilenumber: "",
    password: "",
    cpassword: "",
    deviceToken: "",
    deviceName: "",
    deviceId: "",
  };
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
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{ flexGrow: 1 }}
        style={{ flex: 1 }}
        automaticallyAdjustContentInsets={true}
      >
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
              edit={edit}
              propertyType={"buy"}
              selectedPopertyCal={(data) =>
                props?.selectedPopertyCal && props?.selectedPopertyCal!(data)
              }
            />
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
              fontFamily: Fonts.ManropeSemiBold,
              marginBottom: wp(2),
            }}
          >
            Basic Information
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
            }}
          >
            <View style={styles.social}>
              <TouchableOpacity
                onPress={FacebookSignIn}
                //@ts-ignore
                style={styles.socialContainer(colors.PlaceHolderText)}
              >
                <FaceBookLogo />
                <ResponsiveText style={{ marginLeft: wp(3) }}>
                  Facebook
                </ResponsiveText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleGoogleSign}
                style={StyleSheet.flatten([
                  //@ts-ignore
                  styles.socialContainer(colors.PlaceHolderText),
                  { marginTop: wp(3) },
                ])}
              >
                <GoogleLogo />
                <ResponsiveText style={{ marginLeft: wp(3) }}>
                  Google
                </ResponsiveText>
              </TouchableOpacity>
            </View>
            <ResponsiveText
              style={{ ...styles.orText, color: colors.PlaceHolderText }}
            >
              or
            </ResponsiveText>
            <Formik
              innerRef={formikRef}
              initialValues={initialValues}
              onSubmit={(values) => {
                submit(values, "UnregisterBuyNowVal");
              }}
              validationSchema={registration}
            >
              {() => (
                <>
                  <Field
                    key={0}
                    childState
                    component={CustomInput}
                    name="firstname"
                    placeholder="First Name"
                  />
                  <Field
                    key={1}
                    component={CustomInput}
                    name="lastname"
                    placeholder="Last Name"
                  />
                  <Field
                    key={2}
                    component={CustomInput}
                    name="email"
                    placeholder="Email"
                  />
                  <Field
                    key={3}
                    component={CustomCountryPicker}
                    name="mobilenumber"
                    placeholder="Mobile Number"
                  />
                  <Field
                    key={4}
                    component={CustomInput}
                    setEye={setEye}
                    eye={eye}
                    name="password"
                    placeholder="Password"
                    limit={25}
                  // keyboardType={
                  //   Platform.OS == "ios"
                  //     ? "ascii-capable"
                  //     : "visible-password"
                  // }
                  />
                  <Field
                    key={5}
                    component={CustomInput}
                    setEye={setCeye}
                    eye={cEye}
                    name="cpassword"
                    placeholder="Confirm Password"
                  // keyboardType={
                  //   Platform.OS == "ios"
                  //     ? "ascii-capable"
                  //     : "visible-password"
                  // }
                  />
                </>
              )}
            </Formik>
            <Loader
              visible={authReducer.signupLoader || authReducer.loginLoader}
            />
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            formikRef.current?.handleSubmit();
          }}
          disabled={!UnitsValidation() ? true : false}
          style={{
            width: wp(35),
            height: wp(12),
            borderRadius: wp(10),
            alignSelf: "flex-end",
            justifyContent: "center",
            alignItems: "center",
            marginRight: wp(5),
            backgroundColor: !UnitsValidation() ? "#aeaeae" : colors.Primary,

            marginBottom:
              Platform.OS == "android" && isKeyboardVisible ? wp(70) : wp(5),
          }}
        >
          <ResponsiveText style={{ color: "white", fontWeight: "bold" }}>
            Next
          </ResponsiveText>
        </TouchableOpacity>
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
});

export default UnregisterBuyNowVal;
