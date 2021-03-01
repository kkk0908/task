/* eslint-disable no-unused-vars */
import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

import { withRouter } from "react-router";
import { handlePageRoute } from "../../helper/navigateTo";
import routeLink from "../../constants/routeLinkConstant";
import toggleConstants from "../../action-reducer/toggle/toggleConstants";
import { useDispatch, useSelector } from "react-redux";
import { cookies } from "../../services/auth";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  active: {
    background: "#dadada"
  }
}));

function Header(props) {
  const classes = useStyles();
  const theme = useTheme();

  const dispatch = useDispatch();
  const open = useSelector((state) => state.toggle.isOpen);

  const handleDrawerToggle = () => {
    dispatch({ type: toggleConstants.Toggle, data: !open })
  };

  return props.loggedInUserData && Object.keys(props.loggedInUserData).length > 0 && (
    <div className={classes.header}>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            edge="start"
          // className={clsx(classes.menuButton, {
          //   [classes.hide]: open,
          // })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Logged User - {props.loggedInUserData.name} ({props.loggedInUserData.role})
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          {/* <IconButton onClick={handleDrawerToggle}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton> */}
        </div>
        <Divider />
        <List>
          {[
            {
              name: "Profile",
              link: routeLink.Profile,
              component: <AccountCircleIcon />,
              permissions: ['admin', 'user']
            },
            {
              name: "Manage Users",
              link: routeLink.User,
              component: <PeopleOutlineIcon />,
              permissions: ['admin']
            }, // !item.permissions.includes(auth.role) &&
          ].map((item, index) => item.permissions.includes(props.loggedInUserData.role) && (
            <ListItem
              button
              key={index}
              onClick={(e) => {
                e.preventDefault();
                handlePageRoute(item.link, props);
              }}
              className={props.match.path === item.link ? classes.active : ""}
            >
              <ListItemIcon>
                {item.component}
              </ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          <ListItem button key={"logout"} onClick={(e) => {
            e.preventDefault();
            cookies.remove("app_token")
            handlePageRoute(routeLink.Login, props);
          }}>
            <ListItemIcon>
              <PowerSettingsNewIcon></PowerSettingsNewIcon>
            </ListItemIcon>
            <ListItemText primary={"Logout"} />
          </ListItem>

        </List>
      </Drawer>
    </div>
  );
}

export default withRouter(Header);
