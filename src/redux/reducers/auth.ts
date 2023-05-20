import {
  ErrorModalInterface,
  ModalType,
  OnBoardingI,
} from "@src/services/model";
import { ActionType } from "../action-types/index";
import { Action } from "../actions";
import { store } from "../store";

interface InitialState {
  id: number | string | null;
  token: string | undefined;
  loginLoader: boolean;
  signupLoader: boolean;
  forgotPasswordLoader: boolean;
  resetPasswordLoader: boolean;
  onBoardingData: OnBoardingI[];
  errorModal: ErrorModalInterface;
  navigationListener: boolean;
  showWalkthrough: boolean;
}
const initialState = {
  id: null,
  loginLoader: false,
  signupLoader: false,
  forgotPasswordLoader: false,
  resetPasswordLoader: false,
  token: undefined,
  onBoardingData: [],
  errorModal: {
    modal_type: undefined as unknown as ModalType,
    show: false,
    errorMessage: undefined,
  },
  showWalkthrough: true,
  navigationListener: false,
};
/**
 * @param  {InitialState=initialState} state
 * @param  {Action} action
 * @returns InitialState
 */
const auth = (
  state: InitialState = initialState,
  action: Action
): InitialState => {
  switch (action.type) {
    case ActionType.LOGIN:
      return { ...state, loginLoader: true };
    case ActionType.SUCCESS_LOGIN:
      return { ...state, token: action.payload, loginLoader: false };
    case ActionType.FAIL_LOGIN:
      return { ...state, loginLoader: false };
    case ActionType.SIGNUP:
      return { ...state, signupLoader: true };
    case ActionType.SIGNUP_SUCCESS:
      return { ...state, signupLoader: false };
    case ActionType.SIGNUP_FAIL:
      return { ...state, signupLoader: false };
    case ActionType.SAVE_USER_TOKEN:
      return { ...state, token: action.payload };
    case ActionType.LOGOUT:
      return { ...state, token: undefined };
    case ActionType.SHOW_WALKTHROUGH:
      return { ...state, showWalkthrough: action.payload };
    case ActionType.ONBOARDING_DATA:
      return { ...state, onBoardingData: action.payload! };
    case ActionType.REMOVE_MODAL_TYPE:
      return {
        ...state,
        errorModal: {
          show: false,
          errorMessage: "",
          modal_type: "" as ModalType,
        },
      };
    case ActionType.ERROR_MODAL:
      return {
        ...state,
        errorModal: {
          show: action.show,
          errorMessage: action.errorMessage,
          modal_type: action.modal_type,
        },
      };
    case ActionType.SHOW_WALKTHROUGH:
      return {
        ...state,
        showWalkthrough: action.payload,
      };
    case ActionType.CLOSE_ERROR_MODAL:
      return {
        ...state,
        errorModal: {
          ...state.errorModal,
          show: false,
        },
      };
    default:
      return state;
  }
};

export default auth;
