// import React, { useState } from "react";
// import "../../../style/GearboxNav.css";
// import { useData } from "../../../context/DataContext";
// import backBtn from "../../../assets/images/backBtn.svg";
// import bigWarning from "../../../assets/images/bigWarning.svg"; 

// const MODES = ["2H", "4H", "4L"];

// const Wheel = ({ active, className = "" }) => {
//   return (
//     <div className={`wheel ${active ? "wheel-spin" : ""} ${className}`}>
//       <div className="wheel-rim" />
//     </div>
//   );
// };


// const TransferCaseBox = ({changeToPage , startPage}) => {

//     const [showPopUp, setShowPopUp] = useState(false);
// const [checkedSteps, setCheckedSteps] = useState([]);
//   const [canContinue, setCanContinue] =useState(false);

//     const previousPage = () => {
//     changeToPage(0);
//   };
//   const nextPage = () => {
//     changeToPage(2);
//   };

//   const handleCheckStep = (index) => {
//   setCheckedSteps((prev) => {
//     const newSteps = prev.includes(index) 
//       ? prev.filter((i) => i !== index) 
//       : [...prev, index];
//     return newSteps;
//   });
// };

//   const {data}=useData();
//   const pageData = data.Gearbox;
//   const [selectedMode, setSelectedMode] = useState("2H");
//     const [clickedModes, setClickedModes] = useState([]); 


// const title = pageData[1]?.title;
// const semiTitle = pageData[1]?.semiTitle;
// const text = pageData[1]?.text;

// const transferBox = pageData[2]?.TransferCaseBox ?? [];

// const btn1 = transferBox[0]?.btn;
// const text1 = transferBox[0]?.text;

// const btn2 = transferBox[1]?.btn;
// const text2 = transferBox[1]?.text;

// const btn3 = transferBox[2]?.btn;
// const text3 = transferBox[2]?.text;


// const popUpData = pageData[2]?.popUp ?? [];
// const popUpHeader = popUpData[0]; 
// const popUpSteps = popUpData[1]; 
                                                
//   const handleModeClick = (mode) => {
//     setSelectedMode(mode);

//     setClickedModes((prev) => {
//       if (prev.includes(mode)) return prev;
//       return [...prev, mode];
//     });
//   };

//   const rearActive = selectedMode === "2H" || selectedMode === "4H" || selectedMode === "4L";
//   const frontActive = selectedMode === "4H" || selectedMode === "4L";

//   return (
//     <>
//     <div className="transfer-box">
//          <div className="backBtn">
//                     <img
//                       src={backBtn}
//                       alt="backBtn"
//                       className="backBtnImg"
//                       onClick={previousPage}
//                     />
//                     <p className="backBtnText">{backBtnText}</p>
//                   </div>
//     <h1 className="tigris-general-title effect-box">{title}</h1>
//       <p className="transfer-instruction">{semiTitle}</p>
//       <p className="transfer-instruction">{text}</p>

//       <div className="transfer-card">
//         <div className="transfer-text-box">
//           {semiTitle}
//         </div>

//         <div className="transfer-diagram">
//           <div className="axle front-axle" />
//           <div className="axle rear-axle" />
//           <div className="shaft" />

//           <Wheel active={frontActive} className="front-right-wheel" />
//           <Wheel active={frontActive} className="front-left-wheel" />
//           <Wheel active={rearActive} className="rear-right-wheel" />
//           <Wheel active={rearActive} className="rear-left-wheel" />

//           <div className="gear-selector" />
//         </div>

//         <div className="transfer-buttons">
//           {MODES.map((mode) => (
//             <button
//               key={mode}
//               className={`transfer-mode-btn ${
//                 selectedMode === mode ? "selected" : ""
//               }`}
//               onClick={() => handleModeClick(mode)}
//             >
//               {clickedModes.includes(mode) && (
//                 <span className="mode-check">✓</span>
//               )}
//               {mode}
//             </button>
//           ))}
//         </div>
//       </div>
//     <button
//               className={`nextBtn tigris-next-btn ${
//                 !canContinue ? "nextBtnDisable" : ""
//               }`}
//               disabled={!canContinue}
//               onClick={nextPage}
//               >
//               {nextBtn}
//             </button>
//       </div>
//        {showPopUp && (
//       <div className="stop-sign-overlay">
//         <div className="stop-sign-content">
//           {/* תמונת הרקע */}
//           <img src={bigWarning} alt="warning" className="stop-sign-bg" />
          
