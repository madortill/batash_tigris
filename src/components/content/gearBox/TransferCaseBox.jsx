

import React, { useState, useEffect } from "react";
 import "../../../style/GearboxNav.css";
import { useData } from "../../../context/DataContext";
import backBtn from "../../../assets/images/backBtn.svg";
import bigWarning from "../../../assets/images/bigWarning.svg";
import transferMove from "../../../assets/images/transferBtn.svg";
import transferBtn from "../../../assets/images/transferMove.svg";
import warningSmall from "../../../assets/images/warning-sign.svg";
import wheel from "../../../assets/images/wheel.svg";
import { small } from "framer-motion/client";

const MODES = ["2H", "4H", "4L"];


const Wheel = ({ active, slow, className = "" }) => {
  return (
    <div
      className={`
        tcb-wheel3d
        ${active ? "tcb-wheel3d--moving" : ""}
        ${slow ? "tcb-wheel3d--slow" : ""}
        ${className}
      `}
    >
      <div className="tcb-wheel3d__surface" />
      <div className="tcb-wheel3d__depth" />
    </div>
  );
};

const TopDownCar = ({ mode, isMoving }) => {
  const rearActive = true;
  const frontActive = mode === "4H" || mode === "4L";
  const slowMode = mode === "4L";

  return (
<>
     <svg
      className="tcb-car-svg"
      viewBox="0 0 160 260"
      xmlns="http://www.w3.org/2000/svg">
      {/* ── Road motion lines ── */}
      {isMoving && (
        <g className="tcb-road-lines">
          <line x1="80" y1="270" x2="80" y2="240" stroke="#c8b96a" strokeWidth="2" strokeDasharray="6 6" />
        </g>
      )}
      
       {/* ── Axles ── */}
       <line x1="40" y1="96" x2="120" y2="96" stroke="#6b5f45" strokeWidth="3" strokeLinecap="round" />
       <line x1="40" y1="200" x2="120" y2="200" stroke="#6b5f45" strokeWidth="3" strokeLinecap="round" />
     {/* Drive shaft */}
      <line x1="80" y1="96" x2="80" y2="200" stroke="#6b5f45" strokeWidth="5" strokeLinecap="round" />
      </svg>

    <div className={`tcb-car ${isMoving ? "tcb-car--moving" : ""}`}>

      <div className="tcb-axle tcb-axle--front" />
      <div className="tcb-axle tcb-axle--rear" />
      <div className="tcb-shaft" />

      <Wheel
        active={frontActive && isMoving}
        slow={slowMode}
        className="tcb-wheel3d--front-left"
      />

      <Wheel
        active={frontActive && isMoving}
        slow={slowMode}
        className="tcb-wheel3d--front-right"
      />

      <Wheel
        active={rearActive && isMoving}
        slow={slowMode}
        className="tcb-wheel3d--rear-left"
      />

      <Wheel
        active={rearActive && isMoving}
        slow={slowMode}
        className="tcb-wheel3d--rear-right"
      />
    </div>
    </>

  );
};

