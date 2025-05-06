import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from './components/Navbar'
import "./components/Navbar.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
      </div>
    </Router>
  );
}