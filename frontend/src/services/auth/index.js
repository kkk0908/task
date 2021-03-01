import { Cookies } from "react-cookie";
import axios from "axios";
import { FLASK_PORT } from "../../constants/portConstants";
import { resStatus } from "../../constants";
import AlertNotification from "../../common/AlertNotification";
import { toast } from "react-toastify";
import routeLink from "../../constants/routeLinkConstant";

export const cookies = new Cookies();

axios.defaults.baseURL = FLASK_PORT;
axios.defaults.headers.common.Authorization = cookies.get(
  "app_token"
);
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

export const config = {
  headers: {
    Authorization: cookies.get("app_token"),
    "Content-Type": "application/json",
  },
};

export const fileConfig = {
  headers: {
    Authorization: cookies.get("app_token"),
    "Content-Type": "multipart/form-data",
  },
};

function generateAPIErrorMessage(exception) {
  return exception.message;
}

const Alert = (config, msg, status) => {
  // if (
  //   msg !== ""
  //   // &&
  //   //config.method !== "get" &&
  //   //typeof msg !== "boolean" &&
  //   //config.url !== "/login"
  //) {
  AlertNotification(msg, status, toast.POSITION.TOP_RIGHT);
  // }
};


export default async function sendApiRequest(apiParams) {
  try {
    const response = await axios(apiParams);
    if (response.data.status === 200) {
      Alert(response.config, response.data.message, toast.TYPE.SUCCESS);
      return { status: resStatus.SUCCESS, data: response.data };
    } else {
      const errorObject = {
        status: resStatus.ERROR,
        message: generateAPIErrorMessage(response),
        exceptionObject: response,
      };
      Alert(response.config, response.data.message, toast.TYPE.ERROR);
      return errorObject;
    }
  } catch (exception) {
    const errorObject = {
      status: resStatus.ERROR,
      message: generateAPIErrorMessage(exception),
      exceptionObject: exception,
    };
    if (exception.message === "Request failed with status code 400") {
      cookies.remove("app_token");
      window.location.replace(routeLink.Login)
      return errorObject;
    }
    Alert(
      errorObject.exceptionObject.config,
      errorObject.exceptionObject.response === undefined
        ? "Error"
        : errorObject.exceptionObject.response.data.message,

      toast.TYPE.ERROR
    );
    return errorObject;
  }
}
