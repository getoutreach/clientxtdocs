import React from 'react';

import { observer } from 'mobx-react-lite'

import { makeStyles } from '@material-ui/core/styles';
import { createStyles, Grid, Theme, Typography } from '@material-ui/core';
import NotifyAction from './NotifyAction';
import DecorateAction from './DecorateAction';
import AuthenticateAction from './AuhenticateAction';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        actions: {
            display: "flex",
            flexDirection: "row"
        },
        heading: {
            padding: theme.spacing(2),
            paddingTop: theme.spacing(3),
            paddingBottom: 0,
        },
        root: {
            display: "flex",
            flexDirection: "column",
            
        },
    })
);

const Actions: React.FC = observer(() =>   {

  const classes = useStyles();

  return (<div className={classes.root}>
        <Typography variant="h5" className={classes.heading}>
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
      </div>);
});

export default Actions;
