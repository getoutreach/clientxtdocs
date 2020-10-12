import React, { useState } from 'react';

import { observer } from 'mobx-react-lite'

import { makeStyles } from '@material-ui/core/styles';
import { Button, Checkbox, createStyles, FormControlLabel, Theme, Dialog, DialogTitle, DialogContent } from '@material-ui/core';

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
        },
        container: {
            display: 'flex',
            flexDirection: 'column',
        }
    })
);


interface IAuthenticationActionProps {
    onClose: () => void;
    open: boolean;
  }

const AuthenticationAction: React.FC<IAuthenticationActionProps> = observer((props: IAuthenticationActionProps) =>   {

  const classes = useStyles();
  const [forced, setForced] = useState<boolean>(false);

  const onAuthenticateClick = () => {
    const token = addonSdk.getToken(forced);
    console.debug("[HelloWorld][Addon]-onAuthenticateClick", token);
  }

  return (
    <Dialog onClose={props.onClose} open={props.open}>
        <DialogTitle>Outreach host addon decoration</DialogTitle>
        <DialogContent className={classes.container}>
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
        </DialogContent>
    </Dialog>
  );
});

export default AuthenticationAction;
