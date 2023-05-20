import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  CancelTokenSource,
} from "axios";
import { Dispatch } from "redux";
import { CommonActions } from "@react-navigation/native";
import _ from "lodash";

import { BASE_URL } from "@env";
import { RegisterUserType } from "../redux/action-types";
import MUnregisterUser from "../services/MUnregisterUserApiService";
const { unregisterApi } = MUnregisterUser;

import { RegisterUserAction } from "../redux/actions/registerUser";
import {
  CreateBidI,
  CreateBidResponseI,
  HighestOfferI,
  LowestBidResponseI,
  MainResponse,
  MediaResponseI,
  MeezanTransactionInterface,
  MyAdsInterface,
  RefreshApiI,
  RegisterUserInfo,
  SellSqftsI,
  TransactionInterface,
  TransactionSuccess,
  UserPropertyInterface,
  UserTransactionHistoryI,
  BankListI,
  userTransactionsDetailsI,
  BuyBackDetailsI,
  BuyBackPropertyListI,
  BuyBackResponseI,
} from "./model";
import { navigationRef } from "@src/helpers/NavigationService";
import { BscurePaymentI } from "@src/screens/dashboard/unregisterUser/BuyNow/BSecurePayment";
import { Alert } from "react-native";
import { PriceGuideInterface } from "@src/screens/dashboard/homeV2/Advertise/Advertise";
import { errorModal } from "@src/redux/action-creators";
import { store } from "@src/redux";
import {
  removeToken,
  saveToken,
} from "@src/redux/action-creators/registerUser";
import MAuthApiService from "./MAuthApiservice";
import cacheInstance from "./cacheClass";
class MRegisterUserService {
  instance: AxiosInstance;

  private baseApiUrl: string = BASE_URL;
  navigatingTimer: NodeJS.Timeout | undefined;
  source: CancelTokenSource;

  constructor() {
    this.instance = axios.create({
      baseURL: this.baseApiUrl,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },

      timeout: 300000,
    } as AxiosRequestConfig);

