import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import logger from "redux-logger";
import AsyncStorage from "@react-native-community/async-storage";
import rootReducer from "./reducers/index";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["authReducer"],
  setTimeout: null,
};

const middlewares = [
  logger,
  /* other middlewares */
];

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(
  persistedReducer,
  applyMiddleware(thunk, ...middlewares)
);
let persistor = persistStore(store);
export { store, persistor };
