import React from 'react';
import ExtensionIcon from '@material-ui/icons/Extension';
import DesktopMacIcon from '@material-ui/icons/DesktopMac';
import BugReportIcon from '@material-ui/icons/BugReport';
import Box from '@material-ui/core/Box';
import { useStyles } from '../../styles/styles';
import { EventOrigin, EventType } from '@outreach/client-addon-sdk';
import TimelineDot from '@material-ui/lab/TimelineDot';

const EventSenderIcon = (props: { origin: EventOrigin; type: EventType }) => {
  const classes = useStyles();

  const getIconStyle = (): { color: 'grey' | 'primary' | 'secondary'; icon: JSX.Element } => {
    const addonToHostMessageIcon = <ExtensionIcon />;
    const hostToAddonMessageIcon = <DesktopMacIcon />;
    const internalEventIcon = <BugReportIcon />;

    if (props.type === EventType.INTERNAL) {
      return { color: 'grey', icon: internalEventIcon };
    }

    if (props.origin === EventOrigin.ADDON) {
      return { color: 'secondary', icon: addonToHostMessageIcon };
    }

    return { color: 'primary', icon: hostToAddonMessageIcon };
  };

  const { icon, color } = getIconStyle();

  return (
    <TimelineDot color={color}>
      <Box className={classes.eventSender}>{icon}</Box>
    </TimelineDot>
  );
};

export default EventSenderIcon;
