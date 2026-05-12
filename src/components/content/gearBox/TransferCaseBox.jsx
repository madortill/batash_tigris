import React, { useState } from "react";
import "../../../style/GearboxNav.css";
import { useData } from "../../../context/DataContext";
import backBtn from "../../../assets/images/backBtn.svg";
import backBtn from "../../../assets/images/b";

const MODES = ["2H", "4H", "4L"];

const Wheel = ({ active, className = "" }) => {
  return (
    <div className={`wheel ${active ? "wheel-spin" : ""} ${className}`}>
      <div className="wheel-rim" />
    </div>
  );
};


const TransferCaseBox = ({changeToPage , startPage}) => {

    const [showPopUp, setShowPopUp] = useState(false);
const [checkedSteps, setCheckedSteps] = useState([]);
  const [canContinue, setCanContinue] =useState(false);

    const previousPage = () => {
    changeToPage(0);
  };
  const nextPage = () => {
    changeToPage(2);
  };
  
  const handleCheckStep = (index) => {
  setCheckedSteps((prev) => {
    const newSteps = prev.includes(index) 
      ? prev.filter((i) => i !== index) 
      : [...prev, index];
    return newSteps;
  });
};

  const {data}=useData();
  const pageData = data.Gearbox;
  const [selectedMode, setSelectedMode] = useState("2H");
    const [clickedModes, setClickedModes] = useState([]); 


const title = pageData[1]?.title;
const semiTitle = pageData[1]?.semiTitle;
const text = pageData[1]?.text;

const transferBox = pageData[2]?.TransferCaseBox ?? [];

const btn1 = transferBox[0]?.btn;
const text1 = transferBox[0]?.text;

const btn2 = transferBox[1]?.btn;
const text2 = transferBox[1]?.text;

const btn3 = transferBox[2]?.btn;
const text3 = transferBox[2]?.text;


const popUpData = pageData[2]?.popUp ?? [];
const popUpHeader = popUpData[0]; 
const popUpSteps = popUpData[1]; 
                                                
  const handleModeClick = (mode) => {
    setSelectedMode(mode);

    setClickedModes((prev) => {
      if (prev.includes(mode)) return prev;
      return [...prev, mode];
    });
  };

  const rearActive = selectedMode === "2H" || selectedMode === "4H" || selectedMode === "4L";
  const frontActive = selectedMode === "4H" || selectedMode === "4L";

  return (
    <>
    <div className="transfer-box">
         <div className="backBtn">
                    <img
                      src={backBtn}
                      alt="backBtn"
                      className="backBtnImg"
                      onClick={previousPage}
                    />
                    <p className="backBtnText">{backBtnText}</p>
                  </div>
    <h1 className="tigris-general-title effect-box">{title}</h1>
      <p className="transfer-instruction">{semiTitle}</p>
      <p className="transfer-instruction">{text}</p>

      <div className="transfer-card">
        <div className="transfer-text-box">
          {semiTitle}
        </div>

        <div className="transfer-diagram">
          <div className="axle front-axle" />
          <div className="axle rear-axle" />
          <div className="shaft" />

          <Wheel active={frontActive} className="front-right-wheel" />
          <Wheel active={frontActive} className="front-left-wheel" />
          <Wheel active={rearActive} className="rear-right-wheel" />
          <Wheel active={rearActive} className="rear-left-wheel" />

          <div className="gear-selector" />
        </div>

        <div className="transfer-buttons">
          {MODES.map((mode) => (
            <button
              key={mode}
              className={`transfer-mode-btn ${
                selectedMode === mode ? "selected" : ""
              }`}
              onClick={() => handleModeClick(mode)}
            >
              {clickedModes.includes(mode) && (
                <span className="mode-check">✓</span>
              )}
              {mode}
            </button>
          ))}
        </div>
      </div>
    <button
              className={`nextBtn tigris-next-btn ${
                !canContinue ? "nextBtnDisable" : ""
              }`}
              disabled={!canContinue}
              onClick={nextPage}
              >
              {nextBtn}
            </button>
      </div>
       {showPopUp && (
      <div className="stop-sign-overlay">
        <div className="stop-sign-content">
          {/* תמונת הרקע */}
          <img src={bigWarning} alt="warning" className="stop-sign-bg" />
          
          {/* כפתור סגירה (ה-X הקטן בתמונה) */}
          <button className="close-popup-btn" onClick={() => setShowPopUp(false)}>×</button>

          <div className="stop-sign-text-layer">
            <h3 className="stop-title">{popUpHeader?.title}</h3>
            
            <div className="stop-steps-list">
              {popUpSteps?.steps?.map((step, index) => (
                <div key={index} className="stop-step-item" onClick={() => handleCheckStep(index)}>
                   <div className={`custom-checkbox ${checkedSteps.includes(index) ? "checked" : ""}`}>
                    {checkedSteps.includes(index) && "✓"}
                  </div>
                  <span className="step-text">{step}</span>
                </div>
              ))}
            </div>
            <p className="stop-extra-text">{popUpHeader?.textExtra}</p>
          </div>
        </div>
      </div>
    )}
    </>
  );
};

export default TransferCaseBox;