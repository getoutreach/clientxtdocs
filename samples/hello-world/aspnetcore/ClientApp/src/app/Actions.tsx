import React, { useState } from 'react';

import { observer } from 'mobx-react-lite';

import { Grid, Typography, createStyles, makeStyles, Theme, Button } from '@material-ui/core';

import AuthenticationAction from './AuthenticationAction';
import NotifyAction from './NotifyAction';
import DecorateAction from './DecorateAction';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    actionButton: {
      marginTop: theme.spacing(),
      marginBottom: theme.spacing(),
      textTransform: "none"
    },
    actions: {
      display: 'flex',
      flexDirection: 'row',
    },
    item: {
      margin: theme.spacing()
    },
    root: {
      display: 'flex',
      flexDirection: 'column',
      padding: theme.spacing(2),
      paddingBottom: 0,
    },
    subtitle: {
      fontSize: 28,
      fontWeight: 500,
    },
  })
);

const Actions: React.FC = observer(() => {

  const classes = useStyles();

  const [notificationDialog, setNotificationDialog] = useState<boolean>(false);
  const [decorationDialog, setDecorationDialog] = useState<boolean>(false);
  const [authorizationDialog, setAuthenticationDialog] = useState<boolean>(false);


  return (
    <div className={classes.root}>
      <Typography variant="h2" color="primary" className={classes.subtitle}>
        SDK actions
      </Typography>

      <Grid container={true} className={classes.actions}>
        <Grid item={true} className={classes.item}>
          <Button
            variant="outlined"
            type="submit"
            className={classes.actionButton}
            color="primary"
            onClick={e => setNotificationDialog(true)}
          >
            sdk.notify()
        </Button>
        </Grid>
        <Grid item={true} className={classes.item}>
          <Button
              autoCapitalize="false"
              variant="outlined"
              type="submit"
              className={classes.actionButton}
              color="primary"
              onClick={e => setDecorationDialog(true)}
            >
              sdk.decorate()
          </Button>
        </Grid>
        <Grid item={true} className={classes.item}>
          <Button
              variant="outlined"
              type="submit"
              className={classes.actionButton}
              color="primary"
              onClick={e => setAuthenticationDialog(true)}
            >
              sdk.getToken()
          </Button>
        </Grid>
      </Grid>
      <NotifyAction open={notificationDialog} onClose={() => setNotificationDialog(false)} />
      <DecorateAction open={decorationDialog} onClose={() => setDecorationDialog(false)} />
      <AuthenticationAction open={authorizationDialog} onClose={() => setAuthenticationDialog(false)} />
    </div>
  );
});

export default Actions;
