import React from "react";
import ReactDOM from "react-dom/client";  // ✅ Correct import
import { BrowserRouter as Router } from "react-router-dom";
import App1 from "./App1";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <App1 />
  </Router>
);

