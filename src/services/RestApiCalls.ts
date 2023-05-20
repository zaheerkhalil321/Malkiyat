import { Alert } from "react-native";
import * as RootNavigation from "../helpers/NavigationService";
import { store } from "../redux";
import { UnRegUserType } from "../redux/action-types";
import { getCacheData, removeCacheData } from "../utils/cacheFunc";
import MUnregisterUserApiService from "./MUnregisterUserApiService";

const fetchHomeData = async () => {
  try {
    const response = await MUnregisterUserApiService.getHomeScreenData();

    store.dispatch({
      type: UnRegUserType.UNREGISTER_HOME_DATA,
      payload: response.data?.data,
    });
  } catch (error) {
    console.log(error);
  }
};
export { fetchHomeData };

async function handleDocumentsUpload(cnic?: string) {
  const imgObj: {
    userId: string | number;
    selfieImg: string | undefined;
    cnicFrontImg: string | undefined;
    cnicBackImg: string | undefined;
    cnicNo: string | undefined;
    countryId: number | undefined;
  } = {
    userId: store.getState().registerUser.registerUserData?.userInfo?.userId!,
    selfieImg: getCacheData()["selfieImg"]?.img ?? "null",
    cnicFrontImg: getCacheData()["cnicFrontImg"]?.img ?? "null",
    cnicBackImg: getCacheData()["cnicBackImg"]?.img ?? "null",
    cnicNo: cnic ? String(cnic).replace(/-/g, "") : "null",
    countryId: 1, //! HARD CODED VALUE
  };

  const res = await MUnregisterUserApiService.uploadImages(imgObj);

  if (res.status == 200) {
    removeCacheData();
    return true;
  }

  return false;
}

export { handleDocumentsUpload };
