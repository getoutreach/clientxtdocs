import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/App';
import * as serviceWorker from './serviceWorker';

import eventStore from './stores/EventStore';

import extensibilitySdk, { LogLevel, EventOrigin, EventType } from '@outreach/extensibility-sdk';
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

extensibilitySdk.setLogger(new HelloWorldAddonLogger());
console.debug('[HelloWorld] starting... Log level:' + getLevel(extensibilitySdk.logLevel));

extensibilitySdk.init().then(ctx => {
  console.debug('[HelloWorld] extensibilitySdk.initialized', { ctx });

  eventStore.setRuntime(extensibilitySdk.getRuntime());

  eventStore.addEvent({
    timestamp: new Date(),
    type: EventType.INTERNAL,
    origin: EventOrigin.ADDON,
    message: '[HelloWorld]::onInit handler',
    logLevel: getLevel(LogLevel.Info),
    context: [`context: ${JSON.stringify(ctx)}`],
  });
});
