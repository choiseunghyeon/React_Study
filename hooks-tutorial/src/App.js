import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Counter from "./Counter";
import Info from "./Info";
import Average from "./Average";

function App() {
  //  const [visible, setVisible] = useState(false);
  return (
    <div className="App">
      <hr />
      <Info />
    </div>
  );
}

export default App;
