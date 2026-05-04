import React from 'react'
import "../../style/Start.css";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import StartPage from "./StartPage";
import InfoPage from "./InfoPage";
import IntroPage from "./IntroPage";
import WelcomePage from "./WelcomePage";
import GeneralBack from "../content/knowCar/GeneralBack";

function Start() {
  const [page, setPage] = useState(0);
  const navigate = useNavigate();

  const handleChangePage = (data) => {
    //לשנות
    if (data === 4) {
      navigate("/content");
      setPage(0);
    } else {
      setPage(data);
    }
    
  };

  return (
    <>
      {page === 0 && <IntroPage onSendData={handleChangePage}/>}
      {page === 2 && <StartPage onSendData={handleChangePage}/>}
      {page === 1 && <InfoPage onSendData={handleChangePage}/>}
      {/* {page === 2 && <WelcomePage onSendData={handleChangePage}/>} */}
    </>
  )
}

export default Start
