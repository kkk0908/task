import produce from "immer";
import toggleConstants from "./toggleConstants";

const initialState = {
  // Keep your initial state object for toggle here 
   isOpen : false
};;

export const toggleReducer = produce((state, action) => {
  // Don't return anything from here
  // Just make changes in the state object and add a break in the end for each case.
  // Immer's produce will automatically return the state object.
  // Refer to https://immerjs.github.io/immer/docs/introduction for more information

  switch (action.type) {
    case toggleConstants.Toggle : 
    state.isOpen =  action.data
    break;
    default: // Adding default due to es-lint
  }
}, initialState);