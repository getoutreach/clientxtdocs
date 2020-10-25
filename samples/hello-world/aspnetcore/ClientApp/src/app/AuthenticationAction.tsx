import React, { useContext } from 'react';

import { observer } from 'mobx-react-lite'

import { makeStyles } from '@material-ui/core/styles';
import { Button, createStyles, Theme, Dialog, DialogTitle, DialogContent, Divider, Typography } from '@material-ui/core';

import addonSdk from '@outreach/client-addon-sdk';
import { EventStoreContext } from '../stores/EventStore';
import dataService from '../services/dataService';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            marginBottom: theme.spacing(2),
        },
        code: {
            padding: theme.spacing(0.5),
            fontFamily: 'Consolas,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New',
            fontWeight: "lighter"
          },
        divider: {
            marginBottom: theme.spacing(0.5),
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
  const eventStore = useContext(EventStoreContext);

  const onAuthenticateClick = async () => {
    const token = await addonSdk.authenticate();
    if (token) {
      eventStore.setToken(token);
      var json  = await dataService.getInfo();
      props.onClose();
      eventStore.setJson(json);
    } else {
      // TODO: nimal, 18.10.2020 - User rejected consent - handle it.
      props.onClose();
    }
  }
  
  const codeSample = () => {
    return <div>
      <Divider className={classes.divider}  />
      <Typography variant="overline">
          Code sample
      </Typography>
      <Typography variant="body2" className={classes.code}>
        const token = await addonSdk.authenticate()
      </Typography>
    </div>
}

  return (
    <Dialog onClose={props.onClose} open={props.open}>
        <DialogTitle>Outreach API authentication</DialogTitle>
        <DialogContent className={classes.container}>
            <Button variant="contained" 
                    className={classes.button}
                    color="primary" 
                    onClick={onAuthenticateClick}>
                Authenticate
            </Button>
            { codeSample() }
        </DialogContent>
    </Dialog>
  );
});

export default AuthenticationAction;
