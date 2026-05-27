import { useState } from "react";
import "../../../style/Gearbox.css";
import { useData } from "../../../context/DataContext";
import backBtn from "../../../assets/images/backBtn.svg";
import galGalgal from "../../../assets/images/galGalgal.png";
import GearLeverImg from "../../../assets/images/GearLever.svg";

/* ─── מיקום Y של ראש הידית לכל מצב (בתוך viewBox=0 0 120 320) ─── */
const LEVER_POSITIONS = {
  parking: 60,
  reverse: 104,
  nutral:  148,
  drive:   192,
  manual:  236,
};

const STATE_KEYS   = ["parking", "reverse", "nutral", "drive", "manual"];
const STATE_LETTERS = ["P", "R", "N", "D", "M"];

/* שדה השם בתוך כל אובייקט מצב */
const LABEL_KEY = {
  parking: "parking",
  reverse: "reverse",
  nutral:  "nutral",
  drive:   "drive",
  manual:  "manual",
};

const GearboxTransfer = ({ changeToPage , startPage , changeToSection}) => {
  const [isOpen,      setIsOpen]      = useState(false);
  const [activeState, setActiveState] = useState(null);
  const [visited,     setVisited]     = useState(new Set());

  const { data } = useData();
  const backBtnText = data.general[0].text;
  const nextBtn     = data.general[1].text;

  const pageData   = data.Gearbox[5].GearboxPage;
  const title      = pageData.title;
  const text       = pageData.text;
  const galText    = pageData.galText;
  const semiTitle3 = pageData.semiTitle3;
  const states     = pageData.states;

  const canContinue = visited.size === STATE_KEYS.length;

  /* בנה map מהמערך */
  const stateMap = {};
  states.forEach((s) => {
    const key = Object.keys(s)[0];
    stateMap[key] = s;
  });

  const handleStateClick = (key) => {
    setActiveState(key);
    setVisited((prev) => new Set([...prev, key]));
  };

  const headY    = activeState ? LEVER_POSITIONS[activeState] : LEVER_POSITIONS.nutral;
  const rodTop   = headY + 18;
  const rodBot   = 265;

  const activeObj        = activeState ? stateMap[activeState] : null;
  const activeLabel      = activeObj   ? activeObj[LABEL_KEY[activeState]]  : "";
  const activeText       = activeObj   ? activeObj.text       : "";
  const activeExtra      = activeObj   ? activeObj.extraText  : "";
  const activeExtraTitle = activeObj   ? activeObj.extraTitle : "";
  const isWarning = activeState === "parking" && activeExtra;

  const previousPage = () => changeToPage(4);
  const nextPage     = () => changeToSection(4);

  return (
    <>
    <div className="gb-wrapper">
      <h1 className="tigris-general-title effect-box">{title}</h1>

      {/* ══ מסך ראשון ══ */}
      {!isOpen && (
          <div className="gb-screen-one">
            <h4 className="gb-semi-title">{text}</h4>

          <div className="gb-lever-clickzone" onClick={() => setIsOpen(true)}>
            <img
              src={GearLeverImg}
              alt="ידית הילוכים"
              className="gb-lever-img gb-lever-pulse"
            />
            <p className="gb-click-hint">{galText}</p>
          </div>

          <div className="gal-locker-div">
            <div className="textBox gear-gal" style={{ width: "clamp(12vw,18vw,44vw)" }}>
              <p className="bubbleText">{galText}</p>
            </div>
            <img className="gal-locker-img" src={galGalgal} alt="galGalgal" />
          </div>
        </div>
      )}

      {/* ══ מסך שני ══ */}
      {isOpen && (
        <div className="gb-screen-two">
          <p className="gb-subtitle">{semiTitle3}</p>

          <div className="gb-main-area">

            {/* ── עמודת כפתורים (ימין) ── */}
            <div className="gb-state-buttons">
              {STATE_KEYS.map((key) => {
                const obj     = stateMap[key];
                const label   = obj ? obj[LABEL_KEY[key]] : key;
                const isAct   = activeState === key;
                const isVis   = visited.has(key);
                return (
                  <button
                    key={key}
                    className={[
                      "gb-state-btn",
                      isAct              ? "gb-state-btn--active"   : "",
                      isVis && !isAct    ? "gb-state-btn--visited"  : "",
                      !isAct && !isVis   ? "gb-state-btn--unvisited": "",
                    ].join(" ")}
                    onClick={() => handleStateClick(key)}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            {/* ── SVG ידית (אמצע) ── */}
            <div className="gb-svg-wrapper">
              <svg
                viewBox="0 0 120 300"
                className="gb-lever-svg"
                xmlns="http://www.w3.org/2000/svg"
              >
                /* קו מסלול מקווקו */
                <line x1="52" y1="48" x2="52" y2="248"
                  stroke="#aaa" strokeWidth="2.5" strokeDasharray="6 4"/>

                /* עיגולי עצירה ואותיות */
                {STATE_KEYS.map((key, i) => {
                  const cy     = 60 + i * 44;
                  const isAct  = activeState === key;
                  const isVis  = visited.has(key);
                  return (
                    <g key={key}>
                      <circle
                        cx="52" cy={cy} r="7"
                        fill={isAct ? "#2d6bbf" : isVis ? "#8aab60" : "#ccc"}
                      />
                      {/* אות P/R/N/D/M */}
                      <text
                        x="30" y={cy + 5}
                        fontSize="13" fontWeight="bold"
                        fill={isAct ? "#2d6bbf" : "#666"}
                        textAnchor="middle"
                        fontFamily="Arial, sans-serif"
                      >
                        {STATE_LETTERS[i]}
                      </text>
                    </g>
                  );
                })}

                /* ─── ידית עצמה (מונפשת) ─── */
                <g style={{
                  transform: `translateY(${headY - LEVER_POSITIONS.nutral}px)`,
                  transition: "transform 0.48s cubic-bezier(0.34,1.56,0.64,1)",
                }}>
                  {/* ראש הידית */}
                  <ellipse cx="52" cy={LEVER_POSITIONS.nutral - 2}  rx="17" ry="10" fill="#2a2a2a"/>
                  <ellipse cx="52" cy={LEVER_POSITIONS.nutral - 5}  rx="15" ry="8"  fill="#4a4a4a"/>
                  <ellipse cx="52" cy={LEVER_POSITIONS.nutral - 7}  rx="11" ry="6"  fill="#666"/>
                  {/* כפתור בצד */}
                  <rect x="56" y={LEVER_POSITIONS.nutral - 16} width="20" height="9" rx="4" fill="#3a3a3a"/>
                  <rect x="58" y={LEVER_POSITIONS.nutral - 14} width="7"  height="5" rx="2" fill="#cc3333"/>
                  {/* מוט */}
                  <rect
                    x="49" y={LEVER_POSITIONS.nutral + 8}
                    width="6"
                    height={rodBot - rodTop - 10}
                    rx="3" fill="#3a3a3a"
                  />
                </g>

                /* בסיס */
                <rect x="34" y="258" width="36" height="12" rx="5" fill="#555"/>
                <rect x="30" y="267" width="44" height="8"  rx="4" fill="#333"/>
              </svg>
            </div>

            {/* ── בועת טקסט (שמאל) ── */}
            <div className="gb-bubble-area">
              {activeState ? (
                <div className="gb-bubble">
                  <p className="gb-bubble-label">{activeLabel}</p>
                  <p className="gb-bubble-text">{activeText}</p>

                  {activeExtra && isWarning && (
                    <div className="gb-bubble-warning">
                      <span className="gb-bubble-warning-icon">⚠️</span>
                      <p className="gb-bubble-warning-text">{activeExtra}</p>
                    </div>
                  )}

                  {activeExtra && !isWarning && (
                    <>
                      {activeExtraTitle && (
                        <p className="gb-bubble-extra-title">{activeExtraTitle}</p>
                      )}
                      <p className="gb-bubble-extra">{activeExtra}</p>
                    </>
                  )}
                </div>
              ) : (
                <p className="gb-bubble-placeholder">לחצו על אחד מהמצבים</p>
              )}
            </div>

          </div>{/* end gb-main-area */}
        </div>
      )}

      </div>
      {/* ── ניווט ── */}
      <div className="backBtn">
        <img src={backBtn} alt="backBtn" className="backBtnImg" onClick={previousPage}/>
        <p className="backBtnText">{backBtnText}</p>
      </div>

      <button
        className={`nextBtn tigris-next-btn ${!canContinue ? "nextBtnDisable" : ""}`}
        disabled={!canContinue}
        onClick={nextPage}
      >
        {nextBtn}
      </button>
      </>
  );
};

export default GearboxTransfer;