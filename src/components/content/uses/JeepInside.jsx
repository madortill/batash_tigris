import { useData } from "../../../context/DataContext";
import { useState } from "react";
import "../../../style/UsesNav.css";
import { useNavigate } from "react-router-dom";


import plus from "../../../assets/images/plusIcon.svg";
import jeepAbove from "../../../assets/images/tigrisAbove.png";
import backBtn from "../../../assets/images/backBtn.svg";
import marks from "../../../assets/images/roadMarks.svg";

import UseHotspotPopup from "./UseHotspotPopup";

import popupImageOne from "../../../assets/images/BackgroundShoot.png";
import popupImageTwo from "../../../assets/images/shootingClose.png";
import popupImageTwo2 from "../../../assets/images/openHole.png";

import switchesImage from "../../../assets/images/Switchsystem.svg";

const JeepInside = ({ changeToSection }) => {
  const { data } = useData();
  const navigate = useNavigate();

  const pageData = data?.usesNav || {};
  const hotspots = pageData?.hotspots || [];

  const backBtnText = data?.general?.[0]?.text || "חזור";
  const nextBtn = data?.general?.[1]?.text || "הבא";

  const [activePopup, setActivePopup] = useState(null);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [screen, setScreen] = useState("jeep");

  const [visitedHotspots, setVisitedHotspots] = useState([]);
  const canContinue = visitedHotspots.length === 3;


  const previousPage = () => changeToSection(4);
  const nextPage = () => navigate("/end");

  const hotspotItems = [
    {
      id: "inside",
      className: "uses-hotspot-inside",
      title: hotspots?.[0]?.title,
      buttonText: hotspots?.[0]?.buttonText,
      image: popupImageOne,
      action: "popup",
    },
    {
      id: "middle",
      className: "uses-hotspot-middle",
      title: hotspots?.[1]?.title,
      buttonText: hotspots?.[1]?.buttonText,
      image: popupImageTwo,
      action: "popup",
    },
    {
      id: "front",
      className: "uses-hotspot-front",
      title: hotspots?.[2]?.title,
      buttonText: hotspots?.[2]?.buttonText,
      action: "switches",
    },
  ];

   const handleHotspotClick = (hotspot) => {
    if (!visitedHotspots.includes(hotspot.id)) {
      setVisitedHotspots((prev) => [...prev, hotspot.id]);
    }

    if (hotspot.action === "switches") {
      setScreen("switches");
      return;
    }

    setActivePopup(hotspot);
  };
  if (screen === "switches") {
    return (
      <main className="uses-page">
        <header className="uses-header">
          <h1 className="uses-title">{pageData.title}</h1>
          <h2 className="uses-switches-title">{pageData.titleBtns}</h2>
          <p className="uses-switches-text">{pageData.text}</p>
        </header>

        <section className="uses-switches-content">
          <img
            src={switchesImage}
            alt={pageData.titleBtns}
            className="uses-switches-image"
          />

          <div className="uses-switches-buttons">
            {pageData?.btns?.map((btnText, index) => (
              <div key={index} className="uses-switch-item">
                <div className="uses-switch-icon" />
                <p>{btnText}</p>
              </div>
            ))}
          </div>

          <p className="uses-switches-extra">{pageData.extraText}</p>

          <button
            type="button"
            className="uses-return-car-btn"
            onClick={() => setScreen("jeep")}
          >
            {pageData.backToCar}
          </button>
        </section>

        <div className="backBtn" onClick={previousPage}>
          <img src={backBtn} alt="backBtn" className="backBtnImg" />
          <p className="backBtnText">{backBtnText}</p>
        </div>

        <button className="nextBtn tigris-next-btn" onClick={nextPage}>
          {nextBtn}
        </button>
      </main>
    );
  }

  return (
    <>
    <main className="uses-page">
      <header className="uses-header">
        <h1 className="uses-title">{pageData.title}</h1>
        <p className="uses-subtitle">{pageData.Semititle}</p>
      </header>

      <section className="uses-jeep-area">
        <img
          src={marks}
          className="uses-road-marks uses-road-marks-one"
        />

        <img
          src={marks}
          className="uses-road-marks uses-road-marks-two"
        />
        <button
          type="button"
          className="uses-plus-btn"
          onClick={() => setIsZoomOpen(true)}
        >
          <img src={plus} alt="הגדלה" />
        </button>

        <div className="uses-jeep-wrap">
          <img
            src={jeepAbove}
            alt="רכב מלמעלה"
            className="uses-jeep-img"
          />

          {hotspotItems.map((hotspot) => (
            <button
              key={hotspot.id}
              type="button"
              className={`uses-hotspot ${hotspot.className}`}
              onClick={() => handleHotspotClick(hotspot)}
              aria-label={hotspot.title}
            >
              <span className="uses-hotspot-glow" />
              <span className="uses-hotspot-dot" />
            </button>
          ))}
        </div>
      </section>

      <UseHotspotPopup
        popup={activePopup}
        onClose={() => setActivePopup(null)}
      />

      {isZoomOpen && (
        <div className="uses-zoom-overlay" onClick={() => setIsZoomOpen(false)}>
          <img
            src={jeepAbove}
            alt="רכב מוגדל"
            className="uses-zoom-img"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}


    </main>
      <button className="nextBtn tigris-next-btn" onClick={nextPage}>
        {nextBtn}
      </button>
      <div className="backBtn" onClick={previousPage}>
        <img src={backBtn} alt="backBtn" className="backBtnImg" />
        <p className="backBtnText">{backBtnText}</p>
      </div>
      </>
  );
};

export default JeepInside;