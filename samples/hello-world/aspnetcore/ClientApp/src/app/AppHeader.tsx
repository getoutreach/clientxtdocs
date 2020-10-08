import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import { useStyles } from "../styles/styles";

const AppHeader = () => {
  const classes = useStyles();

  return (
    <AppBar>
      <Toolbar>
        <Typography variant="h1" className={classes.heading}>
          Hello World
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
