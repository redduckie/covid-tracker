import React from "react";
import "./App.css";
import LayoutMain from "./components/layout/LayoutMain";
import { BrowserRouter as Router } from "react-router-dom";

// import "antd/dist/antd.min.css";

function App() {
  return (
    <Router>
      <div className="App">
        <LayoutMain />
      </div>
    </Router>
  );
}

export default App;
