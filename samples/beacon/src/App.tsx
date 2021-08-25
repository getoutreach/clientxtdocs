import React, { useState } from "react";
import "./App.css";
import addonSdk from "@outreach/client-addon-sdk";

function App() {
  const [counter, setCounter] = useState<number>(1);

  addonSdk.init().then((ctx) => {
    console.debug("[Beacon]::App -  addonSdk.initialized", { ctx });

    // https://github.com/getoutreach/clientxtsdk/blob/main/docs/manifest.md#context
    // If you have in addon manifest context=['usr.email'] (or any other user property you may need),
    //you can read the current Outreach user, call your own addon backend endpoints with it and
    // determine if a badge decoration should be updated or a toast shown.

    // In this sample, we are just performing a simple demo check if a user email of current Outreach user
    // is having some predefined value so only for that user addon will start working by
    // showing dummy toasts every 10 seconds and update badge decoration every 5 seconds
    if (ctx.user?.email !== "nikola.malovic@outreach.io") {
      return;
    }

    addonSdk.decorate(counter.toString(), "badge");

    setTimeout(() => {
      const beacon = counter + 1;
      setCounter(beacon);
      console.debug("[Beacon]::timeout - decorate #", beacon);
      addonSdk.decorate(beacon.toString(), "badge");
    }, 10 * 1000);

    setTimeout(() => {
      console.debug("[Beacon]::timeout - notify #" + counter);
      addonSdk.notify("Notification #" + counter, "info");
    }, 5 * 1000);
  });

  return <div className="App">Beacon beat # {counter}</div>;
}

export default App;
