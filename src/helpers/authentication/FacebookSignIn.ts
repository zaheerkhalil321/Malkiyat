import { Platform } from "react-native";

import {
  AccessToken,
  LoginBehavior,
  LoginManager,
  Profile,
} from "react-native-fbsdk-next";
import MAuthApiService from "@src/services/MAuthApiservice";
import { store } from "@src/redux/store";

const { socialLogin } = MAuthApiService;

LoginManager.setLoginBehavior(Platform.OS == "ios" ? "browser" : "web_only");

export const FacebookLogin = () => {
  LoginManager.logInWithPermissions(["public_profile", "email"]).then(
    function (result) {
      if (result.isCancelled) {
      } else {
        getFbInfo();
      }
    },
    function (error) {
      console.log("Login fail with error: " + error);
    }
  );
};
function getFbInfo() {
  const dispatch: any = store.dispatch;

  Profile.getCurrentProfile().then(function (currentProfile) {
    if (currentProfile) {
      const obj = {
        email: currentProfile.email,
        firstName: currentProfile.firstName,
        lastName: currentProfile.lastName,
      };
      dispatch(socialLogin({ facebookAccount: currentProfile.userID, ...obj }));
    } else {
      console.warn("something went wrong trying again");
      getFbInfo();
    }
  });
}
