
import "../../../style/GearboxExtra.css";
import { useData } from "../../../context/DataContext";
import backBtn from "../../../assets/images/backBtn.svg";
import locker from "../../../assets/images/locker.svg";
import wheelFull from "../../../assets/images/wheelAndLockers.svg";
import wheelLeft from "../../../assets/images/halfLeft.svg";
import wheelRight from "../../../assets/images/halfRight.svg";
import galGalgal from "../../../assets/images/galGalgal.png";
import { useState, useEffect } from "react";

const Lockers = ({ changeToPage }) => {
  const { data } = useData();

  const STORAGE_KEY = "LockersPageState";

  const savedState = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "{}");

  const [openLockers, setOpenLockers] = useState(savedState.openLockers ?? []);
  const [clickedLockers, setClickedLockers] = useState(savedState.clickedLockers ?? []);
  const [lockerClicked, setLockerClicked] = useState(savedState.lockerClicked ?? false);

  const [showLockerPopup, setShowLockerPopup] = useState(savedState.showLockerPopup ?? false);
  const [lockerPopupOpen, setLockerPopupOpen] = useState(savedState.lockerPopupOpen ?? false);
  const [lockerPopupOpenCheck, setLockerPopupOpenCheck] = useState(
    savedState.lockerPopupOpenCheck ?? false
  );

  useEffect(() => {
    sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        openLockers,
        clickedLockers,
        lockerClicked,
        showLockerPopup,
        lockerPopupOpen,
        lockerPopupOpenCheck,
      })
    );
  }, [
    openLockers,
    clickedLockers,
    lockerClicked,
    showLockerPopup,
    lockerPopupOpen,
    lockerPopupOpenCheck,
  ]);

  const gearboxArray = data?.Gearbox;

  const backBtnText = data?.general?.[0]?.text || "חזור";
  const nextBtn = data?.general?.[1]?.text || "הבא";

  const pageData = gearboxArray?.[3]?.Lockers;
  if (!pageData) return null;

const title = pageData.title;
const semiTitle = pageData.semiTitle;
const text = pageData.text;

const autoTitle = pageData.lockers?.[0]?.title;
const autoText = pageData.lockers?.[0]?.text;

const manualTitle = pageData.lockers?.[1]?.title;
const manualText = pageData.lockers?.[1]?.text;


  const popUp = pageData.popUp;
const popUpNext = pageData.gotIt;
const galText = pageData.galText;


  const previousPage = () => {
    changeToPage(4);
  };

  const nextPage = () => {
    changeToPage(6);
  };

  const handleOpenLocker = (type) => {
  setOpenLockers((prev) =>
    prev.includes(type)
      ? prev.filter((item) => item !== type)
      : [...prev, type]
  );

  setClickedLockers((prev) => {
    if (prev.includes(type)) return prev;
    return [...prev, type];
  });
};
 const handleLockerClick = () => {
    setLockerClicked(true);
  setShowLockerPopup(true);
  setLockerPopupOpen(false);

  setTimeout(() => {
    setLockerPopupOpen(true);
  }, 450);
};

  const canContinue = clickedLockers.includes("auto") && clickedLockers.includes("manual");

const handleclosepopup=()=>{
  setShowLockerPopup(false);
  setLockerPopupOpenCheck(true);
} 

  return (
    <>
      <div className="backBtn" onClick={previousPage}>
        <img src={backBtn} alt="backBtn" className="backBtnImg" />
        <p className="backBtnText">{backBtnText}</p>
      </div>

      <section className="lockers-page">
        <h1 className="tigris-general-title effect-underline">{title}</h1>

        <p className="lockers-semi-title">{semiTitle}</p>

        <p className="lockers-instruction">
          <strong>{text}</strong>
        </p>

        <div className="lockers-cards">

          <article
            className={`locker-card ${
              openLockers.includes("auto") ? "locker-card--open" : ""
            }`}
          >
            <button
              type="button"
              className="locker-card-title"
              onClick={() => handleOpenLocker("auto")}
            >
              {autoTitle}
            </button>

            <div className="locker-card-body locker-card-body--auto">
              <p>{autoText}</p>
            </div>
          </article>
          <article
            className={`locker-card ${
             openLockers.includes("manual") ? "locker-card--open" : ""
            }`}
          >
            <button
              type="button"
              className="locker-card-title"
              onClick={() => handleOpenLocker("manual")}
            >
              {manualTitle}
            </button>

            <div className="locker-card-body">
              <p>{manualText}</p>

              <button
                type="button"
                className={`locker-image-btn ${
                  lockerClicked ? "locker-image-btn--clicked" : ""
                }`}
                onClick={handleLockerClick}
                aria-label="הפעלת לוקר ידני"
              >
                <img src={locker} alt="locker" className="locker-img" />
              </button>
            </div>
          </article>
        </div>
      </section>

      <button
        className={`nextBtn tigris-next-btn ${
          !canContinue ? "nextBtnDisable" : ""
        }`}
        disabled={!canContinue}
        onClick={nextPage}
      >
        {nextBtn}
      </button>

      
{showLockerPopup && (
  <div className="locker-popup-overlay">
    <div
      className={`locker-popup-scene ${
        lockerPopupOpen ? "locker-popup-scene--open" : ""
      }`}
    >


      <div className="locker-split-animation">
        <img
          src={wheelFull}
          alt=""
          className="locker-wheel-full"
        />

        <img
          src={wheelLeft}
          alt=""
          className="locker-wheel-part locker-wheel-part--left"
        />

        <img
          src={wheelRight}
          alt=""
          className="locker-wheel-part locker-wheel-part--right"
        />
      </div>

      <div className="locker-popup-card">
        <p>{popUp}</p>
            <button
          type="button"
          className="uses-popup-btn locker-popup-btn "
          onClick={handleclosepopup}
        >
          {popUpNext}
        </button>
      </div>
    </div>
  </div>
)}
      {lockerPopupOpenCheck && <>
                <div className="gal-locker-div">
                  <div className="textBox">
                    <p className="bubbleText">{galText}</p>
                </div>
              <img className="gal-locker-img" src={galGalgal} alt="galGalgal" />
            </div>
            </>
          }
    </>
  );
};

export default Lockers;