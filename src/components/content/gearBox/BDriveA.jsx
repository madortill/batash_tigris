import { useEffect, useMemo, useState } from "react";
import "../../../style/GearboxActions.css";
import { useData } from "../../../context/DataContext";

import backBtn from "../../../assets/images/backBtn.svg";
import vehicle from "../../../assets/images/tigrisSidePng.svg";
import stopSignAfter from "../../../assets/images/stopSigHand.svg";
import Barrier from "./element/Barrier";
import stopSign from "../../../assets/images/stopSign.svg";

const POPUP_TYPES = {
  START: "start",
  END: "end",
};

const ACTIONS_STORAGE_KEY = "bDriveActionsProgress";

const getSavedActionsState = () => {
  try {
    return JSON.parse(sessionStorage.getItem(ACTIONS_STORAGE_KEY)) || {};
  } catch {
    return {};
  }
};

const ActionsPopup = ({
  title,
  steps,
  buttonText,
  onClose,
  checkedSteps,
  onToggleStep,
  compact = false,
}) => {
  const allChecked = checkedSteps.length === steps.length;

  return (
    <div className="actions-popup-overlay">
      <div
        className={`actions-popup ${
          compact ? "actions-popup--compact" : "actions-popup--large"
        }`}
      >
        <h2 className="actions-popup-title">{title}</h2>
        <div className="actions-road-line-pop-up"></div>

        <div className="actions-popup-list">
          {steps.map((step, index) => {
            const isChecked = checkedSteps.includes(index);

            return (
              <button
                key={index}
                type="button"
                className="actions-popup-row"
                onClick={() => onToggleStep(index)}
              >
                <span className="actions-popup-step">{step}</span>
                <span
                  className={`actions-checkbox ${
                    isChecked ? "actions-checkbox--checked" : ""
                  }`}
                >
                  {isChecked && "✓"}
                </span>
              </button>
            );
          })}
        </div>

        {allChecked && (
          <button
            type="button"
            className="actions-popup-btn"
            onClick={onClose}
          >
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
};

const BDriveA = ({ changeToPage, startPage, changeToSection }) => {
  const { data } = useData();

  const savedState = getSavedActionsState();

  const [activePopup, setActivePopup] = useState(null);

  /* מצבים שנאפסים בכל כניסה לעמוד */
  const [carDriving, setCarDriving] = useState(false);
  const [carArrived, setCarArrived] = useState(false);
  const [barrierOpen, setBarrierOpen] = useState(false);
  const [signClicked, setSignClicked] = useState(false);
  const [currentSign, setCurrentSign] = useState(stopSign);

  /* מצבים שנשמרים ב-sessionStorage */
  const [hasEverClickedSign, setHasEverClickedSign] = useState(
    savedState.hasEverClickedSign || false
  );
  const [startCheckedSteps, setStartCheckedSteps] = useState(
    savedState.startCheckedSteps || []
  );
  const [endCheckedSteps, setEndCheckedSteps] = useState(
    savedState.endCheckedSteps || []
  );
  const [canContinue, setCanContinue] = useState(
    savedState.canContinue || false
  );

  const pageData = data.Gearbox[4];

  const title = pageData?.title;
  const pressMe = pageData?.stopSign;
  const popUp = pageData?.popUp ?? [];

  const startPopup = popUp[0] ?? {};
  const endPopup = popUp[1] ?? {};
  const startSteps = popUp[2]?.levelStart ?? [];
  const endSteps = popUp[3]?.levelEnd ?? [];

  const backBtnText = data.general[0].text;
  const nextBtn = data.general[1].text;

  useEffect(() => {
    sessionStorage.setItem(
      ACTIONS_STORAGE_KEY,
      JSON.stringify({
        hasEverClickedSign,
        startCheckedSteps,
        endCheckedSteps,
        canContinue,
      })
    );
  }, [hasEverClickedSign, startCheckedSteps, endCheckedSteps, canContinue]);


  
  const popupContent = useMemo(() => {
    if (activePopup === POPUP_TYPES.START) {
      return {
        type: POPUP_TYPES.START,
        title: startPopup.titleStart,
        steps: startSteps,
        buttonText: startPopup.btnNext,
        checkedSteps: startCheckedSteps,
        compact: startSteps.length <= 3,
      };
    }

    if (activePopup === POPUP_TYPES.END) {
      return {
        type: POPUP_TYPES.END,
        title: endPopup.titleEnd,
        steps: endSteps,
        buttonText: endPopup.btnNext,
        checkedSteps: endCheckedSteps,
        compact: endSteps.length <= 3,
      };
    }

    return null;
  }, [
    activePopup,
    startPopup,
    endPopup,
    startSteps,
    endSteps,
    startCheckedSteps,
    endCheckedSteps,
  ]);

  const previousPage = () => {
    changeToPage(5);
  };

  const nextPage = () => {
    changeToSection(4);
  };

  const toggleStartStep = (index) => {
    setStartCheckedSteps((prev) =>
      prev.includes(index)
        ? prev.filter((item) => item !== index)
        : [...prev, index]
    );
  };

  const toggleEndStep = (index) => {
    setEndCheckedSteps((prev) =>
      prev.includes(index)
        ? prev.filter((item) => item !== index)
        : [...prev, index]
    );
  };

  const handleSignClick = () => {
    if (signClicked || carDriving || carArrived) return;

    setSignClicked(true);
    setHasEverClickedSign(true);
    setActivePopup(POPUP_TYPES.START);
  };

  const handlePopupClose = () => {
    if (activePopup === POPUP_TYPES.START) {
      setActivePopup(null);
      setCurrentSign(stopSignAfter);
      setCarDriving(true);
      return;
    }

    if (activePopup === POPUP_TYPES.END) {
      setActivePopup(null);

      setTimeout(() => {
        setBarrierOpen(true);
        setCanContinue(true);
      }, 250);

      return;
    }
  };

  const handleCarAnimationEnd = () => {
    if (!carDriving) return;

    setCarDriving(false);
    setCarArrived(true);

    setTimeout(() => {
      setActivePopup(POPUP_TYPES.END);
    }, 300);
  };

  const handleTogglePopupStep = (index) => {
    if (activePopup === POPUP_TYPES.START) {
      toggleStartStep(index);
      return;
    }

    if (activePopup === POPUP_TYPES.END) {
      toggleEndStep(index);
    }
  };

  return (
    <>
      <div className="actions-page">
        <div className="backBtn">
          <img
            src={backBtn}
            alt="backBtn"
            className="backBtnImg"
            onClick={previousPage}
          />
          <p className="backBtnText">{backBtnText}</p>
        </div>

        <h1 className="tigris-general-title effect-underline">{title}</h1>

        <div className={`actions-scene ${carDriving ? "actions-scene--driving" : ""}`}>
          <button
            type="button"
            className={`actions-sign-btn ${
              signClicked ? "actions-sign-btn--done" : ""
            }`}
            disabled={signClicked}
            onClick={handleSignClick}
            aria-label="פתח סדר פעולות"
          >
            {
            // !hasEverClickedSign &&
             currentSign!=stopSignAfter &&
             !carDriving && !activePopup && (
              <p className="press-me">{pressMe}</p>
            )}

            <img src={currentSign} alt="stopSign" className="actions-sign-img" />
          </button>

          <div className="actions-barrier">
            <Barrier isOpen={barrierOpen} />
          </div>

          <img
            src={vehicle}
            alt=""
            className={`
              actions-vehicle
              ${carDriving ? "actions-vehicle--driving" : ""}
              ${carArrived ? "actions-vehicle--arrived" : ""}
            `}
            onAnimationEnd={handleCarAnimationEnd}
          />

          <div className="actions-road">
            <div className="actions-road-line" />
          </div>
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
      </div>

      {popupContent && (
        <ActionsPopup
          title={popupContent.title}
          steps={popupContent.steps}
          buttonText={popupContent.buttonText}
          checkedSteps={popupContent.checkedSteps}
          onToggleStep={handleTogglePopupStep}
          onClose={handlePopupClose}
          compact={popupContent.compact}
        />
      )}
    </>
  );
};

export default BDriveA;