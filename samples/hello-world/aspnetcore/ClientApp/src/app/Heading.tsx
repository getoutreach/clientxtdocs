import React from 'react';

import { observer } from 'mobx-react-lite'

import { makeStyles } from '@material-ui/core/styles';

import { createStyles, Theme, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      heading: {
        paddingBottom: 0,
      },
      subtitle: {
        
      },
      root: {
        display: "flex",
        flexDirection: "column",
        padding: theme.spacing(2),
        paddingBottom: 0,
      },
    })
);

const Heading: React.FC = observer(() =>   {

  const classes = useStyles();

  return <div className={classes.root}>
      <Typography variant="h4" className={classes.heading}>
        Hello World - Client extensibility demo addon
      </Typography>
      <Typography variant="subtitle1" className={classes.subtitle}>
        <em>This is a demo addon where you can see how the addon gets initialized, 
        what events are sent and received, 
        and try out supported actions: authenticate, notify, and decorate.</em>
      </Typography>
  </div>;
});

export default Heading;
