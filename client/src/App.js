import React from "react";
import "./App.css";

import Register from "./components/register";
import Login from "./components/login";

function App() {
  return (
    <div className="App">
      {" "}
      <Login />
      <Register />
    </div>
  );
}

export default App;
