import React from "react";
import "./App.css";
import LayoutMain from "./components/layout/LayoutMain";
import { BrowserRouter as Router } from "react-router-dom";
import {Provider} from 'react-redux';
// import "antd/dist/antd.min.css";
import configureStore from './store/store';

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <LayoutMain />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
