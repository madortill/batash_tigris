import { useData } from "../../../context/DataContext";
import { useEffect, useMemo, useState } from "react";
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
import popupImageRigth from "../../../assets/images/rigthShoot.svg";
import popupImageBed from "../../../assets/images/bedImage.svg";
import popupImageBed2 from "../../../assets/images/bedImageSide.png";

import switchesImage from "../../../assets/images/Switchsystem.svg";

import swichLigth from "../../../assets/images/swichLigth.png";
import swichSideMirror from "../../../assets/images/sideMirror.png";
import switchFan from "../../../assets/images/switchFan.png";
import swichLigthInside from "../../../assets/images/swichLigthInside.png";

const JEEP_INSIDE_STORAGE_KEY = "jeepInsideProgress";

const getSavedJeepInsideState = () => {
  try {
    return JSON.parse(localStorage.getItem(JEEP_INSIDE_STORAGE_KEY)) || {};
  } catch {
    return {};
  }
};

const JeepInside = ({ changeToPage, changeToSection }) => {
  const { data } = useData();
  const navigate = useNavigate();

  const pageData = data?.usesNav || {};
  const hotspots = pageData?.hotspots || [];

  const backBtnText = data?.general?.[0]?.text || "חזור";
  const nextBtn = data?.general?.[1]?.text || "הבא";

  const savedState = getSavedJeepInsideState();

  const [activePopup, setActivePopup] = useState(null);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  const [screen, setScreen] = useState(savedState.screen || "jeep");

  const [visitedHotspots, setVisitedHotspots] = useState(
    savedState.visitedHotspots || []
  );

  const [isSwitchesOpen, setIsSwitchesOpen] = useState(
    savedState.isSwitchesOpen || false
  );

  const [hasVisitedPage, setHasVisitedPage] = useState(
    savedState.hasVisitedPage || false
  );

  useEffect(() => {
    setHasVisitedPage(true);
  }, []);

  const hotspotItems = useMemo(
    () => [
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
        titleOpen: hotspots?.[1]?.titleOpen,
        buttonText: hotspots?.[1]?.buttonText,
        openText: hotspots?.[1]?.openText,
        image: popupImageTwo,
        openImage: popupImageTwo2,
        action: "popup",
      },
      {
        id: "front",
        className: "uses-hotspot-front",
        title: hotspots?.[2]?.title,
        buttonText: hotspots?.[2]?.buttonText,
        action: "switches",
      },
      {
        id: "bed",
        className: "uses-hotspot-rigth",
        title: hotspots?.[4]?.title,
        buttonText: hotspots?.[4]?.buttonText,
        openText: hotspots?.[4]?.openText,
        image: popupImageBed,
        openImage: popupImageBed2,
        action: "popup",
        requiresRevealBeforeClose: true,
      },
      {
        id: "rigth",
        className: "uses-hotspot-bed",
        title: hotspots?.[3]?.title,
        buttonText: hotspots?.[3]?.buttonText,
        image: popupImageRigth,
        action: "popup",
      },
    ],
    [hotspots]
  );

  const requiredHotspotIds = hotspotItems.map((hotspot) => hotspot.id);

  const canContinue =
    requiredHotspotIds.length > 0 &&
    requiredHotspotIds.every((id) => visitedHotspots.includes(id));

  useEffect(() => {
    localStorage.setItem(
      JEEP_INSIDE_STORAGE_KEY,
      JSON.stringify({
        hasVisitedPage,
        visitedHotspots,
        isSwitchesOpen,
        screen,
      })
    );
  }, [hasVisitedPage, visitedHotspots, isSwitchesOpen, screen]);

  const switchImages = [
    swichLigth,
    swichSideMirror,
    switchFan,
    swichLigthInside,
  ];

  const previousPage = () => changeToSection(4);

  const nextPage = () => {
    if (!canContinue) return;
    changeToPage(1);
  };

  const markHotspotAsVisited = (hotspotId) => {
    setVisitedHotspots((prev) =>
      prev.includes(hotspotId) ? prev : [...prev, hotspotId]
    );
  };

  const handleHotspotClick = (hotspot) => {
    markHotspotAsVisited(hotspot.id);

    if (hotspot.action === "switches") {
      setScreen("switches");
      return;
    }

    setActivePopup(hotspot);
  };

  const handleOpenSwitches = () => {
    setIsSwitchesOpen(true);
  };

  const handleBackToCar = () => {
    setScreen("jeep");
  };

  if (screen === "switches") {
    return (
      <main className="uses-page">
        <header className="uses-header">
          <h1 className="uses-title">{pageData.title}</h1>
          <h2 className="uses-switches-title">{pageData.titleBtns}</h2>
          <p className="uses-switches-text">{pageData.text}</p>
        </header>

        <section
          className={`uses-switches-content ${
            isSwitchesOpen ? "uses-switches-content-open" : ""
          }`}
        >
          <button
            type="button"
            className="uses-switches-main-btn"
            onClick={handleOpenSwitches}
            aria-label="פתיחת מערכת המתגים"
          >
            <img
              src={switchesImage}
              alt={pageData.titleBtns}
              className={`uses-switches-image ${
                isSwitchesOpen ? "uses-switches-image-animation-none" : ""
              }`}
            />
          </button>

          {isSwitchesOpen && (
            <>
              <div className="uses-switches-buttons">
                {pageData?.btns?.map((btnText, index) => (
                  <div key={index} className="uses-switch-item">
                    <img
                      src={switchImages[index]}
                      alt={btnText}
                      className="uses-switch-icon-img"
                    />
                    <p>{btnText}</p>
                  </div>
                ))}
              </div>

              <p className="uses-switches-extra">{pageData.extraText}</p>

              <button
                type="button"
                className="uses-return-car-btn"
                onClick={handleBackToCar}
              >
                {pageData.backToCar}
              </button>
            </>
          )}
        </section>

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
            alt=""
            className="uses-road-marks uses-road-marks-one"
          />

          <img
            src={marks}
            alt=""
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

            {hotspotItems.map((hotspot) => {
              const isVisited = visitedHotspots.includes(hotspot.id);

              return (
                <button
                  key={hotspot.id}
                  type="button"
                  className={`uses-hotspot ${hotspot.className} ${
                    isVisited ? "uses-hotspot-visited" : ""
                  }`}
                  onClick={() => handleHotspotClick(hotspot)}
                  aria-label={hotspot.title}
                >
                  <span className="uses-hotspot-glow" />
                  <span className="uses-hotspot-dot" />
                </button>
              );
            })}
          </div>
        </section>

        <UseHotspotPopup
          popup={activePopup}
          onClose={() => setActivePopup(null)}
        />

        {isZoomOpen && (
          <div
            className="uses-zoom-overlay"
            onClick={() => setIsZoomOpen(false)}
          >
            <img
              src={jeepAbove}
              alt="רכב מוגדל"
              className="uses-zoom-img"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
      </main>

      <button
        className={`nextBtn tigris-next-btn ${
          !canContinue ? "nextBtnDisable" : ""
        }`}
        disabled={!canContinue}
        onClick={nextPage}
      >
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