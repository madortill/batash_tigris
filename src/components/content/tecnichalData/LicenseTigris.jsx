
import { useData } from "../../../context/DataContext";
import { useState, useEffect } from "react";
import "../../../style/TecnichalData.css"
import tigrisJeep from "../../../assets/images/tigrisJeep.svg";
import backBtn from "../../../assets/images/backBtn.svg";
import VehicleCard from "./VehicleCard";
 

const LicenseTigris =({ setPage, changeToSection })=> {

  const { data } = useData();
  const pageData = data.LicenseTigris;

  const [canContinue, setCanContinue] =useState(false);
  const backBtnText= data.general[0].text;
  const nextBtn= data.general[1].text;
  
  
  const previousPage = () => {
    setPage(0); 
  };
  const nextPage = () => {
    changeToSection(3); 
  };
  
  return (
    <div className="tigris-general-page">
     <p className="technicalData-title effect-underline">{pageData.title}</p>

      <div className="backBtn">
              <img
                src={backBtn}
                alt="backBtn"
                className="backBtnImg"
                onClick={previousPage}
                />
              <p className="backBtnText">{backBtnText}</p>
            </div>
            <VehicleCard pageData={pageData} onFlipped={() => setCanContinue(true)} />
             <button
              className={`nextBtn ${
                !canContinue ? "nextBtnDisable" : ""
              }`}
              disabled={!canContinue}
              onClick={nextPage}
              >
              {nextBtn}
            </button>
    </div>
  );
  // return (
  //   <div className="vc-wrapper">
      
  //     {/* ── Card + side tabs ── */}
  //     <div className="vc-card-container">
  //       {/* Side tabs */}
  //       <div className="vc-sidetabs" role="tablist" aria-label="קטגוריות">
  //         {SIDE_TABS.map(tab => (
  //           <button
  //             key={tab}
  //             role="tab"
  //             aria-selected={activeSide === tab}
  //             className={`vc-sidetab${activeSide === tab ? " active" : ""}`}
  //             onClick={() => setActiveSide(tab)}
  //           >
  //             {tab}
  //           </button>
  //         ))}
  //       </div>
  
  //       {/* 3-D scene */}
  //       <div
  //         className="vc-scene"
  //         onClick={() => setIsFlipped(f => !f)}
  //         role="button"
  //         aria-pressed={isFlipped}
  //         aria-label={isFlipped ? "הצג חזית הכרטיס" : "הצג נתוני הרכב"}
  //       >
  //         <div className={`vc-card${isFlipped ? " flipped" : ""}`}>
  
  //           {/* ── FRONT FACE ── */}
  //           <div className="vc-face vc-front">
  //             <div className="vc-front-header">{pageData.title}</div>
  //             <div className="vc-front-body">
  //               {/* תמונת רכב — כשיש asset אמיתי: */}
  //               <img src={tigrisJeep} alt={pageData.title} className="vc-vehicle-svg" />
  //               <VehicleSVG />
  //               <div className="vc-flip-hint">
  //                 <div className="vc-flip-icon">↺</div>
  //                 <span>לחץ לצפייה בנתונים</span>
  //               </div>
  //             </div>
  //           </div>
  
  //           {/* ── BACK FACE ── */}
  //           <div className="vc-face vc-back">
  //             <div className="vc-back-header">
  //               {pageData.title}
  //               <div className="vc-back-dot" />
  //             </div>
  //             <div className="vc-specs-list" role="list" aria-label="מפרט טכני">
  //               {pageData.specs.map(({ label, value }) => (
  //                 <div key={label} className="vc-spec-row" role="listitem">
  //                   <span className="vc-spec-label">{label}</span>
  //                   <span className="vc-spec-value">{value}</span>
  //                 </div>
  //               ))}
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //     <button className="vc-back-btn" onClick={() => window.history.back()}>
  //       ← הבא
  //     </button>
  //   </div>
  // );
}

export default LicenseTigris;