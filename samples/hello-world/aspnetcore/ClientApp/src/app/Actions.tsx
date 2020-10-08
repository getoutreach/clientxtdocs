import React from "react";

import { observer } from "mobx-react-lite";

import { Grid, Typography } from "@material-ui/core";
import NotifyAction from "./NotifyAction";
import DecorateAction from "./DecorateAction";
import AuthenticateAction from "./AuhenticateAction";
import { useStyles } from "../styles/styles";

const Actions: React.FC = observer(() => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h2" color="primary" className={classes.subtitle}>
        SDK actions
      </Typography>

      <Grid container={true} className={classes.actions}>
        <Grid item={true}>
          <NotifyAction />
        </Grid>
        <Grid item={true}>
          <DecorateAction />
        </Grid>
        <Grid item={true}>
          <AuthenticateAction />
        </Grid>
      </Grid>
    </div>
  );
});

export default Actions;
