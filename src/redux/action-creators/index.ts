import { ModalType } from "@src/services/model";
import { Dispatch } from "redux";
import { ActionType } from "../action-types";
import { Action } from "../actions/index";
/**
 * @param  {string} data
 */
export const saveUserInfo = (data: string) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SAVE_USER_TOKEN,
      payload: data,
    });
  };
};
export const hideWalkThrough = () => (dispatch: Dispatch<Action>) => {
  dispatch({
    type: ActionType.SHOW_WALKTHROUGH,
    payload: false,
  });
};
export const hideLoading = () => (dispatch: Dispatch<Action>) => {
  dispatch({
    type: ActionType.SIGNUP_FAIL,
    payload: false,
  });
};
export const errorModal = (
  errorMessage: string,
  show: boolean,
  modal_type: ModalType
) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.ERROR_MODAL,
      show,
      modal_type,
      errorMessage,
    });
  };
};
export const closeErrorModal = () => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.CLOSE_ERROR_MODAL,
    });
  };
};

export const removeModalType = () => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.REMOVE_MODAL_TYPE,
    });
  };
};
