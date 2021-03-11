import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import {
  Button,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  InputLabel,
} from '@material-ui/core';
import addonSdk, { NotificationType } from '@outreach/client-addon-sdk';
import CodeSample from '../components/CodeSample';
import { useStyles } from './DialogStyle';

interface INotifyActionProps {
  onClose: () => void;
  open: boolean;
}

const NotifyAction: React.FC<INotifyActionProps> = observer((props: INotifyActionProps) => {
  const classes = useStyles();
  const [text, setText] = useState<string>('');
  const [type, setType] = useState<NotificationType>('info');
  const notificationTypes: NotificationType[] = ['success', 'info', 'warning', 'error'];

  const getNotificationType = () => {
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
    return notificationType;
  };

  const notify = () => {
    if (!text) {
      return;
    }

    const notificationType = getNotificationType();

    addonSdk.notify(text, notificationType);

    setText('');
    props.onClose();
  };

  return (
    <Dialog onClose={props.onClose} open={props.open}>
      <DialogTitle>Outreach host notifications</DialogTitle>
      <DialogContent className={classes.container}>
        <TextField
          autoFocus={true}
          placeholder="Enter the text here"
          label="Notification text"
          onChange={e => setText(e.currentTarget.value)}
          value={text}
          variant="outlined"
        />
        <FormControl component="fieldset" className={classes.actionOptions}>
          <InputLabel id="notification-type-title">Notification type</InputLabel>
          <Select
            labelId="notification-type-title"
            variant="outlined"
            value={type}
            onChange={e => setType(e.target.value as NotificationType)}
          >
            {notificationTypes.map(notificationType => (
              <MenuItem key={notificationType} value={notificationType}>
                {notificationType}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
        <CodeSample>
          <>
            addonSdk.notify('{text}', '{getNotificationType()}')
          </>
        </CodeSample>
      </DialogContent>
    </Dialog>
  );
});

export default NotifyAction;
