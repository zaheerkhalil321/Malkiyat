import React, { useState, useRef } from "react";
import {
  Alert,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import {
  useTheme,
  NavigationProp,
  ParamListBase,
} from "@react-navigation/native";
import { Formik, Field, FormikProps } from "formik";
//@ts-ignore
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import ResponsiveText from "@src/components/common/ResponseiveText";
import Container from "@src/components/common/Container";
import Logo from "@src/assets/images/Malkiyat.svg";
import { wp } from "@src/components/common/Responsive";
import Content from "@src/components/common/Content";
import AuthButton from "@src/components/common/AuthButton";
import {
  CustomInput,
  CustomCountryPicker,
} from "@src/components/common/CustomInput";
import { registration } from "@src/helpers/FormValidation";
import MAuthApiService from "@src/services/MAuthApiservice";
const { signupApi } = MAuthApiService;
import Loader from "@src/components/ui/loader/Loader";
import { RootState } from "@src/redux/reducers";
import { useSelector } from "react-redux";
import { store } from "@src/redux/store";
import { PHONE_REGIX } from "@src/utils/helperFunction";
import { FacebookSignIn, GoogleSignIn } from "@src/helpers/authentication";
import FaceBookLogo from "@src/assets/images/facebook_logo.svg";
import GoogleLogo from "@src/assets/images/google_logo.svg";
import useDeviceInfo from "@src/hooks/useDeviceInfo";

const CHECK_NUMERIC = /^[0-9]+$/;
interface props {
  navigation: NavigationProp<ParamListBase>;
}
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

const SignUpScreen = (props: props) => {
  const [eye, setEye] = useState<boolean>(false);
  const [cEye, setCeye] = useState<boolean>(false);
  const formikRef = useRef<FormikProps<MyFormValues>>(null);
  const { colors } = useTheme();
  const authReducer = useSelector((state: RootState) => state.authReducer);
  const { deviceId, deviceName, deviceToken } = useDeviceInfo();

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
  return (
    <Container>
      {/* <Content bounces={false} contentContainerStyle={styles.container}> */}
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="always"
        automaticallyAdjustContentInsets={true}
      >
        <View style={styles.viewContainer}>
          <Logo width={wp(40)} style={styles.logo} />
          <View style={styles.social}>
            <TouchableOpacity
              onPress={FacebookSignIn}
              //@ts-ignore
              style={styles.socialContainer(colors.PlaceHolderText)}
            >
              <FaceBookLogo />
              <ResponsiveText style={{ marginLeft: wp(2) }}>
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
              <ResponsiveText style={{ marginLeft: wp(2) }}>
                Google
              </ResponsiveText>
            </TouchableOpacity>
          </View>

          <Formik
            innerRef={formikRef}
            initialValues={initialValues}
            onSubmit={(values) => submit(values, "Simple-Signup")}
            validationSchema={registration}
          >
            {({ handleSubmit, isValid }) => (
              <>
                <Field
                  key={0}
                  childState
                  component={CustomInput}
                  name="firstname"
                  placeholder="First Name"
                />
                <Field
                  limit={10}
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
                  keyboardType="email-address"
                />
                <Field
                  key={3}
                  component={CustomCountryPicker}
                  name="mobilenumber"
                  placeholder="Mobile Number"
                  keyboardType="numeric"
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
                <View style={{ paddingVertical: wp(10) }}>
                  <AuthButton
                    disabled={!isValid}
                    onPress={handleSubmit}
                    title={"Register"}
                  />
                </View>
              </>
            )}
          </Formik>
          <Loader visible={authReducer.signupLoader} />
          {/* <View style={{ flexDirection: "row" }}>
            <ResponsiveText
              style={{ fontSize: 3.5, color: colors.PlaceHolderText }}
            >
              By signing up you accept the{" "}
            </ResponsiveText>
            <TouchableOpacity>
              <ResponsiveText style={{ fontSize: 3.5, color: colors.Primary }}>
                Terms of Service
              </ResponsiveText>
            </TouchableOpacity>
          </View> */}
          {/* <View style={styles.privacyView}>
            <ResponsiveText
              style={{ fontSize: 3.5, color: colors.PlaceHolderText }}
            >
              and{" "}
            </ResponsiveText>
            <TouchableOpacity>
              <ResponsiveText style={{ fontSize: 3.5, color: colors.Primary }}>
                Privacy Policy
              </ResponsiveText>
            </TouchableOpacity>
          </View> */}
          <View style={styles.accountView}>
            <ResponsiveText
              style={{ fontSize: 3.5, color: colors.PlaceHolderText }}
            >
              Already have an account?{" "}
            </ResponsiveText>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate("LoginScreen");
              }}
            >
              <ResponsiveText
                style={{
                  fontSize: 3.5,
                  color: colors.Primary,
                }}
              >
                Login
              </ResponsiveText>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
      {/* </Content> */}
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
    paddingHorizontal: wp(10),
    paddingVertical: wp(10),
  },
  margin: {
    marginTop: wp(10),
  },
  social: {
    // flexDirection: "row",
    marginTop: wp(2),
  },
  accountView: {
    flexDirection: "row",
    marginTop: -wp(3),
  },
  privacyView: {
    flexDirection: "row",
    marginVertical: wp(2),
  },
  logo: {
    marginBottom: wp(10),
  },
  orText: {
    // marginVertical: wp(4),
    marginTop: wp(4),
    textAlign: "center",
  },
  //@ts-ignore
  socialContainer: (color: string) => ({
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: wp(1),
    // borderWidth: 0.5,
    // borderColor: color,
    width: wp(80),
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
});

export const submit = (
  values: MyFormValues,
  type: "Simple-Signup" | "UnregisterBuyNowVal"
) => {
  const dispatch: any = store.dispatch;

  if (values.firstname.length < 3) {
    Alert.alert("First Name must be 3 characters long!");
  } else if (CHECK_NUMERIC.test(values.firstname)) {
    Alert.alert("First name must contain apha characters.");
  } else if (values.lastname.length < 3) {
    Alert.alert("Last Name must be 3 characters long!");
  } else if (CHECK_NUMERIC.test(values.lastname)) {
    Alert.alert("Last name must contain apha characters.");
  } else if (!PHONE_REGIX.test(String("0" + values.mobilenumber.trim()))) {
    // Alert.alert("Invalid phone number!");
    Alert.alert("Mobile Number is incorrect!");
  } else {
    //removing spaces
    const signupObj = {
      email: values.email.trim(),
      firstName: values.firstname.trim(),
      lastName: values.lastname.trim(),
      mobileNo: "0" + values.mobilenumber.trim(),
      password: values.password.trim(),
    };

    dispatch(signupApi(signupObj, values.mobilenumber, type));
  }
};
export default SignUpScreen;
