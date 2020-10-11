import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/App';
import * as serviceWorker from './serviceWorker';

import eventStore from './stores/EventStore';

import addonSdk, { LogLevel, EventOrigin, EventType } from '@outreach/client-addon-sdk';
import { AddonLogger, getLevel } from './AddonLogger';

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

console.log('[HelloWorld]::[Logger]', window.outreach);

addonSdk.logger = new AddonLogger();
console.debug('[HelloWorld]::LogLevel->' + addonSdk.logger.level);

addonSdk.onInit = ctx => {
  console.debug('[HelloWorld]::addonSdk.onInit', ctx);
  eventStore.addEvent({
    timestamp: new Date(),
    type: EventType.INTERNAL,
    origin: EventOrigin.ADDON,
    message: '[HelloWorld]::onInit handler',
    logLevel: getLevel(LogLevel.Info),
    context: [
      `context: ${JSON.stringify(ctx)}`
    ],
  });
};

console.debug('[HelloWorld]::addonSdk.ready()');
addonSdk.ready();
