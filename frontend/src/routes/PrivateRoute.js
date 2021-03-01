import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { cookies } from "../services/auth";
import Layout from "../common/Layout";
import routeLink from "../constants/routeLinkConstant";
import { useDispatch, useSelector } from "react-redux";
import { authCheckPoint } from "../action-reducer/auth/authActions";

function PrivateRoute({ render: Component, ...rest }) {

  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)//userData
  useEffect(() => {

    if (auth.isloaded === false) {
      dispatch(authCheckPoint())
    }
    return () => {

    }
  }, [auth.isloaded])

  console.log('dd', auth.userData);
  function Admin(props) {
    // auth.userData.role
    if (auth.userData && auth.userData.role) {
      if (!props.permissions.includes(auth.userData.role)) {
        return (
          <Redirect
            to={{
              pathname: routeLink.NotAuthorized,
              state: { from: props.location },
            }}
          />
        );
      }
    }
    return <Layout loggedInUserData={auth.userData}>
      <Component {...props} {...rest} loggedInUserData={auth.userData} />
    </Layout>
  }

  function renderComponent(props) {
    return cookies.get('app_token') ? (
      <>
        <Admin {...props} {...rest}></Admin>
      </>
    ) : (
        <Redirect to={routeLink.Login} />
      );
  }
  return <Route {...rest} render={renderComponent} />;
}

export default PrivateRoute;
