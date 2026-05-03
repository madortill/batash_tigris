import React from "react";
import { useState } from "react";
import "./style/App.css";
import Start from "./components/start/Start.jsx"
import Content from "./components/content/Content.jsx"
import End from "./components/end/End.jsx"
import { Route , Routes } from "react-router-dom";

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
         <Routes>
        <Route path="/" element={<Start/>} />
        <Route path="/content" element={<Content/>} />
        <Route path="/end" element={<End />} />
      </Routes>
    </>
  );
}

export default App;
