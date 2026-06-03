import { useState } from "react";
import "../../../style/GearBox.css";
import { useData } from "../../../context/DataContext";
import backBtn from "../../../assets/images/backBtn.svg";
import galGalgal from "../../../assets/images/galGalgal.png";
import GearLeverImg from "../../../assets/images/GearLever.svg";
import HandleSVG from "../../../assets/images/handle.svg";
const LEVER_POSITIONS = {
  parking: 60,
  reverse: 104,
  nutral:  148,
  drive:   192,
  manual:  236,
};

const STATE_KEYS   = ["parking", "reverse", "nutral", "drive", "manual"];
const STATE_LETTERS = ["P", "R", "N", "D", "M"];

const LABEL_KEY = {
  parking: "parking",
  reverse: "reverse",
  nutral:  "nutral",
  drive:   "drive",
  manual:  "manual",
};
const GearboxTransfer = ({ changeToPage, startPage, changeToSection }) => {
  const [isOpen,      setIsOpen]      = useState(false);
  const [activeState, setActiveState] = useState(null);
  const [visited,     setVisited]     = useState(new Set());
  const [warnOpen,    setWarnOpen]    = useState(false);

  const { data } = useData();
  const backBtnText = data.general[0].text;
  const nextBtn     = data.general[1].text;
  const pageData    = data.Gearbox[5].GearboxPage;
  const { title, text, galText, semiTitle3, states } = pageData;

  const stateMap = {};
  states.forEach((s) => { const k = Object.keys(s)[0]; stateMap[k] = s; });

  const handleStateClick = (key) => {
    setActiveState(key);
    setVisited(prev => new Set([...prev, key]));
    setWarnOpen(false);
  };

  const activeObj   = activeState ? stateMap[activeState] : null;
  const activeLabel = activeObj?.[activeState] ?? "";
  const activeText  = activeObj?.text ?? "";
  const activeExtra = activeObj?.extraText ?? "";
  const isWarning   = activeState === "parking" && activeExtra;

  return (
    <>
      <div className="gb-wrapper">
        <h1 className="tigris-general-title effect-box">{title}</h1>

        {/* ══ מסך ראשון ══ */}
        {!isOpen && (
          <div className="gb-screen-one">
            <h4 className="gb-semi-title">{text}</h4>
            <div className="gb-lever-clickzone" onClick={() => setIsOpen(true)}>
              <img src={GearLeverImg} alt="ידית הילוכים" className="gb-lever-img gb-lever-pulse" />
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

        <div className="gb-state-buttons">
          {STATE_KEYS.map((key, i) => {
            const obj   = stateMap[key];
            const label = obj?.[key] ?? key;
            const isAct = activeState === key;
            const isVis = visited.has(key);
            return (
              <div key={key} className="gb-btn-wrap">
                <button
                  className={[
                    "gb-state-btn",
                    isAct            ? "gb-state-btn--active"   : "",
                    isVis && !isAct  ? "gb-state-btn--visited"  : "",
                    !isAct && !isVis ? "gb-state-btn--unvisited": "",
                  ].join(" ")}
                  onClick={() => handleStateClick(key)}
                >
                  <span className="gb-btn-name">{label}</span>
                  <span className="gb-btn-letter">{STATE_LETTERS[i]}</span>
                </button>
              </div>
            );
          })}
        </div>
      {/* טקסט — שמאל, שורה לכל מצב */}
      <div className="gb-texts-col">
        {STATE_KEYS.map((key) => {
          const obj        = stateMap[key];
          const label      = obj?.[key] ?? key;
          const text       = obj?.text ?? "";
          const extraText  = obj?.extraText ?? "";
          const isWarning  = key === "parking" && extraText;
          const isAct      = activeState === key;

          return (
            <div key={key} className="gb-text-row">
              {isAct ? (
                <div className="gb-text-content">
                  <p className="gb-text-line">
                    <span className="gb-text-label">{label} – </span>
                    <span className="gb-text-body">{text}</span>
                  </p>
                  {isWarning && (
                    <div
                      className="gb-warn-line"
                      onClick={() => setWarnOpen(p => !p)}
                    >
                      <span className="gb-warn-icon">⚠️</span>
                      {warnOpen
                        ? <p className="gb-warn-txt">{extraText}</p>
                        : <p className="gb-warn-hint"></p>
                      }
                    </div>
                  )}
                  {extraText && !isWarning && (
                    <p className="gb-extra">{extraText}</p>
                  )}
                </div>
              ) : (
                <div className="gb-text-empty" />
              )}
            </div>
          );
        })}
      </div>

      {/* ידית + כפתורים — ימין */}
      <div className="gb-lever-section">

        <img
          src={HandleSVG}
          alt="ידית הילוכים"
          className="gb-lever-img-static"
        />
      </div>

    </div>
  </div>
)}
</div>

      <div className="backBtn">
        <img src={backBtn} alt="backBtn" className="backBtnImg" onClick={() => changeToPage(1)} />
        <p className="backBtnText">{backBtnText}</p>
      </div>
      <button
        className="nextBtn tigris-next-btn"
        onClick={() => changeToPage(3)}
      >
        {nextBtn}
      </button>
    </>
  );
};
export default GearboxTransfer;