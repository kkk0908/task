import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import Header from "./header";
import {
  Grid,
  Breadcrumbs,
  Divider,
  Typography,
  withStyles,
  Link,
} from "@material-ui/core";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { useSelector } from "react-redux";
import { handlePageRoute } from "../../helper/navigateTo";
import { withRouter } from "react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
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
  breadCrumb: {
    background: "#dcdcdcb8",
    padding: "10px",
    borderRadius: "5px",
  },
}));

function Layout(props) {
  const { children } = props;
  const classes = useStyles();
  const breadcrumbLinks = useSelector(
    (state) => state.breadCrumbs.breadcrumbLinks
  );

  const BindBreadCrumb = withStyles(useStyles)((props) => {
    const { idx, label, link, totalLinkCount } = props;

    if (totalLinkCount === 1) {
      return (
        <Typography variant="h6" color="textPrimary">
          {label}
        </Typography>
      );
    }

    if (idx + 1 < totalLinkCount) {
      return (
        <Link
          color="inherit"
          onClick={(e) => {
            e.preventDefault();
            handlePageRoute(link, props);
          }}
          style={{cursor:"pointer"}}
        >
          <Typography color="textPrimary" variant={"h6"}>
            {label}
          </Typography>
        </Link>
      );
    } else {
      return <Typography variant="h6">{label}</Typography>;
    }
  });

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header {...props}></Header>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Grid container xs={12} sm={12} md={12} className={classes.breadCrumb}>
          <Breadcrumbs
            maxItems={2}
            aria-label="breadcrumb"
            separator={<NavigateNextIcon fontSize="small" />}
          >
            {breadcrumbLinks && breadcrumbLinks.length > 0 ? (
              breadcrumbLinks.map((item, idx) => {
                return (
                  <BindBreadCrumb
                    idx={idx}
                    label={item.label}
                    link={item.link}
                    totalLinkCount={breadcrumbLinks.length}
                    {...props}
                  ></BindBreadCrumb>
                );
              })
            ) : (
              <Typography variant="h6">{"Heading"}</Typography>
            )}
          </Breadcrumbs>
        </Grid>
        <Divider></Divider>
        <br></br>
        {children}
      </main>
    </div>
  );
}

export default withRouter(Layout);
