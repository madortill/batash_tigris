
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

// import { useState } from "react";
// import { useData } from "../../../context/DataContext";
// import "../../../style/TecnichalData.css";

// export default function LicenseTigris() {
//   const [isFlipped, setIsFlipped] = useState(false);

//   // ── שליפת נתונים מה-JSON ──────────────────────────────
//   const pageData      = useData();                   // מחזיר את כל ה-JSON של השפה הנוכחית
//   const licenseData   = pageData.LicenseTigris;     // { title, titleID, specs[] }

//   const title   = licenseData.title;                // "נתונים טכניים"
//   const titleID = licenseData.titleID;              // "רישון נהיגה - טיגריס"
//   const specs   = licenseData.specs;                // [{ label, value }, ...]

//   // ── render ─────────────────────────────────────────────
//   return (
//     <div className="lt-page">

//       {/* ───── Page title (from navbar key "Tecnical") ───── */}
//       <h1 className="lt-page-title">{title}</h1>

//       {/* ───── 3-D flip scene ───── */}
//       <div
//         className="lt-scene"
//         onClick={() => setIsFlipped((prev) => !prev)}
//         role="button"
//         aria-pressed={isFlipped}
//         aria-label={isFlipped ? "הצג חזית הכרטיס" : "הצג נתוני רישיון"}
//       >
//         <div className={`lt-card${isFlipped ? " lt-card--flipped" : ""}`}>

//           {/* ══ FRONT ══════════════════════════════════════ */}
//           <div className="lt-face lt-face--front">
//             <div className="lt-face__header">{titleID}</div>

//             <div className="lt-face__body">
//               {/* אייקון רכב — החלף ב-<img> כשיש asset */}
//               <div className="lt-vehicle-icon" aria-hidden="true">
//                 <svg viewBox="0 0 220 90" xmlns="http://www.w3.org/2000/svg">
//                   <rect x="20"  y="28" width="165" height="38" rx="8"  fill="#2a5298" />
//                   <rect x="110" y="14" width="60"  height="26" rx="5"  fill="#1a3c6e" />
//                   <rect x="118" y="19" width="44"  height="16" rx="3"  fill="#a8c4e0" opacity="0.7" />
//                   <rect x="174" y="36" width="12"  height="22" rx="4"  fill="#0f2548" />
//                   <circle cx="55"  cy="68" r="14" fill="#0f2548" />
//                   <circle cx="55"  cy="68" r="7"  fill="#8899bb" />
//                   <circle cx="155" cy="68" r="14" fill="#0f2548" />
//                   <circle cx="155" cy="68" r="7"  fill="#8899bb" />
//                   <rect x="20" y="42" width="165" height="4" rx="2" fill="#c8a830" opacity="0.6" />
//                   <polygon points="90,34 97,44 83,44" fill="#c8a830" opacity="0.9" />
//                 </svg>
//               </div>

//               <div className="lt-flip-hint" aria-hidden="true">
//                 <span className="lt-flip-hint__icon">↺</span>
//                 <span className="lt-flip-hint__text">לחץ לצפייה בנתונים</span>
//               </div>
//             </div>
//           </div>

//           {/* ══ BACK ═══════════════════════════════════════ */}
//           <div className="lt-face lt-face--back">
//             <div className="lt-face__header">
//               {titleID}
//               <span className="lt-pulse-dot" aria-hidden="true" />
//             </div>

//             <ul className="lt-specs" role="list">
//               {specs.map(({ label, value }) => (
//                 <li key={label} className="lt-specs__row" role="listitem">
//                   <span className="lt-specs__label">{label}</span>
//                   <span className="lt-specs__value">{value}</span>
//                 </li>
//               ))}
//             </ul>
//           </div>

//         </div>
//       </div>

//       {/* ───── Card title below scene ───── */}
//       <p className="lt-card-caption">{title}</p>

//     </div>
//   );
// }