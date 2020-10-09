import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./app/App";
import * as serviceWorker from "./serviceWorker";

import eventStore, { Sender } from "./stores/EventStore";

import addonSdk, { LogLevel } from "@outreach/client-addon-sdk";
import { AddonLogger } from "./AddonLogger";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

console.log("[Logger]", window.outreach);

addonSdk.logger = new AddonLogger();
console.debug("[HelloWorld]::LogLevel->Warning");

addonSdk.onInit = (ctx) => {
  console.debug("[HelloWorld]::addonSdk.onInit", ctx);
  eventStore.addEvent({
    timestamp: new Date(),
    sender: Sender.Host,
    message: JSON.stringify(ctx),
    type: "init",
    context: [],
  });
};

export const getLevel = (level: LogLevel) => {
  switch (level) {
    case LogLevel.Trace:
      return "Trace";
    case LogLevel.Debug:
      return "Debug";
    case LogLevel.Info:
      return "Info";
    case LogLevel.Warning:
      return "Warning";
    case LogLevel.Error:
      return "Error";
    default:
      return level.toString();
  }
};

console.debug("[HelloWorld]::addonSdk.ready()");
addonSdk.ready();


