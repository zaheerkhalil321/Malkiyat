import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { FlashMessage } from "../helpers/FlashMessage";
import { Dispatch } from "redux";
import { UnRegisterUserAction } from "../redux/actions/unregisteruser";
import { UnRegUserType } from "../redux/action-types";
import { BASE_URL } from "@env";

import {
  CountryI,
  HomeScreenI,
  MainResponse,
  MediaI,
  MediaResponseI,
  PaymentMethods,
  PriceDetailsI,
  ProofOfPurchaseI,
  PropertyDetails,
  PropertySoldHistory,
  UpdatedResponse,
  YearIncreaseI,
} from "./model";
import { errorModal } from "@src/redux/action-creators";
import { store } from "@src/redux";

class MUnRegisterService {
  instance: AxiosInstance;

  private baseApiUrl: string = BASE_URL;
  navigatingTimer: NodeJS.Timeout | undefined;

  constructor() {
    this.instance = axios.create({
      baseURL: this.baseApiUrl,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },

      timeout: 300000,
    } as AxiosRequestConfig);
  }

  flashMessage(mesg: string) {
    FlashMessage({
      message: mesg,
      type: "danger",
      duration: 3000,
      animationDuration: 500,
    });
  }
  getInstance = () => this.instance;
  setAuth = (userAuth: string | undefined) => {
    this.instance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${userAuth}`;
  };

  unregisterApi = () => {
    return async (dispatch: Dispatch<UnRegisterUserAction>) => {
      try {
        const res = await this.instance.get("UnRegister/getDetails");

        dispatch({
          type: UnRegUserType.UNREGISTER_USER_DATA,
          payload: res.data.data,
        });
      } catch (error) {
        console.warn(error, "unregisterError");
        dispatch(errorModal("Please try again later!", true, "Error") as any);
      }
    };
  };

  getUnregisterUserMedia = async (
    id: number
  ): Promise<AxiosResponse<MediaResponseI<MediaI[]>>> => {
    return await this.instance.get(`UnRegister/propertyId/${id}`);
  };

  getDoucmentByID = (params: any) => {
    return async (dispatch: Dispatch<UnRegisterUserAction>) => {
      try {
        const res = await this.instance.get(`UnRegister/documents/${params}`);
        dispatch({
          type: UnRegUserType.GET_DOCUMENT_BY_ID,
          payload: res.data.data,
        });
      } catch (error) {
        console.warn(error, "Document fetch error");
        dispatch(errorModal("Please try again later!", true, "Error") as any);
      }
    };
  };

  getSqftSoldHistoryById = (params: any) => {
    return async (dispatch: Dispatch<UnRegisterUserAction>) => {
      try {
        const res = await this.instance.get(`property/soldHistory/${params}`);
        dispatch({
          type: UnRegUserType.SQFT_SOLD_HISTORY,
          payload: res.data,
        });
      } catch (error) {
        console.warn(error, "Sq-Ft Sold History fetch error");
        dispatch(errorModal("Please try again later!", true, "Error") as any);
      }
    };
  };
  getSplashApi = (params: any) => {
    return async (dispatch: Dispatch<UnRegisterUserAction>) => {
      try {
        const res = await this.instance.get("User/screen");
        // dispatch({
        //   type: UnRegUserType.SQFT_SOLD_HISTORY,
        //   payload: res.data,
        // });
      } catch (error) {
        console.warn(error, "Sq-Ft Sold History fetch error");
        dispatch(errorModal("Please try again later!", true, "Error") as any);
      }
    };
  };
  proofOfPurchaseData = async (): Promise<
    AxiosResponse<ProofOfPurchaseI[]>
  > => {
    try {
      return await this.instance.get("transaction/pop");
    } catch (error) {
      console.log(error);

      return {} as Promise<AxiosResponse<ProofOfPurchaseI[]>>;
    }
  };
  getAllPaymentMethods = async (): Promise<AxiosResponse<PaymentMethods[]>> => {
    return await this.instance.get("transaction/getPaymentMethods");
  };
  initiatePayment = async (
    values: any
  ): Promise<
    AxiosResponse<MainResponse<{ checkOutUrl: string; orderId: number }>>
  > => {
    try {
      return await this.instance.post(
        "transaction/initiateTransaction",
        values
      );
    } catch (error) {
      console.log(error, "error");
      const errors = error as AxiosError<any>;
      store.dispatch(
        errorModal(
          errors?.response?.data?.message ?? "Please try again later!",
          true,
          "Error"
        ) as any
      );
      return {} as Promise<
        AxiosResponse<MainResponse<{ checkOutUrl: string; orderId: number }>>
      >;
    }
  };
  uploadImages = async (data): Promise<AxiosResponse<UpdatedResponse>> => {
    try {
      const res = await this.instance.post("User/uploadImg", data);
      console.log(res);
      return res;
    } catch (error) {
      console.log(error);

      return {} as Promise<AxiosResponse<UpdatedResponse>>;
    }
  };
  getCountryList = async (): Promise<AxiosResponse<CountryI[]>> => {
    return this.instance.get("User/countryList");
  };
  getHomeScreenData = async (): Promise<
    AxiosResponse<MainResponse<HomeScreenI[]>>
  > => {
    try {
      return await this.instance.get("UnRegister/homeScreen");
    } catch (error) {
      store.dispatch(
        errorModal("Please try again later!", true, "Error") as any
      );
      return {} as Promise<AxiosResponse<MainResponse<HomeScreenI[]>>>;
    }
  };
  getPropertyDetails = async (
    id: number
  ): Promise<AxiosResponse<PropertyDetails>> => {
    return await this.instance.get(`UnRegister/propAllDetails/${id}`);
  };
  getPropertyPriceDetails = async (
    id: number
  ): Promise<AxiosResponse<PriceDetailsI>> => {
    return await this.instance.get(`UnRegister/increasePerYear/${id}`);
  };
  getPropertySoldHistory = async (
    id: number
  ): Promise<AxiosResponse<PropertySoldHistory>> => {
    return await this.instance.get(`property/soldHistory/${id}`);
  };
  getPropertyLocation = async (
    id: number
  ): Promise<AxiosResponse<PropertySoldHistory>> => {
    return await this.instance.get(`property/landmarks/${id}`);
  };
  getIown = async (
    userId: number,
    propertyId: number
  ): Promise<AxiosResponse<PropertySoldHistory>> => {
    return await this.instance.get(
      `property/ownedUnits/${userId}/${propertyId}`
    );
  };
}

const MUnregisterUserApiService = new MUnRegisterService();

export default MUnregisterUserApiService;
