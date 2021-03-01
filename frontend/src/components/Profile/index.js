import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, withRouter } from "react-router";
import { updateLoggedUserProfile } from "../../action-reducer/auth/authActions";
import { setBreadCrumbList } from "../../action-reducer/breadCrumbs/breadCrumbsActions";
import { GetUserById } from "../../action-reducer/user/userActions";
import routeLink from "../../constants/routeLinkConstant";
import { handlePageRoute } from "../../helper/navigateTo";
import UserForm from "../UserForm";

function Profile(props) {
  const dispatch = useDispatch()
  const userdata = useSelector(state => state)
  const params = useParams()
  console.log(params.userid, props.match.path);
  useEffect(() => {
    const breadCrumbDataList = [
      {
        label: "Profile",
        //link: routeLink.Subject,
      },
    ];
    if ('/edit/:userid' === props.match.path || '/' === props.match.path) {
      if (params.userid) {
        dispatch(GetUserById(params.userid));
      } else {
        //handlePageRoute(`${routeLink.User}`, props)
      }
    } else {
      handlePageRoute(`${routeLink.User}`, props)
    }
    dispatch(setBreadCrumbList(breadCrumbDataList));
    return () => {
      dispatch(setBreadCrumbList([]));
    };
  }, []);


  async function submit(values, { setSubmitting }) {
    const form = new FormData();
    form.append('name', values.name)
    form.append('email', values.email)
    form.append('mobile', values.mobile)

    form.append('password', values.password)
    form.append('designation', values.designation)
    form.append('role', 'user')
    if (values.image) {
      const isNewImageUpload = values.image instanceof Blob;
      if (isNewImageUpload) {
        form.append('image', values.image)
      }
    }

    await dispatch(updateLoggedUserProfile(values._id, form));
    setSubmitting(false);
  }

  let currentUserData = '/edit/:userid' === props.match.path ? userdata.user.userdetails : userdata.auth.userData
  return Object.keys(currentUserData).length > 0 && <UserForm userdata={currentUserData} submit={submit}></UserForm>
};

export default withRouter(Profile);