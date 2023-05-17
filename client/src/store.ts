import { combineReducers } from "redux";
import thunk from "redux-thunk";
import {
  userRegisterReducer,
  userSigninReducer,
  userDetailsReducer,
} from "./reducers/userReducers";
import { configureStore } from "@reduxjs/toolkit";

const initialState = {
  userSignin: {
    userInfo: "test",
  },
};
const reducer = combineReducers({
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
});

const store = configureStore({
  middleware: [thunk],
  reducer: reducer,
  preloadedState: initialState,
});

export default store;
