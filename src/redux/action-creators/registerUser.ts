import { Dispatch } from "redux";
import { TransactionHistoryInfoI } from "@src/services/model";
import { RegisterUserType } from "../action-types";
import { RegisterUserAction } from "../actions/registeruser";
/**
 * @param  {TransactionHistoryInfoI[]} data
 */

export const saveTransactionHistoryById = (data: TransactionHistoryInfoI[]) => {
  return (dispatch: Dispatch<RegisterUserAction>) => {
    dispatch({
      type: RegisterUserType.GET_TRANSACTION_HISTORY_BY_ID,
      payload: data,
    });
  };
};

export const saveToken = (data) => {
  return (dispatch: Dispatch<RegisterUserAction>) => {
    dispatch({
      type: RegisterUserType.GENERATE_TOKEN,
      payload: data,
    });
  };
};
export const removeToken = () => {
  return (dispatch: Dispatch<RegisterUserAction>) => {
    dispatch({ type: RegisterUserType.REMOVE_TOKEN });
  };
};
