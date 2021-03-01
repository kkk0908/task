import React from "react";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import routeLink from "../../constants/routeLinkConstant";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { onSignUp } from "../../action-reducer/auth/authActions";

import UserForm from "../UserForm";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  input: {
    display: "none",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


export default function SignUp() {
  const classes = useStyles();
  const dispatch = useDispatch();

  async function submit(values, { setSubmitting }) {
    const form = new FormData();
    form.append('name', values.name)
    form.append('email', values.email)
    form.append('mobile', values.mobile)

    form.append('password', values.password)
    form.append('role', 'user')
    form.append('designation', values.designation)


    if (values.image) {
      const isNewImageUpload = values.image instanceof Blob;
      if (isNewImageUpload) {
        form.append('image', values.image)
      }
    }

    await dispatch(onSignUp(form));
    setSubmitting(false);
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <UserForm submit={submit} classes={classes} />
          <Grid container>
            <Grid item>
              <Link href={routeLink.Login} variant="body2">
                {"Don't have an account? Sign In here!"}
              </Link>
            </Grid>
          </Grid>
        </div>
      </Grid>
    </Grid>
  );
}

