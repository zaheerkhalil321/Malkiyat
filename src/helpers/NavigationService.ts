import { NavigationContainerRef } from "@react-navigation/native";
import { createNavigationContainerRef } from "@react-navigation/native";
import { StackActions } from "@react-navigation/native";
import * as React from "react";
import { Alert } from "react-native";

// export const navigationRef =
export const navigationRef = createNavigationContainerRef();
/**
 * @param  {never} name
 * @param  {never} params
 */
export function navigate(name: never, params: never) {
  if (navigationRef?.isReady()) {
    navigationRef.navigate(name, params);
  }
}

// add other navigation functions that you need and export them

export function setParams(params: never) {
  if (navigationRef?.isReady()) {
    navigationRef.current?.setParams(params);
  }
}
export function dispatch(args: any) {
  if (navigationRef?.isReady()) {
    navigationRef.dispatch(StackActions.push(args));
  }
}
export function setTopLevelNavigator(navigatorRef: any) {}

export default {
  navigate,
  setTopLevelNavigator,

  setParams,
};
