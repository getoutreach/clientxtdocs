import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/App';
import * as serviceWorker from './serviceWorker';

import eventStore from './stores/EventStore';

import addonSdk, { LogLevel, EventOrigin, EventType } from '@outreach/client-addon-sdk';
import { HelloWorldAddonLogger, getLevel } from './HelloWorldAddonLogger';

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

addonSdk.logger = new HelloWorldAddonLogger();
console.debug('[HelloWorld] starting... Log level:' + getLevel(addonSdk.logger.level));

const initSdk = () => {
  return async () => {
    console.debug('[HelloWorld]::addonSdk - ready');
    const ctx = await addonSdk.init();
    console.debug('[HelloWorld]::addonSdk - init', { ctx });

    eventStore.setRuntime(addonSdk.getRuntime());

    eventStore.addEvent({
      timestamp: new Date(),
      type: EventType.INTERNAL,
      origin: EventOrigin.ADDON,
      message: '[HelloWorld]::onInit handler',
      logLevel: getLevel(LogLevel.Info),
      context: [`context: ${JSON.stringify(ctx)}`],
    });
  };
};

initSdk();
