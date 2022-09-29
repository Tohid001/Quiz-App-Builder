import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home, QuizeFormm } from "./pages";

import "antd/dist/antd.css";
import { GlobalReset } from "./Global.styled";

function App() {
  return (
    <>
      <GlobalReset />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="form/:formId" element={<QuizeFormm />} />
      </Routes>
    </>
  );
}

export default App;
