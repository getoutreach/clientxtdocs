import React, { useState } from 'react';

import { observer } from 'mobx-react-lite'

import { makeStyles } from '@material-ui/core/styles';
import { Button, Checkbox, createStyles, FormControlLabel, Theme, Typography } from '@material-ui/core';

import addonSdk from "@outreach/client-addon-sdk";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            marginTop: theme.spacing(),
            marginBottom: theme.spacing(),
        },
        heading: {
            paddingBottom: theme.spacing(),
        },
        root: {
            alignSelf: "flex-start",
            borderColor: theme.palette.divider,
            borderWidth: 1,
            borderStyle: "solid",
            borderRadius: theme.spacing(),
            display: "flex",
            flexDirection: "column",
            margin: theme.spacing(2),
            padding: theme.spacing()
        },
        options: {
            marginBottom: theme.spacing(),
            marginTop: theme.spacing(),
        }
    })
);

const AuthenticateAction: React.FC = observer(() =>   {

  const classes = useStyles();
  const [forced, setForced] = useState<boolean>(false);

  const onAuthenticateClick = () => {
    const token = addonSdk.getToken(forced);
    console.debug("[HelloWorld][Addon]-onAuthenticateClick", token);
  }

  return (<div className={classes.root}>

            <Typography variant="h6" className={classes.heading}>
                Authenticate action
            </Typography>    
            <FormControlLabel className={classes.options}
                control={<Checkbox  checked={forced} onChange={(e) => setForced(e.target.checked)} />}
                label="First time experience"
            />
            <Button variant="contained" 
                    className={classes.button}
                    color="primary" 
                    onClick={onAuthenticateClick}>
                Authenticate
            </Button>
      </div>);
});

export default AuthenticateAction;
