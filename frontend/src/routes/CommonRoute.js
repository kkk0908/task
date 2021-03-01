/*
    Redirect to /home if logged in otherwise open the given route
*/

import React from "react";
import { Route, Redirect } from "react-router-dom";
import { cookies } from "../services/auth";
import routeLink from "../constants/routeLinkConstant";

function CommonRoute({ render: Component, ...rest }) {
  function renderComponent(props) {
    return cookies.get('app_token') ? (
      <Redirect to={{ pathname: routeLink.Profile, state: { from: props.location } }} />
    ) : (
        <Component {...props} {...rest} />
      );
  }

  return <Route {...rest} render={renderComponent} />;
}

export default CommonRoute;
