import React from "react";
import "./App.css";

import List from "./components/List.jsx";
import { connect } from "react-redux";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <List />
      </header>
    </div>
  );
}

export default connect(null, {})(App);
