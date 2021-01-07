import React, { useState } from "react";

import Home from "./Home";
import "../style.css";

const App = () => {
  const [mode, setMode] = useState(true);
  const change = () => {
    setMode(!mode);
    const body = document.querySelector("body");
    if (!mode) {
      body.style.color = "hsl(234, 39%, 85%)";
    }
  };

  return (
    <div className="container">
      <Home change={change} mode={mode} />
    </div>
  );
};

export default App;
