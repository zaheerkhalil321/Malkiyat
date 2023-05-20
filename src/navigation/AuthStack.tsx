import React, { useEffect } from "react";
import SplashScreen from "react-native-splash-screen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AuthStackI } from "@src/navigation/RootStackParams";
import LoginScreen from "@src/screens/auth/LoginScreen";
import ForgotScreen from "@src/screens/auth/ForgotScreen";
import SignupScreen from "@src/screens/auth/SignUpScreen";
import CheckEmail from "@src/screens/auth/CheckEmail";
import ResetPassword from "@src/screens/auth/ResetPassword";
import OTPVerification from "@src/screens/auth/OTPVerification";
import VerificationScreen from "@src/screens/auth/VerificationScreen";

const { Navigator, Screen } = createNativeStackNavigator<AuthStackI>();

function AuthStack() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Navigator
      initialRouteName="LoginScreen"
      screenOptions={{ headerShown: false }}
    >
      <Screen component={LoginScreen} name="LoginScreen" />
      <Screen component={ForgotScreen} name="ForgotScreen" />
      <Screen component={ResetPassword} name="ResetPassword" />
      <Screen component={CheckEmail} name="CheckEmail" />
      <Screen component={SignupScreen} name="SignupScreen" />
      <Screen component={OTPVerification} name="OTPVerification" />
      <Screen component={VerificationScreen} name="VerificationScreen" />
    </Navigator>
  );
}

export default AuthStack;
