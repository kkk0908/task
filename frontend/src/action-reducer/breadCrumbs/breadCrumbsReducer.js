import produce from "immer";
import breadCrumbsConstants from "./breadCrumbsConstants";

const initialState = {
  // Keep your initial state object for breadCrumbs here 
  breadcrumbLinks : null,
};;

export const breadCrumbsReducer = produce((state, action) => {
  // Don't return anything from here
  // Just make changes in the state object and add a break in the end for each case.
  // Immer's produce will automatically return the state object.
  // Refer to https://immerjs.github.io/immer/docs/introduction for more information

  switch (action.type) {
    case breadCrumbsConstants.UPDATE:
    state.breadcrumbLinks =  action.breadcrumbLinks;  
    break;
    default: 
  }
}, initialState);