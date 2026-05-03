import React from "react";
import "../../style/IntroPage.css";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useData } from "../../context/DataContext";

import backBtn from "../../assets/images/backBtn.svg";
import road from "../../assets/images/startRoad.svg";
import tigrisJeep from "../../assets/images/tigrisJeep.svg";
import galGalgal from "../../assets/images/galGalgal.png";


const IntroPage = ({onSendData}) => {

const { data } = useData();
  const startTitle = data.introPage[0].text;
  const startText = data.introPage[1].text;
  const startBtn = data.introPage[2].text;
  const backBtnText = data.general[0].text;


  const previousPage = () => {
    onSendData(1);
  };

  const nextPage = () => {
    onSendData(4);
  };
    return (
        <>
        <div className="backBtn">
                <img
                  src={backBtn}
                  alt="backBtn"
                  className="backBtnImg"
                  onClick={previousPage}
                />
                <p className="backBtnText">{backBtnText}</p>
            </div>
            <img src={road} alt="road" className="start-road"/> 
        <div className="welcome-mainContent">
        <p className="welcome-title">{startTitle}</p>
        <p className="welcome-text">{startText}</p>
             <button className="nextBtn welcome-nextBtn" onClick={nextPage}>
          {startBtn}
        </button>
        </div>
        <img src={tigrisJeep} alt="jeep" className="tigris-start"/> 
        </>
    )
}
export default IntroPage;