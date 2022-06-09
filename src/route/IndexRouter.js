import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Login from '@/'
export default function IndexRouter() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </HashRouter>
  );
}
