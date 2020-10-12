import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import addonSdk from '@outreach/client-addon-sdk';
import { NotificationType } from '@outreach/client-addon-sdk/messages/NotificationType';
import { makeStyles, createStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    actionButton: {
      marginTop: theme.spacing(),
      marginBottom: theme.spacing(),
    },
    actionHeading: {
      paddingBottom: theme.spacing(),
    },
    actionOptions: {
      marginBottom: theme.spacing(),
      marginTop: theme.spacing(),
    },
    actionRoot: {
      alignSelf: 'flex-start',
      borderColor: theme.palette.divider,
      borderWidth: 1,
      borderStyle: 'solid',
      borderRadius: theme.spacing(),
      display: 'flex',
      flexDirection: 'column',
      margin: theme.spacing(2),
      padding: theme.spacing(),
    },
    root: {
      display: 'flex',
      flexDirection: 'column',
    }
  })
);

interface INotifyActionProps {
  onClose: () => void;
  open: boolean;
}

const NotifyAction: React.FC<INotifyActionProps> = observer((props:INotifyActionProps) => {
  
  const classes = useStyles();
  
  const [text, setText] = useState<string>('');
  const [type, setType] = useState<NotificationType>('info');

  const notify = () => {
    if (!text) {
      return;
    }

    let notificationType: NotificationType;
    switch (type) {
      case 'success':
        notificationType = 'success';
        break;
      case 'info':
        notificationType = 'info';
        break;
      case 'warning':
        notificationType = 'warning';
        break;
      case 'error':
        notificationType = 'error';
        break;
      default:
        throw new Error('Unsupported type:' + type);
    }

    addonSdk.notify(text, notificationType);

    setText('');
    props.onClose();
  };


  return (
    <Dialog onClose={props.onClose} open={props.open}>
      <DialogTitle>Outreach host notifications</DialogTitle>
      <DialogContent className={classes.root}>
        <FormControl component="fieldset" className={classes.actionOptions}>
          <InputLabel id="notification-type-title">Notification type</InputLabel>
          <Select
            labelId="notification-type-title"
            variant="filled"
            value={type}
            onChange={e => setType(e.target.value as NotificationType)}
          >
            <MenuItem value="success">success</MenuItem>
            <MenuItem value="info">information</MenuItem>
            <MenuItem value="warning">warning</MenuItem>
            <MenuItem value="error">error</MenuItem>
          </Select>
        </FormControl>
        <TextField
          placeholder="Enter the notification text here"
          label="Notification text"
          onChange={e => setText(e.currentTarget.value)}
          value={text}
          variant="outlined"
        />

        <Button
          variant="contained"
          type="submit"
          className={classes.actionButton}
          color="primary"
          disabled={!text}
          onClick={e => notify()}
        >
          Send notification
        </Button>

      </DialogContent>
    </Dialog>
    
  );
});

export default NotifyAction;
