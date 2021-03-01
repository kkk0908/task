/* eslint-disable no-mixed-operators */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Modal from "../../UIComponents/MaterialUI/Modal";
import {
  Button,
  Container,
  Typography,
  CssBaseline,
  CircularProgress,
} from "@material-ui/core";


import { CRUD, resStatus } from "../../constants";

import { setBreadCrumbList } from "../../action-reducer/breadCrumbs/breadCrumbsActions";
import routeLink from "../../constants/routeLinkConstant";
import {
  GetAllUser,
  DeleteUserById
} from "../../action-reducer/user/userActions";
import UserList from "./list";


const defaultModalProps = {
  status: false,
  title: " ",
  action: null,
  data: null,
  editmode: false,
};

function User(props) {
  const [modalProp, setModal] = useState(defaultModalProps);
  const [loader, setLoader] = useState(false);
  const [resGetAllLoaded, setRes] = useState(false);
  const userlist = useSelector((state) => state.user.userlist);

  const handleClickOpen = (e, action, title, data = null, editmode = false) => {
    e.preventDefault();
    setModal({
      status: true,
      action: action,
      title: title,
      data: data,
      editmode: editmode,
    });
  };

  const handleClose = () => {
    setModal(defaultModalProps);

  };

  const dispatch = useDispatch();


  async function DeleteUserByIdData() {
    const status = await dispatch(DeleteUserById(modalProp.data));
   if (status === resStatus.SUCCESS) {
      setLoader(false);
      handleClose();
    }
  }


  useEffect(() => {
    async function getData() {
      const status = await dispatch(GetAllUser());
      if (status === resStatus.SUCCESS) {
        setRes(true);
      }
    }
    getData();

    const breadCrumbDataList = [
      {
        label: "Manage User",
        link: routeLink.User,
      },
    ];

    dispatch(setBreadCrumbList(breadCrumbDataList));
    return () => {
      dispatch(setBreadCrumbList([]));
    };
  }, []);

  return (
    <>
      {resGetAllLoaded ? (
        userlist && userlist.length > 0 ? userlist.length - 1 > 0 ? (
          <>

            <UserList handleClickOpen={handleClickOpen} {...props} />
          </>
        ) : "No User" : ""
      ) : (
          "Please Wait Loading..."
        )}

      {modalProp.action === CRUD.DELETE && (
        <Modal
          open={modalProp.status}
          onClose={handleClose}
          maxWidth={"lg"}
          buttons={
            <>
              <Button autoFocus onClick={handleClose}>
                Cancle
              </Button>
              <Button
                autoFocus
                onClick={(e) => {
                  e.preventDefault();
                  setLoader(true);
                  DeleteUserByIdData();
                }}
                color="primary"
              >
                {loader && <CircularProgress size={15} />} &nbsp; Delete
              </Button>
            </>
          }
          title={modalProp.title}
        >
          <Container component="main" maxWidth="lg">
            <CssBaseline />
            <div>
              <Typography gutterBottom>
                Do you really want to delete this user ?
              </Typography>

            </div>
          </Container>
        </Modal>
      )}
    </>
  );
}

export default withRouter(User);
