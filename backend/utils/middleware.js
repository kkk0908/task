const formidable = require("formidable");
const middleware = {};
const httpStatus = require("../constants/customHttpStatus")
const jwtHandler = require("../utils/jwtHandler")
const tokenModelMethod = require("../models/token")


const formOptions = {
  maxFileSize: 10 * 2000 * 2000,
};

middleware.auth = async (request, response, next) => {
  console.log("inside auth", request.body);
  try {
    if (request.header("Authorization")) {
      const token = request.header("Authorization").replace("Bearer ", "");
      if (!token) {
        return response.status(400).send("access Denied");
      }
      const payload = jwtHandler.validateJWT(token);
      // validating token as well as whether user logout or not
      console.log(payload._doc);
      if (payload && (await tokenModelMethod.getToken(payload._doc.email, token))) {
        payload.token = token;
        request.user = payload;
        return next();
      }
      return response.status(httpStatus.BAD_REQUEST.status).json({
        ...httpStatus.BAD_REQUEST,
        message: "Invalid Token !",
      });
    } else {
      return response.status(httpStatus.BAD_REQUEST.status).json({
        ...httpStatus.BAD_REQUEST,
        message: "Token Missing",
      });
    }
  } catch (err) {
    if (err.name.startsWith("Token")) {
      return response.status(httpStatus.BAD_REQUEST.status).json({
        ...httpStatus.BAD_REQUEST,
        message: err.message,
      });
    }
    return response.status(httpStatus.INTERNAL_SERVER_ERROR.status).json({
      ...httpStatus.INTERNAL_SERVER_ERROR,
      error: err.message,
    });
  }
};

middleware.formidable = (request, response, next) => {
  try {
    const contentType = request.headers["content-type"];
    if (!contentType || contentType.startsWith("multipart/form-data")) {
      const form = new formidable.IncomingForm({ multiples: true });
      form.maxFileSize = formOptions.maxFileSize;
      form.parse(request, (err, fields, files) => {
        if (err) throw err;
        else {
          request.body = {
            fields,
            files,
          };
          return next();
        }
      });
    } else next();
  } catch (err) {
    console.log(err.name);
    response.status(500).json({
      error: {
        ...err,
      },
      message: "form parse error",
    });
  }
};

module.exports = middleware;
