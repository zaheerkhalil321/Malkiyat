import { hideLoading, hideWalkThrough } from "@src/redux/action-creators";
import { ActionType } from "@src/redux/action-types";
import { RootState } from "@src/redux/reducers";
import { useSelector } from "react-redux";
import { useSafeDispatch } from "./useSafeDispatch";

type ReturnType = [
  walkthrough: boolean,
  hideWalkThroughScreen: () => void,
  hideLoader: () => void,
  loader: boolean
];

export default (): ReturnType => {
  const walkthrough = useSelector((state: RootState) => state.authReducer);
  const dispatch = useSafeDispatch();

  const hideWalkThroughScreen = () => dispatch(hideWalkThrough());
  const hideLoader = () => dispatch(hideLoading());

  return [
    walkthrough.showWalkthrough,
    hideWalkThroughScreen,
    hideLoader,
    walkthrough.signupLoader,
  ];
};
