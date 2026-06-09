import React, { useEffect, useState } from "react";
import { useData } from "../../../context/DataContext";
import "../../../style/Boxes.css";
import backBtn from "../../../assets/images/backBtn.svg";

const SELECTBOX_VISITED_KEY = "tigrisSelectboxVisited";
const BoxSvg = ({ label }) => {
  return (
    <svg
      viewBox="0 0 360 360"
      xmlns="http://www.w3.org/2000/svg"
      className="select-box-svg"
    >
      {/* מצב סגור - מכסה עליון */}
      <g className="select-box-closed-top">
        <path
          d="M30 130L75 70H180V130H30Z"
          fill="#D8A633"
          stroke="#111"
          strokeWidth="5"
          strokeLinejoin="round"
        />
        <path
          d="M330 130L285 70H180V130H330Z"
          fill="#D8A633"
          stroke="#111"
          strokeWidth="5"
          strokeLinejoin="round"
        />
      </g>

      {/* מצב פתוח - בדיוק כמו הדוגמה */}
      <g className="select-box-open-top">
        {/* כנף שמאל */}
        <path
          d="M31 130L7 66L45 22L75 88L58 130Z"
          fill="#D8A633"
          stroke="#111"
          strokeWidth="5"
          strokeLinejoin="round"
        />

        {/* כנף ימין */}
        <path
          d="M329 130L353 66L315 22L285 88L302 130Z"
          fill="#D8A633"
          stroke="#111"
          strokeWidth="5"
          strokeLinejoin="round"
        />

        {/* פנים הקופסה */}
        <path
          d="M58 130L75 88H285L302 130H58Z"
          fill="#E7C875"
          stroke="#111"
          strokeWidth="5"
          strokeLinejoin="round"
        />
      </g>

      {/* גוף הקופסה */}
      <path
        d="M32 128H328V300C328 312 318 322 306 322H54C42 322 32 312 32 300V128Z"
        fill="#D4A12F"
        stroke="#111"
        strokeWidth="6"
        strokeLinejoin="round"
      />

      {/* ידית */}
      <rect
        x="123"
        y="175"
        width="114"
        height="24"
        rx="12"
        fill="#231C18"
        stroke="#111"
        strokeWidth="4"
      />

      {/* מדבקה */}
      <rect
        x="272"
        y="262"
        width="48"
        height="36"
        rx="6"
        fill="#C58E2D"
        stroke="#111"
        strokeWidth="4"
      />

      <text
        x="296"
        y="288"
        textAnchor="middle"
        fontFamily="Arial"
        fontSize="24"
        fontWeight="bold"
        fill="#111"
      >
        צ
      </text>

      <text
        x="180"
        y="350"
        textAnchor="middle"
        fontFamily="Arial"
        fontSize="24"
        fontWeight="700"
        fill="#111"
      >
        {label}
      </text>
    </svg>
  );
};
const Selectbox = ({ changeToPage, changeToSection, step = "first" }) => {
  const { data } = useData();

  const [hasVisitedSelectbox, setHasVisitedSelectbox] = useState(() => {
    return sessionStorage.getItem(SELECTBOX_VISITED_KEY) === "true";
  });

  const isFirstStep = step === "first";
  const isSecondStep = step === "second";

  const pageData = data.Gearbox;

  const backBtnText = data.general[0].text;
  const title = pageData[0].title;
  const text = pageData[0].text;

  const textbox1 = pageData[0].textBox1;
  const textbox2 = pageData[0].textBox2;

  const bothBoxesEnabled = isSecondStep || hasVisitedSelectbox;

  useEffect(() => {
    sessionStorage.setItem(SELECTBOX_VISITED_KEY, "true");
    setHasVisitedSelectbox(true);
  }, []);

  const goBack = () => {
    if (isFirstStep && !hasVisitedSelectbox) {
      changeToSection(2, true);
      return;
    }

    if (isFirstStep && hasVisitedSelectbox) {
      changeToSection(2, true);
      return;
    }

    if (isSecondStep) {
      changeToPage(2);
    }
  };

  const handleGearboxClick = () => {
    sessionStorage.setItem(SELECTBOX_VISITED_KEY, "true");
    setHasVisitedSelectbox(true);
    changeToPage(1);
  };

  const handleTransferClick = () => {
    if (!bothBoxesEnabled) return;

    sessionStorage.setItem(SELECTBOX_VISITED_KEY, "true");
    setHasVisitedSelectbox(true);
    changeToPage(4);
  };

  return (
    <div className="tigris-general-page">
      <h1 className="tigris-general-title effect-box">{title}</h1>

      <div className="backBtn">
        <img
          src={backBtn}
          alt="backBtn"
          className="backBtnImg"
          onClick={goBack}
        />
        <p className="backBtnText">{backBtnText}</p>
      </div>

      <p className="text-gearbox">{text}</p>

      <div className="divBoxWrapper">
        {/* תיבת העברה - שמאל */}
        <div
          className={`boxContainer transferBox ${
            bothBoxesEnabled ? "openBox activeTransferBox" : "closedBox disabledTransferBox"
          }`}
          onClick={handleTransferClick}
          role="button"
          tabIndex={bothBoxesEnabled ? 0 : -1}
          aria-disabled={!bothBoxesEnabled}
        >
          <BoxSvg label={textbox2} />
        </div>

        {/* תיבת הילוכים - ימין */}
        <div
          className={`boxContainer gearboxBox ${
            bothBoxesEnabled ? "openBox activeGearboxBox" : "closedBox activeGearboxBox"
          }`}
          onClick={handleGearboxClick}
          role="button"
          tabIndex={0}
        >
          <BoxSvg label={textbox1} />
        </div>
      </div>
    </div>
  );
};

export default Selectbox;