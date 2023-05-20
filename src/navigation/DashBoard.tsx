import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ParamListBase } from "@react-navigation/native";
import { NavigationProp } from "react-navigation";
import { useSelector } from "react-redux";

import { DashBoardI } from "@src/navigation/RootStackParams";
import RegisterUser from "@src/navigation/RegisterUserTab";
import UnregisterUser from "@src/navigation/UnregisterUser";
import { RootState } from "@src/redux/reducers";
import MAuthApiService from "@src/services/MAuthApiservice";

interface Props {
  navigation: NavigationProp<ParamListBase>;
  route: any;
}
function DashBoardStack(props: Props) {
  const { Navigator, Screen } = createNativeStackNavigator<DashBoardI>();
  MAuthApiService.setNavigation(props.navigation as any);
  return (
    <Navigator
      initialRouteName={"UnregisterUserStack"}
      screenOptions={{ headerShown: false, gestureEnabled: false }}
    >
      <Screen name="UnregisterUserStack" component={UnregisterUser} />
      <Screen name="RegisterUserStack" component={RegisterUser} />
    </Navigator>
  );
}

export default DashBoardStack;
