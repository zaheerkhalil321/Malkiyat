import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import {
  NavigationProp,
  ParamListBase,
  CommonActions,
} from "@react-navigation/native";

import { FlashMessage } from "../helpers/FlashMessage";
import {
  GenerateTokenI,
  LoginApiI,
  MainResponse,
  OnBoardingI,
  RegisterUserInfo,
  SignupResponse,
  SignupType,
} from "./model";
import { Dispatch } from "redux";
import { Action } from "../redux/actions";
import { RegisterUserAction } from "../redux/actions/registerUser";
import { ActionType, RegisterUserType } from "../redux/action-types";

import { BASE_URL } from "@env";
import { Alert } from "react-native";
import { ErrorObj, findError } from "@src/utils/helperFunction";
import { errorModal } from "@src/redux/action-creators";
import MUnregisterUserApiService from "./MUnregisterUserApiService";
import MRegisterUserApiService from "./MRegisterUserApiService";
import { saveToken } from "@src/redux/action-creators/registerUser";
import { store } from "@src/redux";

class MAuthService {
  instance: AxiosInstance;

  private baseApiUrl: string = BASE_URL;

  navigatingTimer: number | undefined;
  navigation: NavigationProp<ParamListBase> | null;

  constructor() {
    this.instance = axios.create({
      baseURL: this.baseApiUrl,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      timeout: 300000,
    } as AxiosRequestConfig);

    this.navigation = null;
  }

