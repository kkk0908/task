import React, { useEffect } from "react";
import { Switch } from "react-router-dom";
import routes from "./routeConstants";
import CommonRoute from "./CommonRoute";
import PrivateRoute from "./PrivateRoute";
import LoadRoute from "./LoadRoute";
import { useDispatch, useSelector } from "react-redux";
import { authCheckPoint } from "../action-reducer/auth/authActions";

function Routes(props) {
  return (
    <Switch>
      {Object.keys(routes).map(routeKey => {
        return !routes[routeKey].isAuthenticated ? (
          <CommonRoute
            key={routeKey}
            render={LoadRoute}
            importPath={routes[routeKey].path}
            {...routes[routeKey]}
          />
        ) :
     <PrivateRoute
            key={routeKey}
            render={LoadRoute}
            importPath={routes[routeKey].path}
            {...routes[routeKey]}
            
            //role="admin"
          />
      })}
    </Switch>
  );
}

export default Routes;
