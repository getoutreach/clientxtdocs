import React from 'react';
import ExtensionIcon from '@material-ui/icons/Extension';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import DesktopMacIcon from '@material-ui/icons/DesktopMac';
import Box from '@material-ui/core/Box';
import { Sender } from '../../stores/EventStore';
import { useStyles } from '../../styles/styles';

const EventSenderIcon = (props: { sender: Sender }) => {
  const classes = useStyles();

  return (
    <Box className={classes.eventSender}>
      {props.sender === Sender.Addon ?
        <><ExtensionIcon /><ArrowForwardIcon /><DesktopMacIcon /></> :
        props.sender === Sender.Host ?
          <><DesktopMacIcon /><ArrowForwardIcon /><ExtensionIcon /></> :
          <ExtensionIcon />}
    </Box>
  );
};

export default EventSenderIcon;
