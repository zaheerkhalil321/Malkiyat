import "react-native-reanimated";

import React, { useEffect } from "react";
import { Button, LogBox, Text, View } from "react-native";
import ErrorBoundary from "react-native-error-boundary";
import FlashMessage from "react-native-flash-message";
import { Provider } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";
import RNRestart from "react-native-restart";
import { enableScreens } from "react-native-screens";

import RootNavigation from "@src/navigation/MainStack";
import { store } from "@src/redux";
import MAuthApiService from "@src/services/MAuthApiservice";
import { fetchHomeData } from "@src/services/RestApiCalls";

import CustomErrorModal from "@src/components/common/CustomErrorModal";
import useDeviceInfo from "@src/hooks/useDeviceInfo";
import { useSafeDispatch } from "@src/hooks/useSafeDispatch";
import UserInactive from "@src/components/UserInactive";

enableScreens(true);

const { getOnboardingData } = MAuthApiService;

if (__DEV__) {
  LogBox.ignoreLogs([
    "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
  ]);
}
const refreshApp = () => {
  RNRestart.Restart();
};
const CustomFallback = (props: { error: Error; resetError: Function }) => (
  <View>
    <Text>Something happened!</Text>
    <Text>{props.error.toString()}</Text>
    <Button onPress={refreshApp} title={"Try again"} />
  </View>
);
const App = () => {
  // const { deviceId, deviceType, deviceName } = useDeviceInfo();

  // RNUxcam.optIntoSchematicRecordings();
  // RNUxcam.startWithKey("0zvehy6vit75v30");

  // ? IF THERE IS FOCUS ON SCREEN
  const dispatch: any = useSafeDispatch();

  useEffect(() => {
    fetchHomeData();
    //* fetching onboarding data before user can move that screen
    dispatch(getOnboardingData());
  }, []);

  return (
    <ErrorBoundary FallbackComponent={CustomFallback}>
      <Provider store={store}>
        <SafeAreaProvider>
          {/* <UserInactive> */}
          <RootNavigation />
          {/* </UserInactive> */}
        </SafeAreaProvider>
        <FlashMessage position="top" />
        <CustomErrorModal />
      </Provider>
    </ErrorBoundary>
  );
};
export default App;
