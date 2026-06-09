import { useState } from "react";
import warningLamp from "../../../assets/images/warning-sign-EB.svg";
import Tabs from "./Tabs.jsx"

const EBPopup = ({ data, ui = {}, onClose }) => {
  const [screen, setScreen] = useState("intro");
  const [showLampText, setShowLampText] = useState(false);
  const [hasVisitedBothTabs, setHasVisitedBothTabs] = useState(false);
  const tabs = data.tabs || {};

  return (
    <div className="sys-popup-overlay">
      {screen === "intro" && (
        <article className="sys-popup-card sys-eb-card sys-eb-card--intro">
          <h2 className="sys-eb-title">{data.title}</h2>

          <p className="sys-eb-text">{data.text}</p>

          <h3 className="sys-eb-subtitle">{data.title2}</h3>

          <p className="sys-eb-text">{data.text2}</p>

          <div className="sys-eb-warning-area">
  <button
    type="button"
    className="sys-eb-lamp-only-btn"
    onClick={() => setShowLampText((prev) => !prev)}
    aria-expanded={showLampText}
  >
    <img src={warningLamp} alt="" className="sys-eb-lamp-only-icon" />
  </button>

  {showLampText && (
    <span className="sys-eb-warning-small-text">
      {data.extraText}
    </span>
  )}
</div>

          <button
          type="button"
          className="sys-eb-next-arrows"
          onClick={() => setScreen("tabs")}
          aria-label="המשך"
        >
          <span></span>
          <span></span>
        </button>
        </article>
      )}

      {screen === "tabs" && (
        <article className="sys-popup-card sys-eb-card sys-eb-card--tabs">
          <h2 className="sys-eb-title">{data.title}</h2>

          <h3 className="sys-eb-tabs-title">{tabs.title}</h3>

          <Tabs
          tab1Label={tabs.auto?.title}
          tab2Label={tabs.normal?.title}
          tab1Content={<p>{tabs.auto?.text}</p>}
          tab2Content={<p>{tabs.normal?.text}</p>}
          activeColor="#d9d9d9"
          borderColor="#315ca7"
          inactiveTextColor="#ffffff"
          activeTextColor="#073799"
          contentBg="#fff2c7"
          onAllTabsVisited={() => setHasVisitedBothTabs(true)}
          />

          {hasVisitedBothTabs && (
          <button
          type="button"
          className="sys-popup-understood-btn"
          onClick={onClose}
        >
          {tabs.nextBtn}
        </button>
          )}
        </article>
      )}
    </div>
  );
};

export default EBPopup;