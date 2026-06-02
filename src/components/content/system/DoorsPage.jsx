import { useState } from "react";
import { useData } from "../../../context/DataContext";
import "../../../style/SystemDoor.css";

import backBtn   from "../../../assets/images/backBtn.svg";
import sideDoor  from "../../../assets/images/sideDoor.svg";
import backDoor  from "../../../assets/images/backDoor.svg";
import galGalgal from "../../../assets/images/galGalgal.png";
import Door from "./Door.jsx";

const DoorsPage = ({ changeToPage, changeToSection }) => {
  const [canContinue, setCanContinue] = useState(true);
  const [screen, setScreen] = useState(0);

  const { data } = useData();
  const backBtnText = data.general[0].text;
  const nextBtnText = data.general[1].text;
  const pageData    = data.System[2];
    const title= data.System[0].title;
    const Semititle= pageData.Semititle;


  const nextPage = () => changeToSection(5);
  const previousPage   = () => changeToPage(1);

  const handleSideDoorOpened = () => {
    setTimeout(() => setScreen(1), 1500);
  };

  const screens = [
    {
      key:            "side",
      doorImage:      sideDoor,
      doorLabel:      pageData.sideDoor,
      annotationText: pageData.sideAnnotation ?? "מנגנון נעילה\nדלתות צד",
      onDoorOpened:   handleSideDoorOpened,
    },
    {
      key:            "back",
      doorImage:      backDoor,
      doorLabel:      pageData.backDoor,
      annotationText: pageData.backAnnotation ?? "מנגנון נעילה דלתות\nצד",
      onDoorOpened:   undefined,
    },
  ];

  const current = screens[screen];

  return (
    <>
      {/* ── כפתור חזרה ── */}
      <div className="backBtn" onClick={previousPage}>
        <img src={backBtn} alt="חזור" className="backBtnImg" />
        <p className="backBtnText">{backBtnText}</p>
      </div>

      {/* ── כותרת ── */}
    <h1 className="tigris-general-title effect-underline">{title}</h1>
        <p className="sys-types-subtitle">{Semititle}</p>

      {/* ── אזור מרכזי ── */}
        <div className="dp-hint-row">
          <img src={galGalgal} alt="" className="dp-mascot" aria-hidden="true" />
          <div className="dp-hint-bubble">{pageData.galText}</div>
        </div>
      <div className="dp-content-area">


        {/* הדלת — key={current.key} מאפס את הקומפוננטה בין מסכים */}
        <div className="dp-door-area">
          <Door
            key={current.key}
            doorImage={current.doorImage}
            doorLabel={current.doorLabel}
            hintText={pageData.galText}
            annotationText={current.annotationText}
            onDoorOpened={current.onDoorOpened}
          />
        </div>

      </div>

      {/* ── תיבת אזהרה ── */}
      <div className="dp-warning-box">
        <p>{pageData.warningText}</p>
      </div>

      <button
        className={`nextBtn tigris-next-btn ${!canContinue ? "nextBtnDisable" : ""}`}
        disabled={!canContinue}
        onClick={nextPage}
      >
        {nextBtnText}
      </button>
    </>
  );
};

export default DoorsPage;