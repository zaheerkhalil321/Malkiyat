import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import {
  useTheme,
  NavigationProp,
  ParamListBase,
} from "@react-navigation/native";

import { useSelector } from "react-redux";
import { FacebookLoginI, LoginApiI } from "@src/services/model";
import { GOOGLE_WEB_CLIENT, FB_API } from "@env";
import ResponsiveText from "@src/components/common/ResponseiveText";
import Container from "@src/components/common/Container";
import Logo from "@src/assets/images/Malkiyat.svg";
import MalkiyatLogo from "@src/assets/images/logo.png";
import GoogleLogo from "@src/assets/images/google_logo.svg";
import FaceBookLogo from "@src/assets/images/facebook_logo.svg";
import { wp } from "@src/components/common/Responsive";
import Content from "@src/components/common/Content";
import TextField from "@src/components/common/TextField";
import AuthButton from "@src/components/common/AuthButton";
import MAuthApiService from "@src/services/MAuthApiservice";
import MRegisterUserApiService from "@src/services/MRegisterUserApiService";
const { loginApi, socialLogin, generateToken } = MAuthApiService;
const { setRegisterAuth } = MRegisterUserApiService;

import Loader from "@src/components/ui/loader/Loader";
import { RootState } from "@src/redux/reducers";
import Arrow from "@src/assets/images/arrow_left.svg";
import { store } from "@src/redux/store";
import { FacebookSignIn, GoogleSignIn } from "@src/helpers/authentication";
import { SPECIAL_CHARACTERS_REGIX } from "@src/utils/helperFunction";
import { saveToken } from "@src/redux/action-creators/registerUser";
import MUnregisterUserApiService from "@src/services/MUnregisterUserApiService";
import { errorModal } from "@src/redux/action-creators";
import useDeviceInfo from "@src/hooks/useDeviceInfo";
import { ActionType } from "@src/redux/action-types";
import { useSafeDispatch } from "@src/hooks/useSafeDispatch";
import Fonts from "@src/theme/fonts";

// const initUser = async (callBack: <T>(data: T) => T) => {
//   await LoginManager.logInWithPermissions(["public_profile", "email"]).then(
//     (result) => {
//       if (result.isCancelled) {
//         console.warn("User Login cancelled");
//       } else {
//         AccessToken.getCurrentAccessToken().then((data) => {
//           fetch(fbApi + data?.accessToken)
//             .then((response) => response.json())
//             .then((json) => {
//               console.log(json);
//               callBack(data);
//             })
//             .catch((e) => {
//               reject("ERROR GETTING DATA FROM FACEBOOK", e);
//             });
//         });
//       }
//     },
//     (error) => {
//       console.warn("Login fail with error: " + error);
//     }
//   );
// };

