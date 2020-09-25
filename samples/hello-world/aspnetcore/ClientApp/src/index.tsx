import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/App';
import * as serviceWorker from './serviceWorker';

import eventStore from './stores/EventStore'

import addonSdk from '@outreach/client-addon-sdk'
import { AddonMessageType } from '@outreach/client-addon-sdk/dist/messages/AddonMessageType';

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

addonSdk.onInit = (e) => {
  eventStore.addEvent({
    timestamp: new Date(),
    sender: 'host',
    payload: JSON.stringify(e),
    type: AddonMessageType.INIT,
  })
}

addonSdk.ready();