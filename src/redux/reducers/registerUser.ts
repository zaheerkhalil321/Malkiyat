import { isTabletMode } from "react-native-device-info";
import {
  GenerateTokenI,
  MyAdsInterface,
  PropertyDetailI,
  RegisterUserInfo,
  TransactionHistoryInfoI,
  UserPropertyInterface,
  userTransactionGroupBy,
  UserTransactionHistoryI,
  userTransactions,
} from "@src/services/model";
import _ from "lodash";

import { RegisterUserType } from "../action-types/index";
import { RegisterUserAction } from "../actions/registerUser";

interface InitialState {
  registerUserData: RegisterUserInfo;
  TransictionHistoryById: TransactionHistoryInfoI[] | undefined;
  selectedTileData: PropertyDetailI;
  userPropertyData: UserPropertyInterface;
  showModal: boolean;
  UserTransactionHistory: UserTransactionHistoryI | undefined;
  filteredTransactions: {
    filteredWallet: userTransactions[];
    filterSQFT: userTransactions[];
    All: userTransactions[];
  };
  userAdsData: MyAdsInterface[];
  token: GenerateTokenI;
  userProfileData: {};
}

const initialState = {
  registerUserData: {} as RegisterUserInfo,
  TransictionHistoryById: undefined,
  selectedTileData: {} as PropertyDetailI,
  userPropertyData: {} as UserPropertyInterface,
  showModal: false,
  UserTransactionHistory: {} as UserTransactionHistoryI,
  filteredTransactions: {
    filteredWallet: [],
    filterSQFT: [],
    All: [],
  },
  userAdsData: [],
  token: {} as GenerateTokenI,
};
const registerUser = (
  state: InitialState = initialState,
  action: RegisterUserAction
): InitialState => {
  switch (action.type) {
    case RegisterUserType.SAVE_REGISTER_USER_DATA:
      let updatedUser = state.registerUserData;
      updatedUser = action.payload!;
      return { ...state, registerUserData: { ...updatedUser } };
    case RegisterUserType.REMOVE_USER_DATA:
      return {
        ...state,
        registerUserData: {} as RegisterUserInfo,
        selectedTileData: {} as PropertyDetailI,
      };
    case RegisterUserType.GET_TRANSACTION_HISTORY_BY_ID:
      return { ...state, TransictionHistoryById: action?.payload };
    // case RegisterUserType.USER_BALANCE_AFTER_TRANSACTION:
    //   let userData = state.registerUserData;
    //   userData!.amount!.walletBalance = action.payload;
    //   return { ...state, registerUserData: userData };
    case RegisterUserType.REFRESH_API:
      let updateUserBalance = state.registerUserData;
      updateUserBalance.propertiesData.data.balance = action.payload?.balance;
      updateUserBalance.propertiesData.data.currentValue =
        action.payload?.currentValue;
      updateUserBalance.propertiesData.data.KycStatus =
        action.payload.KycStatus;
      updateUserBalance.liveTransactions = action.payload?.lastTransaction;
      updateUserBalance.propertiesData.data.ownedSmallerUnits =
        action.payload?.ownedSmallerUnits;
      updateUserBalance.propertiesData.data.profit = action.payload?.profit;
      updateUserBalance.propertiesData.data.date = action.payload.date;

      return { ...state, registerUserData: updateUserBalance };
    case RegisterUserType.REGISTER_USER_PROPERTY:
      var updateDate = action.payload;
      updateDate.data.propertiesList =
        updateDate.data?.propertiesList?.map((item, i) => ({
          ...item,
          key: `${i}`,
        })) ?? {};
      return { ...state, userPropertyData: updateDate };

    case RegisterUserType.SAVE_SELECTED_TILE:
      return {
        ...state,
        selectedTileData: {
          ...action.payload!,
          units: state.selectedTileData?.units,
        },
      };
    case RegisterUserType.REGISTER_USER_TRANSACTION_HISTORY:
      return {
        ...state,
        UserTransactionHistory: action.payload,
        filteredTransactions: {
          filteredWallet: action.payload?.userTransactions?.filter(
            (item) => item.category == "cashin" || item.category == "withdraw"
          ),
          filterSQFT: action.payload?.userTransactions?.filter(
            (item) => item?.category == "sold" || item?.category == "bought"
          ),
          All: action.payload?.userTransactions.map((item, index) => ({
            ...item,
            id: index,
          })),
        },
      };
    case RegisterUserType.SAVE_UNITS:
      return {
        ...state,
        selectedTileData: {
          ...state.selectedTileData,
          units: action.payload,
        },
      };

    case RegisterUserType.SHOW_MODAL:
      return { ...state, showModal: action.payload };
    case RegisterUserType.DELETE_SELECTED_TILE:
      return {
        ...state,
        selectedTileData: {} as PropertyDetailI,
        registerUserData: {} as RegisterUserInfo,
        TransictionHistoryById: [],
        userPropertyData: {} as UserPropertyInterface,
        UserTransactionHistory: {} as UserTransactionHistoryI,
        filteredTransactions: { filteredWallet: [], filterSQFT: [], All: [] },
        userAdsData: [],
        token: {} as GenerateTokenI,
      };
    case RegisterUserType.REMOVE_UNITS:
      return {
        ...state,
        selectedTileData: {
          ...state.selectedTileData,
          units: 0,
        },
      };
    case RegisterUserType.GENERATE_TOKEN:
      return { ...state, token: action.payload };
    case RegisterUserType.REGISTER_USER_ADS:
      return { ...state, userAdsData: action.payload };
    case RegisterUserType.REMOVE_TOKEN:
      return { ...state, token: {} as GenerateTokenI };
    case RegisterUserType.SAVE_USER_PROFILE_DATA:
      return {
        ...state,
        userProfileData: action.payload,
        registerUserData: {
          ...state.registerUserData,
          userInfo: {
            ...state.registerUserData.userInfo,
            profilePic: action.payload.picture,
            email: action.payload.email,
            address: action.payload.address,
          },
        },
      };
    default:
      return state;
  }
};
export default registerUser;
