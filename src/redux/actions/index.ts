import { ModalType, OnBoardingI } from "@src/services/model";
import { ActionType } from "../action-types/index";

interface SaveUserInfoA {
  type: ActionType.SAVE_USER_TOKEN;
  payload?: string;
}

interface Login {
  type: ActionType.LOGIN | ActionType.SUCCESS_LOGIN | ActionType.FAIL_LOGIN;
  payload?: any;
}
interface Signup {
  type:
    | ActionType.SIGNUP
    | ActionType.SIGNUP_SUCCESS
    | ActionType.SIGNUP_FAIL
    | ActionType.LOGOUT;
  payload?: any;
}

interface OnboardingData {
  type: ActionType.ONBOARDING_DATA;
  payload?: OnBoardingI[];
}
interface ErrorModal {
  type: ActionType.ERROR_MODAL;
  modal_type: ModalType;
  show: boolean;
  errorMessage: string;
}
interface CloseErrorModal {
  type: ActionType.CLOSE_ERROR_MODAL;
}
interface ShowWalkThrough {
  type: ActionType.SHOW_WALKTHROUGH;
  payload: boolean;
}
interface RemoveModalType {
  type: ActionType.REMOVE_MODAL_TYPE;
}

export type Action =
  | SaveUserInfoA
  | Login
  | Signup
  | OnboardingData
  | ErrorModal
  | CloseErrorModal
  | RemoveModalType
  | ShowWalkThrough;
