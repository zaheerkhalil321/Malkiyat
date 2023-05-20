import {
  GenerateTokenI,
  MyAdsInterface,
  PropertyDetailI,
  RefreshI,
  RegisterUserInfo,
  TransactionHistoryInfoI,
  UserPropertyInterface,
  UserTransactionHistoryI,
} from "@src/services/model";
import { RegisterUserType } from "../action-types";

interface RegisterUser {
  type: RegisterUserType.SAVE_REGISTER_USER_DATA;
  payload?: RegisterUserInfo;
}

interface getTransactionHistoryById {
  type: RegisterUserType.GET_TRANSACTION_HISTORY_BY_ID;
  payload: TransactionHistoryInfoI[];
}

interface RegisterUserBalance {
  type: RegisterUserType.USER_BALANCE_AFTER_TRANSACTION;
  payload?: number;
}
interface RefreshData {
  type: RegisterUserType.REFRESH_API;
  payload: RefreshI;
}
interface SaveSelectedTile {
  type: RegisterUserType.SAVE_SELECTED_TILE;
  payload: PropertyDetailI | undefined;
}
interface ShowModal {
  type: RegisterUserType.SHOW_MODAL;
  payload: boolean;
}
interface SaveUnits {
  type: RegisterUserType.SAVE_UNITS;
  payload?: number;
}
interface RemoveUnits {
  type: RegisterUserType.REMOVE_UNITS;
  payload?: number;
}
interface DeleteSelectedTile {
  type: RegisterUserType.DELETE_SELECTED_TILE;
}
interface RemoveUserData {
  type: RegisterUserType.REMOVE_USER_DATA;
}
interface UserPropertyData {
  type: RegisterUserType.REGISTER_USER_PROPERTY;
  payload: UserPropertyInterface;
}
interface UserPropertyTransactionHistory {
  type: RegisterUserType.REGISTER_USER_TRANSACTION_HISTORY;
  payload: UserTransactionHistoryI;
}
interface UserAds {
  type: RegisterUserType.REGISTER_USER_ADS;
  payload: MyAdsInterface[];
}
interface GenerateToken {
  type: RegisterUserType.GENERATE_TOKEN;
  payload: GenerateTokenI;
}
interface UserProfile {
  type: RegisterUserType.SAVE_USER_PROFILE_DATA;
  payload: {};
}
interface RemoveToken {
  type: RegisterUserType.REMOVE_TOKEN;
}
export type RegisterUserAction =
  | RegisterUser
  | RegisterUserBalance
  | getTransactionHistoryById
  | RefreshData
  | SaveSelectedTile
  | ShowModal
  | SaveUnits
  | DeleteSelectedTile
  | RemoveUnits
  | RemoveUserData
  | UserPropertyData
  | UserPropertyTransactionHistory
  | UserAds
  | GenerateToken
  | RemoveToken
  | UserProfile;
