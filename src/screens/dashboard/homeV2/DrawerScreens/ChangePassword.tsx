import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import {
  useTheme,
  NavigationProp,
  ParamListBase,
  CommonActions,
} from "@react-navigation/native";
//@ts-ignore
import { BarPasswordStrengthDisplay } from "react-native-password-strength-meter";

import ResponsiveText from "@src/components/common/ResponseiveText";
import Container from "@src/components/common/Container";
import Logo from "@src/assets/images/Chevron_Right.svg";
import Fonts from "@src/theme/fonts";
import { wp } from "@src/components/common/Responsive";
import TextField from "@src/components/common/TextField";
import AuthButton from "@src/components/common/AuthButton";
import Content from "@src/components/common/Content";
import MAuthApiService from "@src/services/MAuthApiservice";
import Loader from "@src/components/ui/loader/Loader";
import { FlashMessage } from "@src/helpers/FlashMessage";
import { Route } from "@src/services/model";
import HomeHeader from "@src/components/ui/HomeHeader/HomeHeader";
import { store } from "@src/redux/store";
import MRegisterUserApiService from "@src/services/MRegisterUserApiService";
import { navigationRef } from "@src/helpers/NavigationService";
interface Props {
  navigation: NavigationProp<ParamListBase>;
  route: Route;
}
const ChangePassword = (props: Props) => {
  const [eye, setEye] = useState<boolean>(false);
  const [eye2, setEye2] = useState<boolean>(false);
  const [eye3, setEye3] = useState<boolean>(false);
  const [oldPassword, setOldPassword] = useState<string | undefined>(undefined);
  const [newPassword, setNewPassword] = useState<string | undefined>(undefined);
  const [confirmpassword, setConfirmPassword] = useState<string | undefined>(
    undefined
  );
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);

  const { colors } = useTheme();

  const passwordVerification = async () => {
    if (newPassword && confirmpassword && newPassword == confirmpassword) {

      // Alert.alert('enter')
      if (newPassword?.length < 8) {
        // Alert.alert('jjj')
        FlashMessage({
          message: "Password must be 8 characters Long!",
          type: "danger",
          duration: 2000,
          animationDuration: 500,
        });

      }

      else {
        const passwordObj: {
          userId: number | undefined;
          oldPassword: string | undefined;
          newPassword: string | undefined;
        } = {
          userId: Number(
            store.getState()?.registerUser?.registerUserData?.userInfo?.userId!
          ),
          oldPassword: oldPassword,
          newPassword: newPassword,
        };
        // setLoader(true);
        let res: any = await MRegisterUserApiService.resetPassword(
          passwordObj
          // props.navigation
        );
        if (res.status == 200) {
          console.log("reset");
          navigationRef.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [
                {
                  name: "AuthStack",
                  state: {
                    routes: [
                      {
                        name: "LoginScreen",
                      },
                    ],
                  },
                },

              ],
            })
          );
          // this.flashMessage("Phone number does not exist!");
        }

        if (res.status == '409') {
          Alert.alert('OldPassword is incorrect')
        }

      }
    }
  };
  React.useEffect(() => {
    console.log(passwordError, confirmpassword, newPassword,);
    if (confirmpassword && newPassword) {

      if (confirmpassword == newPassword) {
        passwordError && setPasswordError(false);
      } else {
        !passwordError && setPasswordError(true);

      }
    }
  }, [newPassword, confirmpassword, passwordError]);
  // console.log(store.getState()?.registerUser?.registerUserData?.userInfo?.userId!, 'wdwe')
  return (
    <Container>
      <HomeHeader
        back
        backgroundColor={"white"}
        show={true}
        {...props}
        title={"Change Password"}
      />
      <Content bounces={false} contentContainerStyle={styles.container}>
        <View style={styles.viewContainer}>
          <ResponsiveText style={styles.titleText}>
            Reset Password
          </ResponsiveText>
          <ResponsiveText
            style={{ ...styles.enterText, color: colors.PlaceHolderText }}
          >
            Please enter your new password and confirm the password.
          </ResponsiveText>
          <View style={{ marginBottom: wp(10) }}>
            <TextField
              setEye={setEye3}
              eye={eye3}
              show
              value={oldPassword}
              onChangeText={(text) => setOldPassword(text)}
              placeholder={"Current Password"}
            />
            {/* {passwordError && (
              <ResponsiveText
                style={{ marginTop: wp(2), fontSize: 3.5, color: "red" }}
              >
                Password not matching!
              </ResponsiveText>
            )} */}
          </View>
          <View>
            <TextField
              setEye={setEye}
              eye={eye}
              show
              value={newPassword}
              onChangeText={(text) => setNewPassword(text)}
              placeholder={"New Password"}
            />
            {newPassword && newPassword!?.length >= 8 ? (
              <BarPasswordStrengthDisplay
                width={wp(80)}
                password={newPassword}
                minLength={8}
                wrapperStyle={{ marginLeft: 0 }}
              />
            ) : null}
          </View>
          <View style={{ marginTop: wp(10) }}>
            <TextField
              setEye={setEye2}
              eye={eye2}
              show
              value={confirmpassword}
              onChangeText={(text) => setConfirmPassword(text)}
              placeholder={"Confirm New Password"}
            />
            {passwordError && (
              <ResponsiveText
                style={{ marginTop: wp(2), fontSize: 3.5, color: "red" }}
              >
                Password not matching!
              </ResponsiveText>
            )}
          </View>

          <View style={{ paddingVertical: wp(10) }}>
            <AuthButton
              disabled={!newPassword || !confirmpassword || !oldPassword}
              onPress={passwordVerification}
              title={"Update"}
            />
          </View>

          {/* <ResponsiveText
                        style={{ ...styles.dontRe, color: colors.PlaceHolderText }}
                    >
                        Didn’t recieve a email/Mobile code?{" "}
                    </ResponsiveText>
                    <TouchableOpacity>
                        <ResponsiveText
                            style={{ ...styles.resendText, color: colors.Primary }}
                        >
                            Resend email/code | Change email/number
                        </ResponsiveText>
                    </TouchableOpacity> */}
        </View>
        <Loader visible={loader} />
      </Content>
    </Container>
  );
};
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: wp(10),
  },
  viewContainer: {
    flex: 1,
    paddingHorizontal: wp(10),
  },
  titleText: {
    fontFamily: Fonts.ManropeBold,
    fontSize: 6.5,
  },
  enterText: {
    fontSize: 3.7,
    marginVertical: wp(5),
    marginBottom: wp(20),
  },
  dontRe: {
    fontSize: 3.8,
    textAlign: "center",
  },
  resendText: {
    fontSize: 3.8,
    marginTop: wp(3),
    textAlign: "center",
  },
});
export default ChangePassword;
