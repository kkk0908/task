

const apiEndpoints = {
  LOGIN: "/login",
  SIGNUP: "/signup",
  AUTHBYTOKEN  : "user/getUserByToken",
  
  //User
  GETALLUSERS : "/user/getAllUser",
  GETBYUSERID: "/user/getUser?id=",
  UPDATEUSERBYID: "/user/editUser?id=",
  DELETEUSERBYID: "/user/deleteUser?id=",
};

export default apiEndpoints;
