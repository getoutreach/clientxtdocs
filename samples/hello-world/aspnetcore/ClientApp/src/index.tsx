import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/App';
import * as serviceWorker from './serviceWorker';

import eventStore from './stores/EventStore'

import addonSdk, { LogLevel } from '@outreach/client-addon-sdk'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

addonSdk.logging = LogLevel.Debug;

addonSdk.onInit = (ctx) => {
  console.log("[Addon]::addonSdk.onInit", ctx);
  eventStore.addEvent({
    timestamp: new Date(),
    sender: "host",
    message: JSON.stringify(ctx),
    type: "init",
    context: []
  });
}

addonSdk.onInfo = (e) => {
  console.log("[Addon]::addonSdk.onInfo", e);

  eventStore.addEvent({
    timestamp: new Date(),
    sender: "addon",
    message: e.message || '',
    type: getLevel(e.level),
    context: e.context
  });
}

const getLevel = (level: LogLevel) => {
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
}


addonSdk.ready();