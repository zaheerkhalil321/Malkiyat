import React, { useEffect } from "react";
import { useColorScheme } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "react-native-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import analytics from "@react-native-firebase/analytics";

import { MainStack } from "@src/navigation/RootStackParams";
import AuthStack from "@src/navigation/AuthStack";
import DashBoardStack from "@src/navigation/DashBoard";
import { DarkTheme, DefaultTheme } from "@src/theme/colors";
import SlideWalkthrough from "@src/screens/auth/SlideWalkthrough";
import { PDFView } from "@src/components/common/PDFView";
import { navigationRef } from "@src/helpers/NavigationService";
import MalkiyatPossible from "@src/screens/auth/MalkiyatPossible";
import useWalkthrough from "@src/hooks/useWalkThrough";

function App() {
  const scheme = useColorScheme();

  const [walkthrough, hideWalkThroughScreen, hideLoader, loading] =
    useWalkthrough();
  const routeNameRef = React.useRef<string>("");
  const { Navigator, Screen } = createStackNavigator<MainStack>();

  useEffect(() => {
    SplashScreen.hide();
    hideWalkThroughScreen();
    if (loading) {
      hideLoader();
    }
  }, []);

  return (
    <NavigationContainer
      theme={scheme === "dark" ? DarkTheme : (DefaultTheme as any)}
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current = navigationRef.current!.getCurrentRoute()!.name;
      }}
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName =
          navigationRef!.current!.getCurrentRoute()!.name;
        //* FIREBASE APP ANALYTICS IMPLEMENTATION FOR USER EXPERIANCE
        if (previousRouteName !== currentRouteName) {
          await analytics().logScreenView({
            screen_name: currentRouteName,
            screen_class: currentRouteName,
          });
        }
        routeNameRef.current = currentRouteName as any;
      }}
    >
      <Navigator
        initialRouteName={walkthrough ? "SlideWalkthrough" : "DashBoardStack"}
        screenOptions={{ headerShown: false, gestureEnabled: false }}
      >
        <Screen component={SlideWalkthrough} name="SlideWalkthrough" />
        <Screen component={MalkiyatPossible} name="MalkiyatPossible" />
        <Screen component={DashBoardStack} name="DashBoardStack" />
        <Screen component={AuthStack} name="AuthStack" />
        <Screen component={PDFView} name="PDFView" />
      </Navigator>
    </NavigationContainer>
  );
}

export default App;
