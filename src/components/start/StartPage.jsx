import "../../style/Start.css";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import backBtn from "../../assets/images/backBtn.svg";
import TigrisCard from "../../assets/images/tigrisCard.svg";
import letsStartBtn from "../../assets/images/letsStartBtn.png";


const StartPage = ({onSendData}) => {
  const [showAbout, setShowAbout] = useState(false);
  const [infoSymbol, setInfoSymbol] = useState("i");
  const navigate = useNavigate();

  const toggleAbout = () => {
    setShowAbout((prev) => !prev);
    setInfoSymbol((prev) => (prev === "i" ? "x" : "i"));
  };

  const nextPage = () => {
    onSendData(1);
  }
  return (
    <div className="StartPage">
      <div className="backBtn" >
        <img src={backBtn} alt="backBtn" className="backBtnImg" onClick={() => {
          window.location.href = "https://madortill.github.io/batash-package/";
        }} />
        <p className="backBtnText" >חזרה לבחירת הרכב</p>
      </div>
      <div onClick={toggleAbout} className="aboutBtnContainer">
        <button className="about-btn">
          {infoSymbol}
        </button>
        <p>אודות</p>
      </div>
      <div className={`div-about ${showAbout ? "fade-in" : "fade-out"}`}>
        {showAbout && (
          <>
            <h3 className="list-text-about">מפתחת ראשית:</h3>
            <h3 className="list-text-about">גרפיקה:</h3>
            <h3 className="list-text-about">מומחי תוכן:</h3>
            <p className="list-text-about">רס"ל עדן מאיר</p>
            <p className="list-text-about">רנ"ג יוסי אלוני</p>
            <h3 className="list-text-about">רמ"ד טי"ל:</h3>
            <h3 className="list-text-about">גרסה:</h3>
            <p className="list-text-about">אפריל 2026</p>
          </>
        )}
      </div>
      <div className="start-main-content">
        <p className="start-main-content-text">ג'יפ טיגריס</p>
        <img src={TigrisCard} alt="davidCard" className="davidCard"/>
      </div>
      <img src={letsStartBtn} alt="startBtn" className="letsStartBtn" onClick={nextPage}/>
    </div>
  );
}

export default StartPage;
