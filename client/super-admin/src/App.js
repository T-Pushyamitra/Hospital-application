import "./App.css";
import ButtonComponent from "./components/ButtonComponent.jsx";
import Login from "./components/Login.jsx";
import { TextField, FormControl, Button } from "@mui/material";
import { render } from "@testing-library/react";
import React, {useState} from "react";

function App() {
  let textsForLoginAndRegisterButtons = ["Login", "Register"];
  
  return (
    <div className="App">
      <header className="App-header">
        <div style={{ margin: "20px" }}>
        <Login/>
        </div>
      </header>
    </div>
  );
}

export default App;
