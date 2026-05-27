import React, { useState, lazy, Suspense } from "react";
import "./style/App.css";
import { Route, Routes } from "react-router-dom";

const Start = lazy(() => import("./components/start/Start.jsx"));
const Content = lazy(() => import("./components/content/Content.jsx"));
const End = lazy(() => import("./components/end/End.jsx"));

import til from "./assets/images/til.svg";
import bahad6 from "./assets/images/bahad6.png";

function App() {
  return (
    <>
      <div className="app">
      </div>
      <div className="symbols">
        <img src={bahad6} alt="bahad6" className="bahad6" />
        <img src={til} alt="til" className="til" />
      </div>
      
      <Suspense fallback={<div>טוען...</div>}>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/content" element={<Content />} />
          <Route path="/end" element={<End />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App; 
