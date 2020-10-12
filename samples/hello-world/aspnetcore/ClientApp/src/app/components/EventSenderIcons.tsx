import React from 'react';
import ExtensionIcon from '@material-ui/icons/Extension';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import DesktopMacIcon from '@material-ui/icons/DesktopMac';
import Box from '@material-ui/core/Box';

import { EventOrigin, EventType, Theme } from '@outreach/client-addon-sdk';
import { makeStyles, createStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    eventSender: {
      padding: 5,
      paddingBottom: 0,
      width: 64,
    }
  })
);

const EventSenderIcon = (props: { origin: EventOrigin, type: EventType }) => {
  const classes = useStyles();

  const getIcon = () => {
    const addonToHostMessageIcon = <><ExtensionIcon /><ArrowForwardIcon /><DesktopMacIcon /></>;
    const hostToAddonMessageIcon = <><DesktopMacIcon /><ArrowForwardIcon /><ExtensionIcon /></> ;
    const internalEventIcon = <ExtensionIcon />;
  
    if (props.type === EventType.INTERNAL) {
      return internalEventIcon;
    }
  
    if (props.origin === EventOrigin.ADDON) {
      return addonToHostMessageIcon;
    }
  
    return hostToAddonMessageIcon;
  }
  
  return (

    <Box className={classes.eventSender}>
        { getIcon() }
    </Box>
  );
};

export default EventSenderIcon;
