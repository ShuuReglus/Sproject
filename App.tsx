import React, { useState } from "react";
import MainApp from "./MainApp";
import OpeningScreen from "./OpeningScreen";

export default function App() {
  const [showOpening, setShowOpening] = useState(true);

  return showOpening ? (
    <OpeningScreen onFinish={() => setShowOpening(false)} />
  ) : (
    <MainApp />
  );
}

import { registerRootComponent } from "expo";
registerRootComponent(App);



