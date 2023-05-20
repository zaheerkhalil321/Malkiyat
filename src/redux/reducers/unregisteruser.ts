import {
  PropertyDetailI,
  DocumentsI,
  propertySoldHistoryI,
  BannerList,
  HomeScreenI,
  PropertyDetails,
  PriceDetailsI,
  PropertyAllDataI,
} from "@src/services/model";
import { UnRegUserType } from "../action-types/index";
import { UnRegisterUserAction } from "../actions/unregisteruser";

interface InitialState {
  propertyDetail: PropertyDetailI[] | undefined;
  documentDetail: DocumentsI[] | undefined;
  propertySoldHisotry: propertySoldHistoryI | undefined;
  bannerList: BannerList[] | undefined;
  homeData: HomeScreenI[];
  propertyDetails: PropertyDetails | {};
  propertyEvaluation: PriceDetailsI;
  propertyAllData: PropertyAllDataI;
}

const initialState = {
  propertyDetail: [],
  documentDetail: [],
  propertySoldHisotry: undefined,
  bannerList: [],
  homeData: [],
  propertyDetails: {} as PropertyDetailI,
  propertyEvaluation: {} as PriceDetailsI,
  propertyAllData: {} as PropertyAllDataI,
};

const unregisterUser = (
  state: InitialState = initialState,
  action: UnRegisterUserAction
): InitialState => {
  switch (action.type) {
    case UnRegUserType.UNREGISTER_USER_DATA:
      return {
        ...state,
        propertyDetail: action.payload?.unRegisterUserResponse,
        bannerList: action.payload?.bannerList,
      };

    case UnRegUserType.GET_DOCUMENT_BY_ID:
      return { ...state, documentDetail: action.payload };

    case UnRegUserType.SQFT_SOLD_HISTORY:
      return { ...state, propertySoldHisotry: action.payload };
    case UnRegUserType.UNREGISTER_HOME_DATA:
      return { ...state, homeData: action.payload };
    case UnRegUserType.PROPERTY_DETAIL:
      return { ...state, propertyDetails: action.payload };
    case UnRegUserType.PROPERTY_EVALUATION:
      return { ...state, propertyEvaluation: action.payload };
    case UnRegUserType.ALL_PROPERTY_DATA:
      return { ...state, propertyAllData: action.payload };
    default:
      return state;
  }
};

export default unregisterUser;
