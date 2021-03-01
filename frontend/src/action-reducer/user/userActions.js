/* eslint-disable no-unused-vars */
import sendApiRequest from "../../services/auth";
import apiEndpoints from "../../apiEndpoints";
import userConstants from "./userConstants";
import { history } from "../../helper/history";
import routeLink from "../../constants/routeLinkConstant";
// import { handlePageRoute } from "../../helper/navigateTo";
// import routeLink from "../../constants/routeLinkConstant";


export function GetUserById(id) {
  return async function (dispatch) {
    const response = await sendApiRequest({
      url: `${apiEndpoints.GETBYUSERID}${id}`,
      method: "get",
    });
    if (response.status === "success") {
      dispatch({
        type: userConstants.GETBYID,
        data: response.data.userObj,
      })
    } else {
     window.location.replace(routeLink.User);
    }
  };
}

export function UpdateUserById(id, data) {
  return async function (dispatch) {
    const response = await sendApiRequest({
      url: `${apiEndpoints.UPDATEUSERBYID}${id}`,
      method: "put",
      data
    });
    if (response.status === "success") {
      dispatch(GetAllUser());
    }

    return await response.status
  };
}

export function DeleteUserById(id) {
  return async function (dispatch) {
    const response = await sendApiRequest({
      url: `${apiEndpoints.DELETEUSERBYID}${id}`,
      method: "delete",
    });
    if (response.status === "success") {

      dispatch(GetAllUser());
    }

    return await response.status
  };
}


export function GetAllUser() {
  return async function (dispatch) {
    const response = await sendApiRequest({
      url: `${apiEndpoints.GETALLUSERS}`,
      method: "get",
    });
    if (response.status === "success") {
      dispatch({
        type: userConstants.GETALL,
        data: response.data.users,
      });
    }
    return await response.status
  };
}