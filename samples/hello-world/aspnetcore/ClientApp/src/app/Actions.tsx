import { Button, Grid, Theme, Typography, createStyles, makeStyles } from '@material-ui/core';
import React, { useContext, useState } from 'react';

import AuthenticationAction from './dialogs/AuthenticationAction';
import ConfigureAction from './dialogs/ConfigureAction';
import DecorateAction from './dialogs/DecorateAction';
import EnvironmentAction from './dialogs/EnvironmentAction';
import { EventStoreContext } from '../stores/EventStore';
import JsonView from './JsonView';
import NavigateAction from './dialogs/NavigateAction';
import NotifyAction from './dialogs/NotifyAction';
import TokenAction from './dialogs/TokenAction';
import { observer } from 'mobx-react-lite';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    actionButton: {
      marginTop: theme.spacing(),
      marginBottom: theme.spacing(),
      textTransform: 'none',
    },
    actions: {
      display: 'flex',
      flexDirection: 'row',
    },
    item: {
      margin: theme.spacing(),
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
  const eventStore = useContext(EventStoreContext);

  const [environmentDialog, setEnvironmentDialog] = useState<boolean>(false);
  const [navigationDialog, setNavigationDialog] = useState<boolean>(false);
  const [notificationDialog, setNotificationDialog] = useState<boolean>(false);
  const [decorationDialog, setDecorationDialog] = useState<boolean>(false);
  const [configurationDialog, setConfigurationDialog] = useState<boolean>(false);
  const [authorizationDialog, setAuthenticationDialog] = useState<boolean>(false);
  const [tokenDialog, setTokenDialog] = useState<boolean>(false);

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
            autoCapitalize="false"
            variant="outlined"
            type="submit"
            className={classes.actionButton}
            color="primary"
            onClick={e => setNavigationDialog(true)}
          >
            sdk.navigate()
          </Button>
        </Grid>
        <Grid item={true} className={classes.item}>
          <Button
            autoCapitalize="false"
            variant="outlined"
            type="submit"
            className={classes.actionButton}
            color="primary"
            onClick={e => setEnvironmentDialog(true)}
          >
            sdk.environment()
          </Button>
        </Grid>
        {
          <Grid item={true} className={classes.item}>
            <Button
              autoCapitalize="false"
              variant="outlined"
              type="submit"
              className={classes.actionButton}
              color="primary"
              onClick={e => setConfigurationDialog(true)}
            >
              sdk.configure()
            </Button>
          </Grid>
        }
        <Grid item={true} className={classes.item}>
          <Button
            variant="outlined"
            type="submit"
            className={classes.actionButton}
            color="primary"
            onClick={e => setTokenDialog(true)}
          >
            sdk.getToken()
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
            sdk.authenticate()
          </Button>
        </Grid>
      </Grid>

      <EnvironmentAction open={environmentDialog} onClose={() => setEnvironmentDialog(false)} />
      <NavigateAction open={navigationDialog} onClose={() => setNavigationDialog(false)} />
      <NotifyAction open={notificationDialog} onClose={() => setNotificationDialog(false)} />
      <DecorateAction open={decorationDialog} onClose={() => setDecorationDialog(false)} />
      <ConfigureAction open={configurationDialog} onClose={() => setConfigurationDialog(false)} />
      <AuthenticationAction open={authorizationDialog} onClose={() => setAuthenticationDialog(false)} />
      <TokenAction open={tokenDialog} onClose={() => setTokenDialog(false)} />
      {eventStore.json && <JsonView json={eventStore.json} onClose={() => eventStore.setJson(null)} />}
    </div>
  );
});

export default Actions;
