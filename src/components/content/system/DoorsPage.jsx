import { useState } from "react";
import { useData } from "../../../context/DataContext";
import "../../../style/SystemDoor.css";

import backBtn from "../../../assets/images/backBtn.svg";
import sideDoor from "../../../assets/images/sideDoor.svg";
import backDoor from "../../../assets/images/backDoor.svg";
import sideDoorOpen from "../../../assets/images/opendoorSide.svg";
import Door from "./Door.jsx";
// door-hint-text-press
const DoorsPage = ({ changeToPage, changeToSection }) => {
  const [hasVisitedDoorPage, setHasVisitedDoorPage] = useState(
    sessionStorage.getItem("hasVisitedDoorPage") === "true"
  );

  const { data } = useData();

  const backBtnText = data.general[0].text;
  const nextBtnText = data.general[1].text;

  const pageData = data.System[2];
  const title = data.System[2].title;
  const Semititle = pageData.Semititle;

  const nextPage = () => changeToSection(5);
  const previousPage = () => changeToPage(1);

  const handleDoorOpened = () => {
    sessionStorage.setItem("hasVisitedDoorPage", "true");
    setHasVisitedDoorPage(true);
  };

  return (
    <main className="system-door-page">
      <div className="backBtn" onClick={previousPage}>
        <img src={backBtn} alt="חזור" className="backBtnImg" />
        <p className="backBtnText">{backBtnText}</p>
      </div>

      <h1 className="tigris-general-title effect-underline">{title}</h1>
      <p className="sys-types-subtitle">{Semititle}</p>

      <div className="dp-content-area">
        <div className="dp-door-area">
          <Door
            doorImage={sideDoor}
            openDoorImage={sideDoorOpen}
            innerImage={backDoor}
            doorLabel={pageData.sideDoor}
            innerDoorLabel={pageData.backDoor}
            hintText={pageData.galText}
            annotationText={pageData.sideAnnotation ?? "מנגנון נעילה\nדלתות צד"}
            innerAnnotationText={
              pageData.backAnnotation ?? "מנגנון נעילה\nדלת אחורית"
            }
            onDoorOpened={handleDoorOpened}
            shouldFlashHint={!hasVisitedDoorPage}
          />
        </div>
      </div>

      <p className="dp-warning-text">{pageData.warningText}</p>

      <button
        className={`nextBtn tigris-next-btn ${
          !hasVisitedDoorPage ? "nextBtnDisable" : ""
        }`}
        disabled={!hasVisitedDoorPage}
        onClick={nextPage}
      >
        {nextBtnText}
      </button>
    </main>
  );
};

export default DoorsPage;