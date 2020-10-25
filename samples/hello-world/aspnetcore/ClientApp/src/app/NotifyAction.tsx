import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, FormControl, MenuItem, Select, TextField, Dialog, DialogTitle, DialogContent, Typography, Divider } from '@material-ui/core';
import addonSdk, { NotificationType } from '@outreach/client-addon-sdk';
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
    code: {
      padding: theme.spacing(0.5),
      fontFamily: 'Consolas,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New',
      fontWeight: "lighter"
    },
    divider: {
      marginBottom: theme.spacing(0.5),
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
  }

  const notify = () => {
    if (!text) {
      return;
    }

    const notificationType = getNotificationType();

    addonSdk.notify(text, notificationType);

    setText('');
    props.onClose();
  };

  const codeSample = () => {
      return <div>
        <Divider className={classes.divider}  />
        <Typography variant="overline">
            Code sample
        </Typography>
        <Typography variant="body2" className={classes.code}>
            addonSdk.notify('{text}', '{getNotificationType()}' )
        </Typography>
      </div>
  }

  return (
    <Dialog onClose={props.onClose} open={props.open}>
      <DialogTitle>Outreach host notifications</DialogTitle>
      <DialogContent className={classes.root}>
        <TextField
          autoFocus={true}
          placeholder="Enter the text here"
          label="Notification text"
          onChange={e => setText(e.currentTarget.value)}
          value={text}
          variant="outlined"
        />
        <FormControl component="fieldset" className={classes.actionOptions}>
          <Select
            labelId="notification-type-title"
            variant="outlined"
            value={type}
            onChange={e => setType(e.target.value as NotificationType)}
          >
            <MenuItem value="success">success</MenuItem>
            <MenuItem value="info">information</MenuItem>
            <MenuItem value="warning">warning</MenuItem>
            <MenuItem value="error">error</MenuItem>
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
        { codeSample() }
      </DialogContent>
    </Dialog>
  );


});

export default NotifyAction;