interface props {
  navigation: NavigationProp<ParamListBase>;
}
const LoginScreen = (props: props) => {
  const [phone, setPhone] = useState<string | undefined>(undefined);
  const [password, setPassword] = useState<string | undefined>(undefined);
  const [phoneError, setPhoneError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [eye, setEye] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useSafeDispatch();
  const authReducer = useSelector((state: RootState) => state.authReducer);

  const { colors } = useTheme();
  const { deviceId, deviceName, deviceToken } = useDeviceInfo();

  // ! WE ARE PERSISTING AUTH REDUCER STATE AND SOME TIME IT CAN BE POSSIBLE THAT
  //! AUTHLOADER ALWAYS TRUE SO THAT'S WHY WE ARE MAKING IT FALSE

  React.useEffect(() => {
    if (authReducer.loginLoader) {
      dispatch({ type: ActionType.FAIL_LOGIN });
    }
  }, []);

  const checkValidation = async () => {
    if (!phone) {
      setPhoneError(true);
    } else if (!password) {
      setPasswordError(true);
    } else {
      const data: LoginApiI = {
        username: phone.trim(),
        password,
      };
      const loginData: LoginApiI = {
        mobileNo: phone.trim(),
        password,
      };

      setLoading(true);
      const res = await generateToken(data);

      if (res?.status == 200) {
        setLoading(false);
        MUnregisterUserApiService.setAuth(res.data.accessToken);
        MAuthApiService.setAuth(res.data.accessToken);
        setRegisterAuth(res.data.accessToken);
        dispatch(saveToken(res.data));
        dispatch(
          loginApi(
            { ...loginData, deviceId, deviceToken, deviceName },
            props.navigation
          )
        );
      } else {
        setLoading(false);
        dispatch(
          errorModal(`Please enter correct credentials!`, true, "Error")
        );
        // Alert.alert("Please enter correct credentials!");
      }
    }
  };
  return (
    <Container backgroundColor={"white"} barStyle={"dark-content"}>
      <Image style={{ width: wp(66.93), height: wp(75.73), resizeMode: 'contain', position: 'absolute' }} source={require('@src/assets/images/main_logo.png')} />
      {/* <Content bounces={false} contentContainerStyle={styles.container}> */}
      <View style={styles.viewContainer}>
        {/* <TouchableOpacity
          onPress={() =>
            props.navigation.navigate("DashBoardStack", {
              screen: "UnregisterUserStack",
              params: {
                screen: "HomeView",
              },
            })
          }
          style={{ position: "absolute", top: wp(5), left: wp(-3) }}
        >
          <Arrow width={wp(7)} height={wp(7)} />
        </TouchableOpacity>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: wp(55),
          }}
        >
          <Image
            source={MalkiyatLogo}
            style={{ width: 60, height: 60, marginTop: -wp(3) }}
          />

          <Logo width={wp(40)} />
        </View> */}
        <ResponsiveText style={{ fontSize: 7.47, color: '#3577DB', fontFamily: Fonts.ManropeSemiBold, marginTop: wp(30), marginBottom: wp(10) }}>Sign In</ResponsiveText>
        <View style={{}}>
          <TextField
            // style={{ fontSize: 16 }}
            onChangeText={(e) => {
              phoneError && setPhoneError(false);
              setPhone(e);
            }}
            maxLength={11}
            value={phone}
            placeholder={"Mobile Number"}
            keyboardType={"phone-pad"}

          // keyboardType={
          //   Platform.OS == "ios" ? "ascii-capable" : "visible-password"
          // }
          />
          {phoneError && (
            <ResponsiveText style={styles.errorField}>
              Enter your mobile number
            </ResponsiveText>
          )}
        </View>
        <View style={{ marginTop: wp(10) }}>
          <TextField
            setEye={setEye}
            eye={eye}
            show={true}
            placeholder={"Password"}
            onChangeText={(e) => {
              passwordError && setPasswordError(false);
              setPassword(e);
            }}
            value={password}
          />
          {passwordError && (
            <ResponsiveText style={styles.errorField}>
              Enter your password!
            </ResponsiveText>
          )}
        </View>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("ForgotScreen");
          }}
          style={{ alignSelf: "flex-end" }}
        >
          <ResponsiveText
            style={{ ...styles.forgotText, color: colors.Primary, textDecorationLine: 'underline' }}
          >
            Forgot Password?
          </ResponsiveText>
        </TouchableOpacity>

        <View style={{ paddingBottom: wp(3), marginTop: wp(15) }}>
          {loading ? (
            <ActivityIndicator size={20} color={colors.Primary} />
          ) : (
            <AuthButton
              disabled={
                phone && phone.length == 11 && password ? false : true
              }
              onPress={() => {
                checkValidation();
              }}
              title={"Login"}
            />
          )}
        </View>
        <View style={{ flexDirection: "row" }}>
          <ResponsiveText
            style={{ fontSize: 3.5, color: '#2BACE3' }}
          >
            Don’t have an account?{" "}
          </ResponsiveText>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("SignupScreen");
            }}
          >
            <ResponsiveText style={{ fontSize: 3.5, color: colors.Primary, fontFamily: Fonts.ManropeSemiBold, textDecorationLine: 'underline' }}>
              Register Now
            </ResponsiveText>
          </TouchableOpacity>
        </View>
      </View>
      <Loader visible={authReducer.loginLoader} animationOut={200} />
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
    paddingHorizontal: wp(9)
  },
  forgotText: {
    fontSize: 3.5,
    marginTop: wp(3),
  },
  orText: {
    marginVertical: wp(5),
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
    flexDirection: "row",
    marginTop: wp(10),
  },
  //@ts-ignore
  socialContainer: (color: string) => ({
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: wp(1),
    // borderWidth: 0.5,
    // borderColor: color,
    width: wp(35),
    height: wp(10),
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  }),
  errorField: {
    marginTop: wp(2),
    fontSize: 3,
    color: "red",
  },
});

export default LoginScreen;
