
import { useState } from "react";
import "../../../style/GearboxExtra.css";
import { useData } from "../../../context/DataContext";
import backBtn from "../../../assets/images/backBtn.svg";
import locker from "../../../assets/images/locker.svg";

const Lockers = ({ changeToPage }) => {
  const { data } = useData();

const [openLockers, setOpenLockers] = useState([]);
  // const [openLocker, setOpenLocker] = useState(null);
  const [clickedLockers, setClickedLockers] = useState([]);
  const [lockerClicked, setLockerClicked] = useState(false);


// 1. בדיקת קיום הנתונים בצורה בטוחה (לפי המפתח הנכון במערך)
const gearboxArray = data?.Gearbox;

// 2. כפתורי ניווט כלליים
const backBtnText = data.general?.[0]?.text || "חזור";
const nextBtn = data.general?.[1]?.text || "הבא";

// 3. שליפת האובייקט שמכיל את Lockers (הוא האינדקס ה-3 במערך Gearbox)
const pageData = gearboxArray[3]?.Lockers;
if (!pageData) return null; // הגנה למקרה שהמבנה ישתנה

const title = pageData.title;
const semiTitle = pageData.semiTitle;
const text = pageData.text;

const autoTitle = pageData.lockers?.[0]?.title;
const autoText = pageData.lockers?.[0]?.text;

const manualTitle = pageData.lockers?.[1]?.title;
const manualText = pageData.lockers?.[1]?.text;

// 5. שליפת ה-popUp (הוא נמצא באינדקס ה-4 במערך Gearbox)
  const popUp = pageData.popUp;


  const previousPage = () => {
    changeToPage(1);
  };

  const nextPage = () => {
    changeToPage(3);
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

    // כאן בהמשך תכניסי את האנימציה של הלוקר
    // למשל setIsLockerAnimating(true)
  };

  const canContinue = clickedLockers.includes("auto") && clickedLockers.includes("manual");

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
    </>
  );
};

export default Lockers;