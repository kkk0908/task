import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
import routeLink from "../../constants/routeLinkConstant";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { onSignUp } from "../../action-reducer/auth/authActions";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import CardContent from "@material-ui/core/CardContent";
import MuiPhoneNumber from "material-ui-phone-number";
import Fab from "@material-ui/core/Fab";
import ThumbAvtar from "../ThumbAvtar";
import { FLASK_PORT } from "../../constants/portConstants";
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const img = require("../../assets/img/user.png");

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

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(2, "Minimum length should be 5."),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .required("No password provided.")
    .min(5, "Password is too short - should be 5 chars minimum."),
  mobile: Yup.string()
    //.matches(phoneRegExp, "Phone number is not valid")
    .required("Must enter a phone number"),
  //image: Yup.mixed().required("Profile pic is required."),
  designation: Yup.string().required("No password provided."),
});



function UserForm(props) {
  const classes = useStyles();
  return <Formik
    initialValues={props.userdata}
    validationSchema={validationSchema}
    onSubmit={(values, { setSubmitting }) => {
      props.submit(values, { setSubmitting });
    }}
  >
    {({
      values,
      isSubmitting,
      handleChange,
      touched,
      errors,
      setFieldValue,
    }) => (
      <Form className={classes.form}>
        <CardContent>
          <Grid container justify="center" alignItems="baseline">
            {values.image instanceof Blob ?
              <ThumbAvtar file={values.image} /> : <Avatar
                src={values.image ? `${FLASK_PORT}static/${values.image}` : img}
                style={{ height: "100px", width: "100px", border: '1px' }}
              />
            }
            <input
              accept="image/*"
              className={classes.input}
              id="filimage"
              multiple={false}
              type="file"
              onChange={(event) => {
                setFieldValue("image", event.currentTarget.files[0]);
              }}
            />
            <label
              htmlFor="filimage"
              style={{ marginLeft: -33 }}
            >
              <Fab component="span" className={classes.button}>
                <AddPhotoAlternateIcon />
              </Fab>
            </label>
          </Grid>
        </CardContent>
        <Field
          component={TextField}
          name="name"
          type="text"
          label="Name"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          autoComplete="name"
          autoFocus
        />

        <Field
          component={TextField}
          name="designation"
          type="text"
          label="Designation"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          autoComplete="designation"
        />

        <MuiPhoneNumber
          id="mobile"
          label="Phone Number"
          defaultCountry={"in"}
          variant="filled"
          onChange={handleChange("mobile")}
          value={values.mobile}
          className={
            touched.mobile && errors.mobile ? "has-error" : null
          }
          fullWidth
          required
        />
        {/* <Error
        touched={touched.mobile}
        message={errors.mobile}
      /> */}

        <Field
          component={TextField}
          name="email"
          type="email"
          label="Email"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          autoComplete="email"
        />

        <Field
          type="password"
          name="password"
          component={TextField}
          label="Password"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          id="password"
          autoComplete="current-password"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          disabled={isSubmitting}
        >
          Submit
      </Button>
        {/* <Grid container>
          <Grid item>
            <Link href={routeLink.SignUp} variant="body2">
              {"Don't have an account? Sign In here!"}
            </Link>
          </Grid>
        </Grid> */}
      </Form>
    )}
  </Formik>
};

UserForm.defaultProps = {
  submit: () => { },
  userdata : {
    email: "",
    password: "",
    mobile: "+91",
    designation: "",
    image: null,
    name: "",
  }
}

export default UserForm;