//           {/* כפתור סגירה (ה-X הקטן בתמונה) */}
//           <button className="close-popup-btn" onClick={() => setShowPopUp(false)}>×</button>

//           <div className="stop-sign-text-layer">
//             <h3 className="stop-title">{popUpHeader?.title}</h3>
            
//             <div className="stop-steps-list">
//               {popUpSteps?.steps?.map((step, index) => (
//                 <div key={index} className="stop-step-item" onClick={() => handleCheckStep(index)}>
//                    <div className={`custom-checkbox ${checkedSteps.includes(index) ? "checked" : ""}`}>
//                     {checkedSteps.includes(index) && "✓"}
//                   </div>
//                   <span className="step-text">{step}</span>
//                 </div>
//               ))}
//             </div>
//             <p className="stop-extra-text">{popUpHeader?.textExtra}</p>
//           </div>
//         </div>
//       </div>
//     )}
//     </>
//   );
// };

// export default TransferCaseBox;
// import React, { useState } from "react";
// import "../../../style/GearboxNav.css";
// import { useData } from "../../../context/DataContext";
// import backBtn from "../../../assets/images/backBtn.svg";
// import bigWarning from "../../../assets/images/bigWarning.svg"; 
// import transferBtn from "../../../assets/images/transferBtn.svg"; 

// const MODES = ["2H", "4H", "4L"];

// const Wheel = ({ active, className = "" }) => {
//   return (
//     <div className={`wheel ${active ? "wheel-spin" : ""} ${className}`}>
//       <div className="wheel-rim" />
//     </div>
//   );
// };

// const TransferCaseBox = ({ changeToPage, startPage }) => {
//   const { data } = useData();
//   const [showPopUp, setShowPopUp] = useState(false);
//   const [checkedSteps, setCheckedSteps] = useState([]);
//   const [selectedMode, setSelectedMode] = useState("2H");
//   const [clickedModes, setClickedModes] = useState([]);
// const [isSpinning, setIsSpinning] = useState(false);

//   if (!data?.Gearbox) return null;

//   const pageData = data.Gearbox;
  
//   const backBtnText = data.general?.[0]?.text || "חזור";
//   const nextBtn = data.general?.[1]?.text || "הבא";

//   const title = pageData[1]?.title;
//   const semiTitle = pageData[1]?.semiTitle;
//   const text = pageData[1]?.text;

//   const transferBox = pageData[2]?.TransferCaseBox ?? [];
//   const popUpData = pageData[2]?.popUp ?? [];
//   const popUpHeader = popUpData[0];
//   const popUpSteps = popUpData[1];

//   // פונקציות ניווט
//   const previousPage = () => changeToPage(0);
//   const nextPage = () => changeToPage(2);



//   const handleCheckStep = (index) => {
//     setCheckedSteps((prev) =>
//       prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
//     );
//   };

// const handleModeClick = (mode) => {
//   setSelectedMode(mode);
//   setIsSpinning(true); // מתחיל סיבוב בלחיצה על כפתור

//   if (mode === "4L" && !clickedModes.includes("4L")) {
//     setShowPopUp(true);
//   }

//   setClickedModes((prev) => {
//     if (prev.includes(mode)) return prev;
//     return [...prev, mode];
//   });
// };


//   // לוגיקה לכפתור הבא: כל המצבים נלחצו + כל השלבים בפופ-אפ סומנו
//   const allStepsChecked = checkedSteps.length === (popUpSteps?.steps?.length || 0);
//   const canContinue = clickedModes.length === 3 && allStepsChecked;

//   const rearActive = selectedMode === "2H" || selectedMode === "4H" || selectedMode === "4L";
//   const frontActive = selectedMode === "4H" || selectedMode === "4L";

