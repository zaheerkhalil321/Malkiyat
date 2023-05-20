import { combineReducers } from "redux";
import authReducer from "./auth";
import unregisterUser from "./unregisteruser";
import registerUser from "./registerUser";

const reducers = combineReducers({
  authReducer,
  unregisterUser,
  registerUser,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
