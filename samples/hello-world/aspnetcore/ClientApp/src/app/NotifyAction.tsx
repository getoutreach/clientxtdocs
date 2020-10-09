import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@material-ui/core';
import addonSdk from '@outreach/client-addon-sdk';
import { NotificationType } from '@outreach/client-addon-sdk/messages/NotificationType';
import { useStyles } from '../styles/styles';

const NotifyAction: React.FC = observer(() => {
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
  };

  return (
    <div className={classes.actionRoot}>
      <Typography variant="h6" className={classes.actionHeading}>
        Notify action
      </Typography>

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
    </div>
  );
});

export default NotifyAction;
