import React, { useState } from "react";
import "./App.css";
import addonSdk from "@outreach/client-addon-sdk";

function App() {
  const [counter, setCounter] = useState<number>(1);

  addonSdk.init().then((ctx) => {
    console.debug("[Beacon]::App -  addonSdk.initialized", { ctx });

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
