import React from 'react';

import { observer } from 'mobx-react-lite';

import { Grid, Typography, createStyles, makeStyles, Theme } from '@material-ui/core';
import NotifyAction from './NotifyAction';
import DecorateAction from './DecorateAction';
import AuthenticateAction from './AuhenticateAction';


export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    actions: {
      display: 'flex',
      flexDirection: 'row',
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
