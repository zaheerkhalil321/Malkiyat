import {
  BannerList,
  DocumentsI,
  HomeScreenI,
  PriceDetailsI,
  PropertyAllDataI,
  PropertyDetailI,
  PropertyDetails,
  propertySoldHistoryI,
} from "@src/services/model";
import { UnRegUserType } from "../action-types/index";

interface SaveUnRegisterData {
  type: UnRegUserType.UNREGISTER_USER_DATA;
  payload?: {
    unRegisterUserResponse: PropertyDetailI[];
    bannerList: BannerList[];
  };
}
interface GetDocumentByID {
  type: UnRegUserType.GET_DOCUMENT_BY_ID;
  payload: DocumentsI[];
}
interface GetSqftSoldHistoryById {
  type: UnRegUserType.SQFT_SOLD_HISTORY;
  payload: propertySoldHistoryI;
}
interface UnregisterHomeData {
  type: UnRegUserType.UNREGISTER_HOME_DATA;
  payload: HomeScreenI[];
}
interface UnregisterPropertyDetail {
  type: UnRegUserType.PROPERTY_DETAIL;
  payload: PropertyDetails;
}
interface UnregisterPropertyEvaluation {
  type: UnRegUserType.PROPERTY_EVALUATION;
  payload: PriceDetailsI;
}
interface UnregisterAllpropertyDetail {
  type: UnRegUserType.ALL_PROPERTY_DATA;
  payload: PropertyAllDataI;
}

export type UnRegisterUserAction =
  | SaveUnRegisterData
  | GetDocumentByID
  | GetSqftSoldHistoryById
  | UnregisterHomeData
  | UnregisterPropertyDetail
  | UnregisterPropertyEvaluation
  | UnregisterAllpropertyDetail;
