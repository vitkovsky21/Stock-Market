import React from "react";
import "./App.css";

import Ticker from "./Components/Ticker";
import Table from "./Components/Table";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Ticker />
        <Table />
      </header>
    </div>
  );
}

export default App;
