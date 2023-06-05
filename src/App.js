// src/App.js
import React, { useState } from "react";
import "./App.css";
import ExpressionSolver from "./components/ExpressionSolver";
import SolverSelector from "./components/SolverSelector";

function App() {
  const [solver, setSolver] = useState("infix");

  return (
    <div className="App">
      <SolverSelector onSolverSelect={setSolver} />
      <ExpressionSolver solver={solver} />
    </div>
  );
}

export default App;
