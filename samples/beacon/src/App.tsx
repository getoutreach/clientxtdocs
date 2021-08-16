import React, { useState } from "react";
import "./App.css";
import addonSdk from "@outreach/client-addon-sdk";

function App() {
  const [counter, setCounter] = useState<number>(0);

  addonSdk.init().then((ctx) => {
    console.debug("[Beacon]::App -  addonSdk.initialized", { ctx });

    setTimeout(() => {
      const beacon = counter + 1;
      setCounter(beacon);
      console.log("[Beacon]::timeout - decorate #", beacon);
      addonSdk.decorate(beacon.toString(), "badge");
    }, 10 * 1000);
  });

  return <div className="App">Beacon beat # {counter}</div>;
}

export default App;
