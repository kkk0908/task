import produce from "immer";
import userConstants from "./userConstants";

const initialState = {
  userlist: [],
  userdetails: {}
};

export const userReducer = produce((state, action) => {
  switch (action.type) {
    case userConstants.GETALL:
      state.userlist = action.data;
      break;
    case userConstants.GETBYID:
      state.userdetails = action.data;
      break;
    default: // for es-lint :/
  }
}, initialState);
