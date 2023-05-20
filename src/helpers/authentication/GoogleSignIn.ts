import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { store } from "@src/redux/store";
import { GOOGLE_WEB_CLIENT } from "@env";
import MAuthApiService from "@src/services/MAuthApiservice";
import { Alert } from "react-native";
import { Callback } from "yup/lib/types";
const { socialLogin } = MAuthApiService;

GoogleSignin.configure({
  webClientId: GOOGLE_WEB_CLIENT,
  offlineAccess: true,
});

export const GoogleLogin = async (callBack: Callback) => {
  const dispatch: any = store.dispatch;

  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();

    const obj = {
      mobileNo: 0, //! 0 IN CASE OF SOCIAL LOGIN
      email: userInfo.user?.email,
      firstName: userInfo.user?.givenName,
      lastName: userInfo.user?.familyName ?? userInfo.user?.givenName,
      password:
        userInfo?.user?.givenName?.charAt(0).toUpperCase() +
        (userInfo.user?.familyName?.charAt(0)! ??
          userInfo.user?.givenName?.charAt(0)!) +
        userInfo?.user?.email.split("@")[0].slice(0, 5) +
        "@" +
        0,
    };
    callBack(obj as any);
    return;
  } catch (error: any) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
      console.warn("User Cancelled Login!");
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // operation (e.g. sign in) is in progress already
      console.warn("User already in login state! ");
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // play services not available or outdated
      console.warn("google services not available!");
    } else {
      // !some other error happened
      console.error(error);
    }
  }
};
