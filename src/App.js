import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home, QuizeFormm, Form } from "./pages";

import "antd/dist/antd.css";
import { GlobalReset } from "./Global.styled";

function App() {
  return (
    <>
      <GlobalReset />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="form/:formId" element={<QuizeFormm />} />
        <Route path="view/:quizId" element={<Form />} />
      </Routes>
    </>
  );
}

export default App;
