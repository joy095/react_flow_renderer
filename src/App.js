import React from "react";
import ReactFlowRenderer from "./react-flow-renderer";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Navigate to="/home" replace={true} />

      <Routes>
        <Route path="/home" element={<ReactFlowRenderer />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
