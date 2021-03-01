/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import "./main.css";
import { useSelector } from "react-redux";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import { Button, Hidden } from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { CRUD } from "../../constants";
import routeLink from "../../constants/routeLinkConstant";
import { handlePageRoute } from "../../helper/navigateTo";
import { withRouter } from "react-router";

function UserList(props) {

  const { handleClickOpen } = props;
  const userlist = useSelector((state) => state.user.userlist);
  return (
    <>
      <div class="table-wrapper">
        <table class="fl-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Designation</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {userlist.map((item, idx) => !item._id.includes(props.loggedInUserData._id) && (
              <tr key={idx}>
                <td data-label="Name">{item.name}</td>
                <td data-label="Designation">{item.designation}</td>
                <td data-label="Actions">
                  <Hidden smDown>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<CreateOutlinedIcon />}
                      size="small"
                      onClick={(e) =>
                        handlePageRoute(`${routeLink.EditProfile}/${item._id}`, props)
                      }
                    >
                      Edit
                    </Button>
                    &nbsp;
                    <Button
                      variant="contained"
                      color="secondary"
                      startIcon={<DeleteIcon />}
                      size="small"
                      onClick={(e) =>
                        handleClickOpen(
                          e,
                          CRUD.DELETE,
                          "Delete",
                          item._id
                        )
                      }
                    >
                      Delete
                    </Button>
                  </Hidden>
                  <Hidden smUp>
                    <CreateOutlinedIcon
                      variant="contained"
                      color="primary"
                      onClick={(e) =>
                        handlePageRoute(`${routeLink.EditProfile}/${item._id}`, props)
                      }
                    />
                    &nbsp;
                    <DeleteIcon
                      variant="contained"
                      color="secondary"
                      onClick={(e) =>
                        handleClickOpen(
                          e,
                          CRUD.DELETE,
                          "Delete",
                          item._id
                        )
                      }
                    />
                  </Hidden>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default withRouter(UserList);