    this.source = axios.CancelToken.source();
  }

  setRegisterAuth = (userAuth: string | undefined) => {
    this.instance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${userAuth}`;
  };

  verifyToken = async () => {
    try {
      const res = await this.instance.get("oauth/v1/token/verify");
      if (res.status == 200) {
        return true;
      }
    } catch (error) {
      return false;
    }
  };
  refreshToken = async () => {
    const obj = {
      refreshToken: store.getState().registerUser.token.refreshToken,
    };

    try {
      const res = await this.instance.post("oauth/v1/token/getrefresh", obj, {
        cancelToken: this.source.token,
      });

      if (res.status == 200 && !_.isEmpty(res.data)) {
        this.setRegisterAuth(res.data.accessToken);
        store.dispatch(saveToken(res.data) as any);
        return true;
      } else {
        this.handleNavigation();
        return true;
      }
    } catch (error) {
      this.handleNavigation();
    }
    return this.source.cancel();
  };
  handleNavigation() {
    store.dispatch(
      errorModal(
        "Your session has been expired.Please login again.",
        true,
        "SESSION_OUT"
      ) as any
    );
    // Alert.alert("Alert", "Session has been expired.Please login again.", [
    //   {
    //     text: "Ok",
    //     onPress: () => {
    //       store.dispatch(removeToken() as any);
    //       navigationRef.dispatch(
    //         CommonActions.reset({
    //           index: 0,
    //           routes: [
    //             {
    //               name: "AuthStack",
    //               state: {
    //                 routes: [
    //                   {
    //                     name: "LoginScreen",
    //                   },
    //                 ],
    //               },
    //             },
    //           ],
    //         })
    //       );
    //     },
    //   },
    // ]);
  }
  transactionApi = async (
    values: Omit<TransactionInterface, "orderRef">
  ): Promise<
    AxiosResponse<
      MainResponse<{
        message?: any;
        checkout_url: string;
        order_reference: string;
      }>
    >
  > => {
    try {
      return await this.instance.post("transaction/", values);
    } catch (error) {
      const errors = error as AxiosError<any>;
      store.dispatch(
        errorModal(String(errors.response?.data?.message), true, "Error") as any
      );

      return {} as Promise<
        AxiosResponse<
          MainResponse<{
            message?: any;
            checkout_url: string;
            order_reference: string;
          }>
        >
      >;
    }
  };
  meezanVerification = async (values: MeezanTransactionInterface) => {
    try {
      const res = await this.instance.post(
        "transaction/verifyMeezanPayment",
        values
      );
    } catch (error) {
      store.dispatch(
        errorModal("Please try again later!", true, "Error") as any
      );
    }
  };

  //!
  bsecureVerification = async (
    values: BscurePaymentI
  ): Promise<AxiosResponse<MainResponse<BscurePaymentI>>> => {
    try {
      return await this.instance.post("transaction/verifyTransaction", values);
    } catch (error) {
      console.log(error, "....");

      const errors = error as AxiosError<any>;
      store.dispatch(
        errorModal(
          String(
            errors.response?.data?.message ??
              "Something went wrong. Please try again later."
          ),
          true,
          "Error"
        ) as any
      );
      return {} as AxiosResponse<MainResponse<BscurePaymentI>>;
    }
  };
  getTransactionHistoryById = (params: any) => {
    return async (dispatch: Dispatch<RegisterUserAction>) => {
      try {
        const res = await this.instance.get(`transaction/user/${params}`);

        dispatch({
          type: RegisterUserType.GET_TRANSACTION_HISTORY_BY_ID,
          payload: res.data.data,
        });
      } catch (error) {
        dispatch(errorModal("Please try again later!", true, "Error") as any);
        console.warn(error, "Transaction History fetch error");
      }
      return true;
    };
  };

  updateBalanceAfterTransaction = (userId, navigation) => {
    return async (dispatch) => {
      const res: any = dispatch(this.refreshingApi(userId));
      // const res: any = dispatch(unregisterApi());
      if (res) {
        dispatch({ type: RegisterUserType.SHOW_MODAL, payload: true });
        navigation.goBack();
      }
    };

    // return async (dispatch: Dispatch<RegisterUserAction>) => {
    //   const res = await this.instance.get<UserBalanceAfterTransaction>(
    //     `balance/${userId}`
    //   );
    //   dispatch({
    //     type: RegisterUserType.USER_BALANCE_AFTER_TRANSACTION,
    //     payload: res.data.walletBalance,
    //   });
    //   return true;
    // };
  };
  refreshingApi = (userId) => {
    return async (dispatch) => {
      try {
        const res = await this.instance.get<MainResponse<RegisterUserInfo>>(
          `property/registerHomeScreen/${userId}`
        );

        if (res.status == 200 && !_.isEmpty(res.data)) {
          dispatch({
            type: RegisterUserType.REFRESH_API,
            payload: res?.data?.data ?? {},
          });
        } else {
          console.warn("something went wrong with refresh api!", res.data);
          dispatch(errorModal("Please try again later!", true, "Error") as any);
        }
      } catch (error) {
        console.log("error", error);
        dispatch(errorModal("Please try again later!", true, "Error") as any);
      }
      return true;
    };
  };
  userPropertyList = (userId: number) => {
    return async (dispatch) => {
      try {
        const resd = await this.instance.get<MainResponse<RegisterUserInfo>>(
          `property/registerHomeScreen/${userId}`
        );
        const res = await this.instance.get<
          MainResponse<UserPropertyInterface>
        >(`property/userProperties/${userId}`);

        if (res.status == 200) {
          dispatch({
            type: RegisterUserType.REGISTER_USER_PROPERTY,
            payload: res.data,
          });
        } else {
          console.warn("something went wrong with userProperty api!", res.data);
          dispatch(errorModal("Please try again later!", true, "Error") as any);
        }
        return true;
      } catch (error) {
        dispatch(errorModal("Please try again later!", true, "Error") as any);
      }
      return false;
    };
  };
  useTransactionHistoryList = (userId: number) => async (dispatch) => {
    try {
      const res = await this.instance.get<
        MainResponse<UserTransactionHistoryI>
      >(`transaction/userTransactions/${userId}`);

      if (res.status == 200) {
        dispatch({
          type: RegisterUserType.REGISTER_USER_TRANSACTION_HISTORY,
          payload: res.data.data,
        });
        return true;
      } else {
        console.warn(
          "something went wrong with userTransaction api!",
          res.data
        );

        return false;
      }
    } catch (error) {
      console.log("error", error);
      return false;
    }
  };

  getTransactionDetailByReferenceId = async (
    referenceId,
    type
  ): Promise<
    AxiosResponse<
      MainResponse<{ userTransactions: userTransactionsDetailsI[] }>
    >
  > => {
    return cacheInstance.checkCacheData(referenceId, async () => {
      return await this.instance.get(
        `transaction/userTransactions/ ${referenceId}/${type}`
      );
    });
  };

  highestOfferBid = (userId, propertyId, forSaleUnits) => {
    try {
      return this.instance.get<HighestOfferI>(
        `property/highestbid?userId=${userId}&propertyId=${propertyId}&forSaleUnits=${forSaleUnits}`
      );
    } catch (error) {
      store.dispatch(
        errorModal(
          "Oops! Something went wrong. We have opened a support ticket and someone will reach out to you soon.",
          true,
          "Error"
        ) as any
      );
      // console.log(error);
      return {} as AxiosResponse<HighestOfferI>;
    }
  };
  sellSqftsApi = async (
    obj: SellSqftsI
  ): Promise<AxiosResponse<MainResponse<string>>> => {
    try {
      return await this.instance.post("transaction/sellMySmallerUnit", obj);
    } catch (error) {
      const errors = error as AxiosError<any>;
      store.dispatch(
        errorModal(
          String(
            errors.response?.data?.message ??
              "Something went wrong. Please try again later."
          ),
          true,
          "Error"
        ) as any
      );
      return {} as AxiosResponse<MainResponse<string>>;
    }
  };
  createBidByUser = async (
    data: CreateBidI
  ): Promise<AxiosResponse<MediaResponseI<CreateBidResponseI>, any>> => {
    try {
      return await this.instance.post("property/addBidOffer", data);
    } catch (error) {
      const errors = error as AxiosError<any>;
      store.dispatch(
        errorModal(
          errors?.response?.data?.message ??
            "You can't make a bid due to low wallet balance!",
          true,
          "Error"
        ) as any
      );

      return error as unknown as AxiosResponse<
        MediaResponseI<CreateBidResponseI>
      >;
    }
  };

  priceGuideApi = async (
    userId: number,
    propertyId: number
  ): Promise<AxiosResponse<MediaResponseI<PriceGuideInterface>>> => {
    try {
      const res = await this.instance.get(
        `property/priceguide/${userId}/${propertyId}`
      );
      console.log(res);
      return res;
    } catch (error) {
      console.log(error);
      store.dispatch(
        errorModal("Please try again later!", true, "Error") as any
      );
      return {} as AxiosResponse<MediaResponseI<PriceGuideInterface>>;
    }
  };
  lowestBidOffer = (
    data
  ): Promise<AxiosResponse<MediaResponseI<LowestBidResponseI>>> => {
    try {
      return this.instance.post(`property/lowestbid`, data);
    } catch (error) {
      store.dispatch(
        errorModal("Please try again later!", true, "Error") as any
      );
      return {} as Promise<AxiosResponse<MediaResponseI<LowestBidResponseI>>>;
    }
  };

  myAdsApi = (userId: number) => {
    return async (dispatch) => {
      try {
        const res = await this.instance.get<MainResponse<MyAdsInterface[]>>(
          `property/myAdsScreen/${userId}`
        );

        if (res.status == 200) {
          dispatch({
            type: RegisterUserType.REGISTER_USER_ADS,
            payload: res.data.data,
          });
          return true;
        } else {
          dispatch(errorModal("Please try again later!", true, "Error") as any);
        }
        return false;
      } catch (error) {
        dispatch(errorModal("Please try again later!", true, "Error") as any);
      }

      return false;
    };
  };
  cancelAdApi = async (propertyId: number): Promise<AxiosResponse<any>> => {
    try {
      return await this.instance.get(`property/bids/inactive/${propertyId}`);
    } catch (error) {
      store.dispatch(
        errorModal("Please try again later!", true, "Error") as any
      );
      return {} as Promise<AxiosResponse<any>>;
    }
  };
  privacyPolicy = async () => {
    try {
      const res = await this.instance.get("utility/privacyPolicy");
      return res;
    } catch (error) {
      console.log("🚀privacy", error);
    }
  };
  support = async () => {
    try {
      const res = await this.instance.get("utility/support");
      return res;
    } catch (error) {
      console.log("🚀 support", error);
    }
  };
  buyBackFromMalkiyat = async (
    values
  ): Promise<AxiosResponse<MainResponse<any>>> => {
    try {
      return await this.instance.post("transaction/buyBack", values);
    } catch (error) {
      return {} as Promise<AxiosResponse<MainResponse<any>>>;
    }
  };
  // changePassword = async (obj) => {
  //   try {
  //     const res = await this.instance.post("User/changePassword", obj);
  //   } catch (error) {
  //     console.log("🚀 support", error);
  //   }
  // };
  resetPassword = async (
    passwordObj: {
      userId: number | undefined;
      oldPassword: string | undefined;
      newPassword: string | undefined;
    }

    // navigation: NavigationProp<ParamListBase>
  ) => {
    try {
      const res = await this.instance.post("User/changePassword", passwordObj);
      console.log(passwordObj, "obj");
      return res;
    } catch (error) {
      Alert.alert("OldPassword is incorrect");
      // this.flashMessage("Something went wrong.Please try again!");
      // console.warn("something went wrong!", error);
      // console.log("notreset", res.message);
    }
    return true;
  };
  balance = async (userId) => {
    try {
      const res = await this.instance.get(`balance/wallet/${userId}`);
      return res;
    } catch (error) {
      console.log("🚀 support", error);
    }
  };
  getAllVouchers = async (userId) => {
    try {
      const res = await this.instance.get(`User/vouchers/${userId}`);
      return res;
    } catch (error) {
      console.log("🚀 vouchers", error);
    }
  };

  getCommission = async (obj): Promise<AxiosResponse<MainResponse<number>>> => {
    try {
      const res = await this.instance.post("transaction/getCommission", obj);
      return res;
    } catch (error) {
      return {} as Promise<AxiosResponse<MainResponse<number>>>;
    }
  };
  getBankList = async () => {
    try {
      const res = await this.instance.get<MainResponse<BankListI[]>>(
        "transaction/bankList"
      );

      return res;
    } catch (error) {
      return error as Promise<AxiosResponse<MainResponse<BankListI[]>>>;
    }
  };
  sendCashOutOtp = (
    id: number
  ): Promise<AxiosResponse<MediaResponseI<any>>> => {
    try {
      return this.instance.get(`User/sendOtp/${id}`);
    } catch (error) {
      return error as Promise<AxiosResponse<MediaResponseI<any>>>;
    }
  };
  verifyCashoutOtp = (obj): Promise<AxiosResponse<MediaResponseI<any>>> => {
    return this.instance
      .post("User/verifyTransOtp", obj)
      .then((res) => res)
      .catch((error) => {
        store.dispatch(errorModal(String("Invalid Otp"), true, "Error") as any);
        return error;
      });
    // try {
    //   return this.instance.post("User/verifyTransOtp", obj);
    // } catch (error) {
    //   const errors = error as AxiosError<any>;
    //   console.log(
    //     "🚀 ~ file: MRegisterUserApiService.ts:553 ~ MRegisterUserService ~ errors",
    //     errors
    //   );

    //   store.dispatch(
    //     errorModal(String(errors.response?.data?.message), true, "Error") as any
    //   );
    //   return error as Promise<AxiosResponse<MediaResponseI<any>>>;
    // }
  };

  userCashOutApi = (obj): Promise<AxiosResponse<MainResponse<any>>> => {
    return this.instance
      .post("transaction/cashOut", obj)
      .then((res) => res)
      .catch((error) => {
        const errors = error as AxiosError<any>;

        store.dispatch(
          errorModal(
            String(errors.response?.data?.message),
            true,
            "Error"
          ) as any
        );
        return error;
      });
  };

  getCashoutTransactionsInProcess = async (
    id
  ): Promise<AxiosResponse<MainResponse<any>>> => {
    try {
      return await this.instance.get(`transaction/requests/${id}`);
    } catch (error) {
      const errors = error as AxiosError<any>;

      store.dispatch(
        errorModal(String(errors.response?.data?.message), true, "Error") as any
      );
      return error as Promise<AxiosResponse<MainResponse<any>>>;
    }
  };
  cashInToMalkiyat = async () => {
    try {
      return await this.instance.get("transaction/getMalkiyatAccDetails");
    } catch (error) {
      return {};
    }
  };

  // ? BUYBACK API'S

  buyBackDetails = async (
    id
  ): Promise<AxiosResponse<MediaResponseI<BuyBackDetailsI[]>>> => {
    try {
      return await this.instance.get(`property/buyBackDetails/${id}`);
    } catch (error) {
      const errors = error as AxiosError<any>;

      store.dispatch(
        errorModal(String(errors.response?.data?.message), true, "Error") as any
      );
      return error as Promise<AxiosResponse<MediaResponseI<BuyBackDetailsI[]>>>;
    }
  };
  buyBackPropertyList = async (
    userid,
    propertyId
  ): Promise<AxiosResponse<MediaResponseI<BuyBackPropertyListI[]>>> => {
    try {
      return await this.instance.get(
        `property/buyBackDetails/${userid}/${propertyId}`
      );
    } catch (error) {
      const errors = error as AxiosError<any>;

      store.dispatch(
        errorModal(String(errors.response?.data?.message), true, "Error") as any
      );
      return error as Promise<
        AxiosResponse<MediaResponseI<BuyBackPropertyListI[]>>
      >;
    }
  };
  buyBackApi = async (
    obj
  ): Promise<AxiosResponse<MainResponse<BuyBackResponseI>>> => {
    try {
      return await this.instance.post(`transaction/buyBack`, obj);
    } catch (error) {
      const errors = error as AxiosError<any>;

      store.dispatch(
        errorModal(String(errors.response?.data?.message), true, "Error") as any
      );
      return error as Promise<AxiosResponse<MainResponse<BuyBackResponseI>>>;
    }
  };
  buyBackUnitst = async (
    userid,
    propertyId,
    date
  ): Promise<
    AxiosResponse<
      MediaResponseI<{ subPropertyId: number; purchasedPrice: number }[]>
    >
  > => {
    const obj = { userId: userid, propertyId: propertyId, date: date };
    try {
      return await this.instance.post("property/buyBackUnits", obj);
    } catch (error) {
      const errors = error as AxiosError<any>;

      store.dispatch(
        errorModal(String(errors.response?.data?.message), true, "Error") as any
      );
      return error as Promise<
        AxiosResponse<
          MediaResponseI<{ subPropertyId: number; purchasedPrice: number }[]>
        >
      >;
    }
  };
  upladRecieptApi = (obj): Promise<AxiosResponse<MainResponse<any>>> => {
    console.log(
      "🚀 ~ file: MRegisterUserApiService.ts:708 ~ MRegisterUserService ~ obj",
      obj
    );

    return this.instance
      .post("transaction/uploadReceipt", obj)
      .then((res) => res)
      .catch((error) => {
        const errors = error as AxiosError<any>;

        store.dispatch(
          errorModal(
            String(errors.response?.data?.message),
            true,
            "Error"
          ) as any
        );
        return error;
      });
  };
  // userProfileApi = async (
  //   values
  // ): Promise<AxiosResponse<MainResponse<any>>> => {
  //   try {
  //     return await this.instance.post("User/userProfile", values);
  //   } catch (error) {
  //     return {} as Promise<AxiosResponse<MainResponse<any>>>;
  //   }
  // };
  userProfileApi = (values) => {
    console.log(values, "..");

    const updated_values = {
      ...values,
      picture:
        values.picture != "0"
          ? "data:image/jpeg;base64," + values.picture
          : store.getState().registerUser.registerUserData.userInfo?.profilePic,
    };
    console.log(updated_values, "..");

    return async (dispatch) => {
      dispatch({
        type: RegisterUserType.SAVE_USER_PROFILE_DATA,
        payload: updated_values,
      });

      try {
        const res = await this.instance.post("User/userProfile", values);

        if (res.status == 200 && !_.isEmpty(res.data)) {
          dispatch({
            type: RegisterUserType.SAVE_USER_PROFILE_DATA,
            payload: res?.data?.data ?? {},
          });
          return res;
        } else {
          console.warn("something went wrong!", res.data);
          dispatch(errorModal("Please try again later!", true, "Error") as any);
          return res;
        }
      } catch (error) {
        console.log("error", error);
        dispatch(errorModal("Please try again later!", true, "Error") as any);
      }
      return {};
    };
  };
}

const MRegisterUserApiService = new MRegisterUserService();

const SetupInterceptors = (http) => {
  http.instance.interceptors.request.use(
    (config) => {
      config.headers["token"] = store.getState().registerUser.token.accessToken;
      config.headers["content-type"] = "application/json";
      return config;
    },
    (error) => {
      console.log("error", error);
      return Promise.reject(error);
    }
  );
  http.instance.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error?.response?.status == 401) {
        http.refreshToken();
        return Promise.reject(error);
      } else {
        return Promise.reject(error);
      }
    }
  );
};

SetupInterceptors(MRegisterUserApiService);

export default MRegisterUserApiService;
