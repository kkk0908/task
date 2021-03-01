import sendApiRequest, { cookies } from "../../services/auth";
import apiEndpoints from "../../apiEndpoints";
import authConstants from "./authConstants";
import routeLink from "../../constants/routeLinkConstant";

export function onLogin(data) {
  return async function (dispatch) {
    const response = await sendApiRequest({
      url: apiEndpoints.LOGIN,
      method: "post",
      data
    });
    if (response.status === "success") {
      cookies.set("app_token", response.data.token, { path: "/" });
      dispatch({
        type: authConstants.LOGIN_SUCCESSFUL,
        payload: response.data.userObj
      })
      window.location.reload();
    }
  };
}

export function onSignUp(data) {
  return async function (dispatch) {
    const response = await sendApiRequest({
      url: apiEndpoints.SIGNUP,
      method: "post",
      data
    });
    // if (response.status === "success") {
    //   window.location.replace(routeLink.Login);
    // }
  };
}

export function authCheckPoint() {
  return async function (dispatch) {
    if (cookies.get('app_token')) {
      const response = await sendApiRequest({
        url: apiEndpoints.AUTHBYTOKEN,
        method: "post",
        data: {
          token: cookies.get('app_token')
        }
      });
      if (response.status === "success") {
        dispatch({
          type: authConstants.LOGIN_SUCCESSFUL,
          payload: response.data.userObj
        })
      } else {
        if (response.message === "Request failed with status code 400") {
          cookies.remove("app_token");
          window.location.replace(routeLink.Login)
          return
        }
      }
    }
  };
}

export function updateLoggedUserProfile(id, data) {
  return async function (dispatch) {
    const response = await sendApiRequest({
      url: `${apiEndpoints.UPDATEUSERBYID}${id}`,
      method: "put",
      data
    });
    if (response.status === "success") {
      dispatch({
        type: authConstants.LOGIN_SUCCESSFUL,
        payload: response.data.userObj
      })
    }
  };
}
