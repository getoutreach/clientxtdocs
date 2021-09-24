import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import extensibilitySdk from '@outreach/extensibility-sdk';
import { EventStoreContext } from '../../stores/EventStore';
import dataService from '../../services/dataService';
import CodeSample from '../components/CodeSample';
import { useStyles } from './DialogStyle';

interface IAuthenticationActionProps {
  onClose: () => void;
  open: boolean;
}

const AuthenticationAction: React.FC<IAuthenticationActionProps> = observer((props: IAuthenticationActionProps) => {
  const classes = useStyles();
  const eventStore = useContext(EventStoreContext);

  const onAuthenticateClick = async () => {
    const token = await extensibilitySdk.authenticate();
    if (token) {
      eventStore.setToken(token);
      const json = await dataService.getInfo();
      props.onClose();
      eventStore.setJson(json);
    } else {
      // TODO: nimal, 18.10.2020 - User rejected consent - handle it.
      props.onClose();
    }
  };

  return (
    <Dialog onClose={props.onClose} open={props.open}>
      <DialogTitle>Outreach API authentication</DialogTitle>
      <DialogContent className={classes.container}>
        <Button variant="contained" className={classes.button} color="primary" onClick={onAuthenticateClick}>
          Authenticate
        </Button>
        <CodeSample>
          <>const token = await extensibilitySdk.authenticate()</>
        </CodeSample>
      </DialogContent>
    </Dialog>
  );
});

export default AuthenticationAction;
