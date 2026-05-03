import React from "react";
import "../../style/Start.css";
import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useData } from "../../context/DataContext";

import backBtn from "../../assets/images/backBtn.svg";
import road from "../../assets/images/road.svg";
import galGalgal from "../../assets/images/galGalgal.png";
// import welcomeAudioHe from "../../assets/audio/WelcomePage.mp4";

function WelcomePage({ onSendData }) {
  const { data } = useData();
  const backBtnText = data.general[0].text;
  const welcomeTitle = data.welcomePage[0].title;
  const welcomeText = data.welcomePage[0].text;
  const startBtn = data.welcomePage[0].startBtn;

  const { playAudio } = useData();
  useEffect(() => {
    playAudio(welcomeAudioHe);
  }, []);

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
      <div className="welcome-mainContent">
        <p className="welcome-title">{welcomeTitle}</p>
        <p className="welcome-text">{welcomeText}</p>
        <button className="nextBtn welcome-nextBtn" onClick={nextPage}>
          {startBtn}
        </button>
      </div>
      <img src={galGalgal} alt="galGalagal" className="welcome-gal" />
      <img src={road} alt="road" className="welcome-road" />
    </>
  );
}

export default WelcomePage;