/* ─── Main component ─── */
const TransferCaseBox = ({ changeToPage, startPage }) => {
  const { data } = useData();
  const [showPopUp, setShowPopUp] = useState(false);
  const [checkedSteps, setCheckedSteps] = useState([]);
  const [selectedMode, setSelectedMode] = useState(null);
  const [clickedModes, setClickedModes] = useState([]);
  const [isMoving, setIsMoving] = useState(false);
  const [modeText, setModeText] = useState(null);
const [showWarningText, setShowWarningText] = useState(false);

  if (!data?.Gearbox) return null;

  const pageData = data.Gearbox;
  const backBtnText = data.general?.[0]?.text || "חזור";
  const nextBtn = data.general?.[1]?.text || "הבא";

  const title = pageData[1]?.title;
  const semiTitle = pageData[1]?.semiTitle;
  const defaultText = pageData[1]?.text;

  const transferBox = pageData[2]?.TransferCaseBox ?? [];
  const popUpData = pageData[2]?.popUp ?? [];
  const popUpHeader = popUpData[0];
  const popUpSteps = popUpData[1];

  const toolTip=pageData[1]?.text3;
  const warning=pageData[1]?.text2;

  const close=pageData[1]?.closePopUp;
  

  const previousPage = () => changeToPage(0);
  const nextPage = () => changeToPage(2);

  const handleCheckStep = (index) => {
    setCheckedSteps((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleModeClick = (mode) => {
    const modeEntry = transferBox.find((m) => m.btn === mode);
    setSelectedMode(mode);
    setModeText(modeEntry?.text || null);
    setIsMoving(true);

    if (mode === "4L" && !clickedModes.includes("4L")) {
      setShowPopUp(true);
    }

    setClickedModes((prev) =>
      prev.includes(mode) ? prev : [...prev, mode]
    );
  };

  const allStepsChecked =
    checkedSteps.length === (popUpSteps?.steps?.length || 0);
  const canContinue = clickedModes.length === 3 && allStepsChecked;

  const displayText = selectedMode ? modeText : defaultText;

// const Wheel = ({ active, slow, className = "" }) => {
//   return (
//     <div
//       className={`
//         tcb-wheel3d
//         ${active ? "tcb-wheel3d--moving" : ""}
//         ${slow ? "tcb-wheel3d--slow" : ""}
//         ${className}
//       `}
//     >
//       <div className="tcb-wheel3d__surface" />
//       <div className="tcb-wheel3d__depth" />
//     </div>
//   );
// };


  return (
    <>
      <h1 className="tigris-general-title effect-box">{title}</h1>
      <div className="backBtn" onClick={previousPage}>
        <img src={backBtn} alt="backBtn" className="backBtnImg" />
        <p className="backBtnText">{backBtnText}</p>
      </div>

      <p className="tcb-semi-title">{semiTitle}</p>

      <div className="tcb-box">
        {/* ── Info text ── */}
        <p className={`tcb-info-text${selectedMode ? " tcb-info-text--mode" : ""}`}>
          {displayText}
        </p>

        <div className="tcb-card">
          {/* ── Mode buttons (right side) ── */}
          <div className="tcb-buttons">
            {MODES.map((mode) => {
              const isSelected = selectedMode === mode;
              const isDone = clickedModes.includes(mode);
              return (
                <button
                  key={mode}
                  className={`tcb-mode-btn${isSelected ? " tcb-mode-btn--selected" : ""}`}
                  onClick={() => handleModeClick(mode)}
                >
                  {isDone && <span className="tcb-check">✓</span>}
                  {mode}
                </button>
              );
            })}
          </div>

          {/* ── Car diagram (center) ── */}
          <div className="tcb-diagram-area">
            <TopDownCar mode={selectedMode || "2H"} isMoving={isMoving} />

            <button
              className={`tcb-play-btn${isMoving ? " tcb-play-btn--stop" : ""}`}
              onClick={() => setIsMoving((v) => !v)}
              title={isMoving ? "עצור" : "הפעל"}
            >
              {isMoving ? "🛑" : "▶️"}
            </button>
          </div>

          {/* ── Transfer dial (left side) ── */}
          <div className="bg-tcb-dial-area">

          <div className="tcb-dial-area">
            <img
              src={transferBtn}
              alt="transfer dial"
              className={`tcb-dial-img${selectedMode === "4L" ? " tcb-dial--4l" : selectedMode === "4H" ? " tcb-dial--4h" : ""}`}
              />
          </div>
        </div>
        </div>
      
      </div>

      <button
        className={`nextBtn tigris-next-btn${!canContinue ? " nextBtnDisable" : ""}`}
        disabled={!canContinue}
        onClick={nextPage}
      >
        {nextBtn}
      </button>

      {/* ── Pop-up ── */}
      {showPopUp && (
        <div className="tcb-overlay">
          <div className="tcb-popup">
            <img src={bigWarning} alt="warning" className="tcb-popup-bg" />
            <button
              className="tcb-popup-close"
              onClick={() =><> setShowPopUp(false)
                    setShowWarningText(true);
              </>}
            >
              ×
            </button>
            <div className="tcb-popup-body">
              <h3 className="tcb-popup-title">{popUpHeader?.title}</h3>
              <h3 className="tcb-popup-title">{popUpHeader?.action}</h3>
              <div className="tcb-popup-steps">
                {popUpSteps?.steps?.map((step, i) => (
                  <div
                    key={i}
                    className="tcb-step-row"
                    onClick={() => handleCheckStep(i)}
                  >
                    <div
                      className={`tcb-checkbox${checkedSteps.includes(i) ? " tcb-checkbox--checked" : ""}`}
                    >
                      {checkedSteps.includes(i) && "✓"}
                    </div>
                    <span className="tcb-step-text">{step}</span>
                  </div>
                ))}
              </div>
              {allStepsChecked && (
                    <button
                      className="tcb-popup-done-btn"
                      onClick={() => {
                        setShowPopUp(false);
                        setShowWarningText(true);
                      }}
                    >
                      {popUpSteps?.closePopUp || "עברתי"}
                    </button>
                  )}
              <p className="tcb-popup-extra">{popUpHeader?.textExtra}</p>
            </div>
          </div>
        </div>
      )}
      {showWarningText && (
  <div className="tcb-warning-row">
    <img src={warningSmall} className="small-warning" alt="warning" />
    <p className="tcb-warning-text">{warning}</p>
  </div>
)};
    </>
  );
};

export default TransferCaseBox;