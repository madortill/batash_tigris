import { useData } from "../../../context/DataContext";
import { useState, useEffect } from "react";
import "../../../style/UsesNav.css";
import plus from "../../../assets/images/plusIcon.svg";
import jeepAbove from "../../../assets/images/tigrisAbove.png";
import { useNavigate } from "react-router-dom";

  const JeepInside = ({ changeToSection, startingPage }) => {
  const navigate = useNavigate();
  const { data } = useData();
  const pageData = data.uses;

  const [isOpen, setIsOpen] = useState(false);

    const [canContinue, setCanContinue] = useState(true);
  const [screen, setScreen] = useState(0);

  const backBtnText = data.general[0].text;
  const nextBtnText = data.general[1].text;
    const title= pageData.title;
    const Semititle= pageData.Semititle;

  const previousPage = () => changeToSection(4);
  
  const nextPage = () => changeToSection(1); 

  return (
    <>
      <div className="image-container">
        <img
          src={plus}
          alt="כפתור פלוס"
          className="plus-image"
          onClick={() => setIsOpen(true)}
        />
        <img
          src={jeepAbove}
          alt="ג'יפ מלמעלה"
          className="thumb-image"
          onClick={() => setIsOpen(true)}
        />
      </div> 

      <div className="backBtn" onClick={previousPage}>
        <img src={backBtn} alt="backBtn" className="backBtnImg" />
        <p className="backBtnText">{backBtnText}</p>
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
    </>
  );
}; 

export default JeepInside;
