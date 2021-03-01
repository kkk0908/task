// containerPath will always be relative to src

import routeLink from "../constants/routeLinkConstant";

/*
  {
    path: string,
    exact: oneOf([true, false]),
    routeComponentParent: oneOf(["containers", "components", "UIComponents", "common"]),
    routeComponentPath: string,
    isAuthenticated: oneOf([true, false])
  }
*/


const routes = {
  LOGIN: {
    path: routeLink.Login,
    exact: true,
    isAuthenticated: false,
    routeComponentParent: "components",
    routeComponentPath: "SignIn",
  },
  SIGNUP: {
    path: routeLink.SignUp,
    exact: true,
    isAuthenticated: false,
    routeComponentParent: "components",
    routeComponentPath: "SignUp",
  },

  PROFILE: {
    path: routeLink.Profile,
    exact: true,
    isAuthenticated: true,
    routeComponentParent: "components",
    routeComponentPath: "Profile",
    permissions : ['admin','user']
  },
  USER: {
    path: routeLink.User,
    exact: true,
    isAuthenticated: true,
    routeComponentParent: "components",
    routeComponentPath: "User",
    permissions : ['admin']
  },
  USEREDIT: {
    path: `${routeLink.EditProfile}/:userid`,
    exact: true,
    isAuthenticated: true,
    routeComponentParent: "components",
    routeComponentPath: "Profile",
    permissions : ['admin']
  },
  Error404: {
    path: routeLink.NonAuthPageNotFound,
    exact: true,
    isAuthenticated: true,
    routeComponentParent: "containers",
    routeComponentPath: "PageNotFound",
    permissions : ['admin','user']
  },
};


export default routes;