  flashMessage(mesg: string) {
    FlashMessage({
      message: mesg,
      type: "danger",
      duration: 3000,
      animationDuration: 500,
    });
  }
  setNavigation = (navigation: NavigationProp<ParamListBase>) => {
    this.navigation = navigation;
  };
  setAuth = (userAuth: string | undefined) => {
    this.instance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${userAuth}`;
  };
  generateToken = async (
    values: LoginApiI
  ): Promise<AxiosResponse<GenerateTokenI>> => {
    try {
      const token = await this.instance.post("oauth/v1/token/generate", values);

      return token;
    } catch (error) {
      console.log(
        "🚀 ~ file: MAuthApiservice.ts:79 ~ MAuthService ~ token",
        error
      );
      return {} as Promise<AxiosResponse<GenerateTokenI>>;
    }
  };
  loginApi =
    (values: LoginApiI, navigation: NavigationProp<ParamListBase>) =>
    async (dispatch: Dispatch<Action | RegisterUserAction>) => {
      dispatch({ type: ActionType.LOGIN });
      try {
        const res = await this.instance.post<MainResponse<RegisterUserInfo>>(
          "User/login",
          values
        );
        console.log(
          "🚀 ~ file: MAuthApiservice.ts:99 ~ MAuthService ~ res",
          res
        );

        if (res.data.status == 4002) {
          dispatch({ type: ActionType.FAIL_LOGIN });
          navigation.navigate("VerificationScreen", { values: values });
        } else if (
          res.data?.status == 4001 ||
          res.data?.status == 4000 ||
          res.data.status == 400
        ) {
          dispatch({ type: ActionType.FAIL_LOGIN });
          const errorName = findError(res.data.data as unknown as ErrorObj);
          if (errorName) {
            dispatch(errorModal(String(errorName), true, "Error") as any);
          } else {
            dispatch(
              errorModal(
                "Something went wrong & error not found!",
                true,
                "Error"
              ) as any
            );
          }
        } else {
          dispatch({
            type: RegisterUserType.SAVE_REGISTER_USER_DATA,
            payload: res.data.data,
          });
          dispatch({ type: ActionType.SUCCESS_LOGIN });

          setTimeout(() => {
            this.navigation?.navigate("DashBoardStack", {
              screen: "RegisterUserStack",
            });
          }, 1000);
        }
      } catch (error) {
        console.log(error);
        dispatch({ type: ActionType.FAIL_LOGIN });
        dispatch(errorModal("Please try again later!", true, "Error") as any);
      }
    };

  resendOtpApi = async (
    phone
  ): Promise<AxiosResponse<MainResponse<number>>> => {
    try {
      return await this.instance.post<MainResponse<any>>("User/resendOtp", {
        mobileNo: phone,
      });
    } catch (error) {
      console.log(error);
      const errors = error as AxiosError<any>;
      store.dispatch(
        errorModal(String(errors.response?.data?.error), true, "Error") as any
      );

      return {} as Promise<AxiosResponse<MainResponse<number>>>;
    }
  };

  signupApi =
    (
      values: any,
      phoneNo: string,
      type: "Simple-Signup" | "UnregisterBuyNowVal"
    ) =>
    async (dispatch: Dispatch<Action>) => {
      dispatch({ type: ActionType.SIGNUP });
      try {
        const res = await this.instance.post<MainResponse<SignupResponse>>(
          "User/signUp",
          values
        );

        if (res.data?.status == 4003) {
          dispatch({ type: ActionType.SIGNUP_FAIL });
          dispatch(errorModal(res.data.message, true, "Error") as any);
        } else {
          if (res.data.status == 200) {
            dispatch({
              type: ActionType.SIGNUP_SUCCESS,
              payload: res.data.data.userId,
            });
            this.navigation!?.navigate("AuthStack", {
              screen: "OTPVerification",
              params: {
                phone: phoneNo,
                userId: res.data.data.userId,
                moveToDashBoard: true,
                values: values,
                type,
              },
            });
          } else {
            if (res.data.status == 400) {
              dispatch({ type: ActionType.SIGNUP_FAIL });
              if (res.data?.data) {
                const errorName = findError(
                  res.data.data as unknown as ErrorObj
                );
                if (errorName) {
                  dispatch(errorModal(String(errorName), true, "Error") as any);
                } else {
                  Alert.alert("Something went wrong & error not found!");
                }
              } else {
                dispatch({ type: ActionType.SIGNUP_FAIL });
                dispatch(
                  errorModal(String(res?.data?.message), true, "Error") as any
                );
              }
            } else {
              if (res.data == ("" as any)) {
                dispatch(this.signupApi(values, phoneNo, type) as any);
              } else {
                dispatch({ type: ActionType.SIGNUP_FAIL });
                dispatch(
                  errorModal(
                    String("Please try again later!"),
                    true,
                    "Error"
                  ) as any
                );
              }
            }
          }
        }
      } catch (error) {
        console.log(error);
        dispatch({ type: ActionType.SIGNUP_FAIL });
        dispatch(
          errorModal(String("Please try again later!"), true, "Error") as any
        );
      }
    };

  verifyOTP =
    (
      otpObj: { userId: string | undefined; otp: string },
      navigation: NavigationProp<ParamListBase>,
      moveToDashBoard: boolean | undefined,
      values,
      type: SignupType
    ) =>
    async (dispatch: Dispatch<Action | RegisterUserAction>) => {
      const routes = navigation.getState().routes;
      try {
        const res = await this.instance.post("User/verifyOtp", otpObj);

        if (
          res.data?.status == 4005 ||
          res.data?.status == 4006 ||
          res.data?.status == 4003 ||
          res.data?.status == 400
        ) {
          dispatch(errorModal(res.data.message, true, "Error") as any);
        } else {
          dispatch({
            type: RegisterUserType.SAVE_REGISTER_USER_DATA,
            payload: res.data.data,
          });
          if (!moveToDashBoard && !values) {
            navigation.navigate("ResetPassword", {
              userId: otpObj.userId,
            });
            return true;
          }

          const data: LoginApiI = {
            username: String(values?.mobileNo).trim(),
            password: values.password,
          };

          const tokenResponse = await this.generateToken(data);

          if (tokenResponse.status == 200) {
            console.log("signup response", tokenResponse);

            this.setAuth(tokenResponse.data.accessToken);
            MUnregisterUserApiService.setAuth(tokenResponse.data.accessToken);
            MRegisterUserApiService.setRegisterAuth(
              tokenResponse.data.accessToken
            );
            dispatch(saveToken(tokenResponse.data) as any);

            //? we are checking here firstName because user can only navigate to proofofpurchase screen when user do signup  (on again verify otp user will move to dashboard)

            if (routes?.length >= 1 && values?.firstName) {
              if (type == "UnregisterBuyNowVal") {
                navigation.navigate(
                  //@ts-ignore
                  "DashBoardStack",
                  {
                    screen: "UnregisterUserStack",
                    params: {
                      screen: "ProofPurchase",
                    },
                  }
                );
              } else {
                this.navigatingTimer = setTimeout(() => {
                  navigation.dispatch(
                    CommonActions.reset({
                      index: 1,
                      routes: [
                        {
                          name: "DashBoardStack",
                          state: {
                            routes: [
                              {
                                name: "RegisterUserStack",
                                params: { userId: res.data?.data },
                              },
                            ],
                          },
                        },
                      ],
                    })
                  );
                }, 1000);
              }
            } else {
              this.navigatingTimer = setTimeout(() => {
                navigation.dispatch(
                  CommonActions.reset({
                    index: 1,
                    routes: [
                      {
                        name: "DashBoardStack",
                        state: {
                          routes: [
                            {
                              name: "RegisterUserStack",
                              params: { userId: res.data?.data },
                            },
                          ],
                        },
                      },
                    ],
                  })
                );
              }, 1000);
            }
          } else {
            Alert.alert("Unable to generate token,Check user's credentials.");
          }
        }
      } catch (error) {
        dispatch(errorModal("Please try again later!", true, "Error") as any);
        console.warn(error);
      }
      return true;
    };
  resendOtp = async (
    mobileNo: string
  ): Promise<AxiosResponse<MainResponse<number>>> => {
    const obj = {
      mobileNo: "0" + mobileNo,
    };

    try {
      const res = await this.instance.post("User/resendOtp", obj);
      console.log(res);
      return res;
    } catch (error) {
      const errors = error as AxiosError<any>;
      console.log(errors);

      store.dispatch(
        errorModal(String("Something went wrong!"), true, "Error") as any
      );
      return {} as Promise<AxiosResponse<MainResponse<number>>>;
    }
  };

  forgotPassword =
    (phoneNo: string | undefined, navigation: NavigationProp<ParamListBase>) =>
    async (dispatch: Dispatch<Action | RegisterUserAction>) => {
      const phone = { mobileNo: "0" + phoneNo };
      try {
        const res = await this.instance.post("User/forgetPassword", phone);
        if (res.data?.status == 4001) {
          dispatch(errorModal(res.data?.message, true, "Error") as any);
        } else {
          navigation.navigate("OTPVerification", {
            phone: phoneNo,
            userId: res.data?.data?.userId,
            moveToDashBoard: false,
          });
        }
      } catch (error) {
        dispatch(errorModal("Please try again later!", true, "Error") as any);
        console.warn(error);
      }
      return true;
    };
  changePassword = async (
    passwordObj: {
      userId: number | undefined;
      password: string | undefined;
    },
    navigation: NavigationProp<ParamListBase>
  ) => {
    try {
      const res = await this.instance.post("User/resetPassword", passwordObj);

      if (res.data.status != 200) {
        this.flashMessage("Phone number does not exist!");
      } else {
        navigation.push("LoginScreen");
      }
    } catch (error) {
      this.flashMessage("Something went wrong.Please try again!");
      console.warn("something went wrong!", error);
    }
    return true;
  };

  socialLogin =
    (values: any) =>
    async (dispatch: Dispatch<Action | RegisterUserAction>) => {
      dispatch({ type: ActionType.LOGIN });
      try {
        const res = await this.instance.post<MainResponse<RegisterUserInfo>>(
          "User/signUp",
          values
        );

        if (res.data.status == 200) {
          dispatch({
            type: RegisterUserType.SAVE_REGISTER_USER_DATA,
            payload: res.data.data,
          });
          dispatch({
            type: ActionType.SUCCESS_LOGIN,
            payload: "coolbaby",
          });
          if (res.data.data.userInfo?.kycStatus) {
            this.navigatingTimer = setTimeout(() => {
              return this.navigation?.navigate("DashBoardStack", {
                screen: "RegisterUserStack",
              });
            }, 600);
          } else {
            this.navigatingTimer = setTimeout(() => {
              // if (state.routes.length <= 2) {
              this.navigation!.navigate("ProofPurchase");
              // }
              // else {
              //   this.navigation!.dispatch(
              //     CommonActions.reset({
              //       index: 1,
              //       routes: [
              //         {
              //           name: "DashBoardStack",
              //         },
              //       ],
              //     })
              //   );
              // }
            }, 1000);
          }
        } else {
          if (res.data.status == 400) {
            const errorName = findError(res.data.data as unknown as ErrorObj);

            if (errorName) {
              dispatch(errorModal(String(errorName), true, "Error") as any);
            } else Alert.alert("Please try again later!");
          }
          console.warn(res, "else condition");

          // this.flashMessage(res.data.message);
          dispatch({ type: ActionType.FAIL_LOGIN });
        }
      } catch (error) {
        console.warn(error);
        dispatch({ type: ActionType.FAIL_LOGIN });
        dispatch(
          errorModal(String("Please try again later!"), true, "Error") as any
        );
      }
    };
  getOnboardingData = () => async (dispatch: Dispatch<any>) => {
    try {
      const res = await this.instance.get<AxiosRequestConfig<OnBoardingI[]>>(
        "User/screen"
      );
      dispatch({ type: ActionType.ONBOARDING_DATA, payload: res.data.data });
    } catch (error) {
      console.log(error);
    }
  };
}

const MAuthApiService = new MAuthService();

export default MAuthApiService;
