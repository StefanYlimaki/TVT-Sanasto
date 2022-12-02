import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

const renderApp = () => {
  root.render(
    <Router>
      <App />
    </Router>
  );
};

renderApp();
