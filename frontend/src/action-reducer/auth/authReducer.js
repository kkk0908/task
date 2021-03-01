import produce from "immer";
import authConstants from "./authConstants";
import { cookies } from "../../services/auth";

const initialState = {
  isLoggedIn: !!cookies.get("SID"),
  userData: null,
  isloaded: false
};

export const authReducer = produce((state, action) => {
  switch (action.type) {
    case authConstants.LOGIN_SUCCESSFUL:
      return {
        ...state, isLoggedIn: true,
        userData: action.payload,
        isloaded: true
      }

    case authConstants.LOGOUT_SUCCESSFUL:
      state.isLoggedIn = false;
      break;

    default: // for es-lint :/
  }
}, initialState);
