import React from "react";
import { useState } from "react";
import galGalgal from "../../assets/images/galGalgal.png";
// import road from "../assets/images/end-road.svg";
import "../../style/End.css";
import "../../style/App.css";
import "../../style/GeneralBack.css";
import { useData } from "../../context/DataContext";
import backBtn from "../../assets/images/backBtn.svg";
import { useNavigate } from "react-router-dom";


const End = () =>  {
  const { data } = useData();
  const btnText = data.End[0].btnText;
  const title = data.End[0].title;
  const warning = data.End[0].warning;
    const backBtnText = data?.general?.[0]?.text || "חזור";
  const nextBtn = data?.general?.[1]?.text || "הבא";
  const introText = data?.End?.[0]?.text || "הבא";
  const navigate = useNavigate();

  const previousPage = () => navigate("/content");

  return (
    <div className="end">
        <div className="backBtn" onClick={previousPage}>
        <img src={backBtn} alt="backBtn" className="backBtnImg" />
        <p className="backBtnText">{backBtnText}</p>
      </div>

    <header className="driving-types-header">
          <h1 className="tigris-general-title effect-underline">{title}</h1>
        </header>
      {/* <img className="end-warning" src={warning} alt="warning" /> */}
      {/* <img className="end-road" src={road} alt="road" /> */}
      <div className="galEnd galBubble">
     
      
      </div>
       <div className="textBox-end end-gal" style={{ width: "clamp(12vw, 18vw, 44vw)"}}>
      <p className="bubbleText-end">{introText}</p>
      <img className="galTechnicalImg galEndImg" src={galGalgal} alt="galGalgal" />
     </div>
      <button
        className="nextBtn tigris-next-btn nextBtnEnd"
        onClick={() => {
          window.location.href = "https://madortill.github.io/batash-package/";
        }}
      >
        {btnText}
      </button>
    </div>
  );
}

export default End;
