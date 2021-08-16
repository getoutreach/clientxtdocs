import React, { useState } from "react";
import "./App.css";
import addonSdk from "@outreach/client-addon-sdk";

function App() {
  const [counter, setCounter] = useState<number>(0);

  addonSdk.init().then((ctx) => {
    console.debug("[Beacon]::App -  addonSdk.initialized", { ctx });

    setTimeout(() => {
      setCounter(counter + 1);
      console.log("[Beacon]::timeout - decorate #", counter);
      addonSdk.decorate(counter.toString(), "badge");
    }, 10 * 1000);
  });

  return <div className="App">Beacon beat # {counter}</div>;
}

export default App;