//   return (
//     <>
//         <h1 className="tigris-general-title effect-box">{title}</h1>
//         <div className="backBtn" onClick={previousPage}>
//           <img src={backBtn} alt="backBtn" className="backBtnImg" />
//           <p className="backBtnText">{backBtnText}</p>
//         </div>
//         <p className="transfer-instruction">{semiTitle}</p>
      
//       <div className="transfer-box">

//         <p className="transfer-instruction">{text}</p>
//         <p className="transfer-text">{text}</p>

//         <div className="transfer-card">
//           <div className="transfer-diagram">
//             <div className="axle front-axle" />
//             <div className="axle rear-axle" />
//             <div className="shaft" />
//             <Wheel 
//               active={frontActive && isSpinning} 
//               className={`front-right-wheel ${selectedMode === "4L" ? "slow-spin" : ""}`} />
//             <Wheel 
//               active={frontActive && isSpinning} 
//               className={`front-left-wheel ${selectedMode === "4L" ? "slow-spin" : ""}`} />
//             <Wheel 
//               active={rearActive && isSpinning} 
//               className={`rear-right-wheel ${selectedMode === "4L" ? "slow-spin" : ""}`} />
//             <Wheel 
//               active={rearActive && isSpinning} 
//               className={`rear-left-wheel ${selectedMode === "4L" ? "slow-spin" : ""}`} />

//             <button 
//               className={`stop-motion-btn ${isSpinning ? "active" : ""}`}
//               onClick={() => setIsSpinning(!isSpinning)}
//             >
//               {isSpinning ? "🛑" : " ▶️"}
//             </button>

//             <div className="gear-selector" />
//           </div>

//           <div className="transfer-buttons">
//             {MODES.map((mode) => (
//               <button
//                 key={mode}
//                 className={`transfer-mode-btn ${selectedMode === mode ? "selected" : ""}`}
//                 onClick={() => handleModeClick(mode)}
//               >
//                 {clickedModes.includes(mode) && <span className="mode-check">✓</span>}
//                 {mode}
//               </button>
//             ))}
//           </div>
//         </div>

//       </div>
//         <button
//           className={`nextBtn tigris-next-btn ${!canContinue ? "nextBtnDisable" : ""}`}
//           disabled={!canContinue}
//           onClick={nextPage}
//         >
//           {nextBtn}
//         </button>

//       {showPopUp && (
//         <div className="stop-sign-overlay">
//           <div className="stop-sign-content">
//             <img src={bigWarning} alt="warning" className="stop-sign-bg" />
//             <button className="close-popup-btn" onClick={() => setShowPopUp(false)}>×</button>
//             <div className="stop-sign-text-layer">
//               <h3 className="stop-title">{popUpHeader?.title}</h3>
//               <div className="stop-steps-list">
//                 {popUpSteps?.steps?.map((step, index) => (
//                   <div key={index} className="stop-step-item" onClick={() => handleCheckStep(index)}>
//                     <div className={`custom-checkbox ${checkedSteps.includes(index) ? "checked" : ""}`}>
//                       {checkedSteps.includes(index) && "✓"}
//                     </div>
//                     <span className="step-text">{step}</span>
//                   </div>
//                 ))}
//               </div>
//               <p className="stop-extra-text">{popUpHeader?.textExtra}</p>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default TransferCaseBox;
import React, { useState, useEffect } from "react";
 import "../../../style/GearboxNav.css";
import { useData } from "../../../context/DataContext";
import backBtn from "../../../assets/images/backBtn.svg";
import bigWarning from "../../../assets/images/bigWarning.svg";
import transferMove from "../../../assets/images/transferBtn.svg";
import transferBtn from "../../../assets/images/transferMove.svg";
import warningSmall from "../../../assets/images/warning-sign.svg";

const MODES = ["2H", "4H", "4L"];

