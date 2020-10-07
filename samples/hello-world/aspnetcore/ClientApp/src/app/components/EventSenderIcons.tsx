import React from "react";
import ExtensionIcon from "@material-ui/icons/Extension";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import DesktopMacIcon from "@material-ui/icons/DesktopMac";
import { Sender } from "../../stores/EventStore";

const EventSenderIcon = (props: { sender: Sender }) => {
  return (
    <>
      {props.sender === Sender.Addon ? <ExtensionIcon /> : <DesktopMacIcon />}
      <ArrowForwardIcon />
      {props.sender === Sender.Addon ? <DesktopMacIcon /> : <DesktopMacIcon />}
    </>
  );
};

export default EventSenderIcon;