/* ─── Top-down car SVG ─── */
const TopDownCar = ({ mode, isMoving }) => {
  const rearActive = true; // rear always drives
  const frontActive = mode === "4H" || mode === "4L";
  const slowMode = mode === "4L";

  const spinClass = (active) =>
    active && isMoving
      ? `tcb-wheel-spin${slowMode ? " tcb-wheel-slow" : ""}`
      : "";

  return (
    <svg
      className="tcb-car-svg"
      viewBox="0 0 160 260"
      xmlns="http://www.w3.org/2000/svg"
    >
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

      {/* ── Front-left wheel ── */}
      {/* <g className={spinClass(frontActive)} style={{ transformOrigin: "20px 96px" }}>
        <rect x="4" y="76" width="28" height="40" rx="6" fill="#1a1a1a" />
        <rect x="9" y="81" width="18" height="30" rx="3" fill="#333" />
        <circle cx="18" cy="96" r="7" fill="#555" />
        <circle cx="18" cy="96" r="3" fill="#888" />
        <line x1="18" y1="89" x2="18" y2="103" stroke="#777" strokeWidth="1.5" />
        <line x1="11" y1="96" x2="25" y2="96" stroke="#777" strokeWidth="1.5" />
      </g> */}

      {/* ── Front-right wheel ── */}
      {/* <g className={spinClass(frontActive)} style={{ transformOrigin: "140px 96px" }}>
        <rect x="128" y="76" width="28" height="40" rx="6" fill="#1a1a1a" />
        <rect x="133" y="81" width="18" height="30" rx="3" fill="#333" />
        <circle cx="142" cy="96" r="7" fill="#555" />
        <circle cx="142" cy="96" r="3" fill="#888" />
        <line x1="142" y1="89" x2="142" y2="103" stroke="#777" strokeWidth="1.5" />
        <line x1="135" y1="96" x2="149" y2="96" stroke="#777" strokeWidth="1.5" />
      </g> */}

      {/* ── Rear-left wheel ── */}
      {/* <g className={spinClass(rearActive)} style={{ transformOrigin: "20px 164px" }}>
        <rect x="4" y="144" width="28" height="40" rx="6" fill="#1a1a1a" />
        <rect x="9" y="149" width="18" height="30" rx="3" fill="#333" />
        <circle cx="18" cy="164" r="7" fill="#555" />
        <circle cx="18" cy="164" r="3" fill="#888" />
        <line x1="18" y1="157" x2="18" y2="171" stroke="#777" strokeWidth="1.5" />
        <line x1="11" y1="164" x2="25" y2="164" stroke="#777" strokeWidth="1.5" />
      </g> */}

      {/* ── Rear-right wheel ── */}
      {/* <g className={spinClass(rearActive)} style={{ transformOrigin: "140px 164px" }}>
        <rect x="128" y="144" width="28" height="40" rx="6" fill="#1a1a1a" />
        <rect x="133" y="149" width="18" height="30" rx="3" fill="#333" />
        <circle cx="142" cy="164" r="7" fill="#555" />
        <circle cx="142" cy="164" r="3" fill="#888" />
        <line x1="142" y1="157" x2="142" y2="171" stroke="#777" strokeWidth="1.5" />
        <line x1="135" y1="164" x2="149" y2="164" stroke="#777" strokeWidth="1.5" />
      </g> */}
      

      {/* 4WD highlight rings on front wheels when active */}
      {/* {frontActive && (
        <>
          <circle cx="18" cy="96" r="16" fill="none" stroke="#f4bd45" strokeWidth="2.5" opacity="0.7" className="tcb-highlight-ring" />
          <circle cx="142" cy="96" r="16" fill="none" stroke="#f4bd45" strokeWidth="2.5" opacity="0.7" className="tcb-highlight-ring" />
        </>
      )}
      <circle cx="18" cy="164" r="16" fill="none" stroke="#f4bd45" strokeWidth="2.5" opacity="0.7" className="tcb-highlight-ring" />
      <circle cx="142" cy="164" r="16" fill="none" stroke="#f4bd45" strokeWidth="2.5" opacity="0.7" className="tcb-highlight-ring" /> */}
    </svg>
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
              onClick={() => setShowPopUp(false)}
            >
              ×
            </button>
            <div className="tcb-popup-body">
              <h3 className="tcb-popup-title">{popUpHeader?.title}</h3>
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
              <p className="tcb-popup-extra">{popUpHeader?.textExtra}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TransferCaseBox;