import { useEffect, useMemo, useState } from "react";
import "../../../style/SystemNav.css";
import { useData } from "../../../context/DataContext";
import backBtn from "../../../assets/images/backBtn.svg";

const DrivingTypes = ({ changeToPage, changeToSection }) => {
  const { data } = useData();

  const backBtnText = data?.general?.[0]?.text || "הבא";
  const nextBtn = data?.general?.[1]?.text || "המשך";
  const pageData = data?.System?.[0] || {};

  const [selectedModeIndex, setSelectedModeIndex] = useState(null);
  const [viewedModes, setViewedModes] = useState([]);
  const [canContinue, setCanContinue] = useState(true);

  const title = pageData?.title || "";
  const introText = pageData?.text || "";

  const drivingModes = useMemo(() => {
    return (pageData?.drivingTypes || []).map((item, index) => {
      const rawText = item?.text || "";
      const dashIndex = rawText.indexOf("-");

      const modeName =
        dashIndex !== -1
          ? rawText.slice(0, dashIndex).trim()
          : `מצב ${index + 1}`;

      const description =
        dashIndex !== -1
          ? rawText.slice(dashIndex + 1).trim()
          : rawText.trim();

      return {
        id: `${modeName}-${index}`,
        modeName,
        description,
        extra: item?.textExtra || "",
      };
    });
  }, [pageData]);

  // useEffect(() => {
  //   setCanContinue(viewedModes.length === drivingModes.length && drivingModes.length > 0);
  // }, [viewedModes, drivingModes]);

  const activeMode =
    selectedModeIndex !== null ? drivingModes[selectedModeIndex] : null;

  const handleSelectMode = (index) => {
    setSelectedModeIndex(index);

    const selectedId = drivingModes[index]?.id;
    if (!selectedId) return;

    setViewedModes((prev) =>
      prev.includes(selectedId) ? prev : [...prev, selectedId]
    );
  };

  const previousPage = () => {
    changeToSection(3);
  };

  const nextPage = () => {
    changeToPage(1);
  };

  return (
    <div className="driving-types-page">
      <div className="backBtn" onClick={previousPage}>
        <img src={backBtn} alt="backBtn" className="backBtnImg" />
        <p className="backBtnText">{backBtnText}</p>
      </div>

       <div className="driving-types-wrapper">
        <header className="driving-types-header">
          <h1 className="tigris-general-title effect-underline">{title}</h1>
          <p className="driving-types-intro">{introText}</p>
        </header>

        {/*<div className="driving-types-layout">
          <aside className="driving-selector-panel">
            <h2 className="driving-panel-title">בורר מצבי נהיגה</h2>
            <p className="driving-panel-subtitle">
              לחצו על מצב נהיגה כדי לחשוף את ההסבר שלו
            </p>

            <div className="driving-modes-list">
              {drivingModes.map((mode, index) => {
                const isActive = selectedModeIndex === index;
                const isViewed = viewedModes.includes(mode.id);

                return (
                  <button
                    key={mode.id}
                    type="button"
                    className={`driving-mode-btn ${
                      isActive ? "driving-mode-btn--active" : ""
                    } ${isViewed ? "driving-mode-btn--viewed" : ""}`}
                    onClick={() => handleSelectMode(index)}
                  >
                    <span className="driving-mode-btn-name">{mode.modeName}</span>
                    {isViewed && <span className="driving-mode-check">✓</span>}
                  </button>
                );
              })}
            </div>
          </aside>

          <section className="driving-content-panel">
            {!activeMode ? (
              <div className="driving-empty-state">
                <h3>בחרו מצב נהיגה</h3>
                <p>
                  בחרו אחד מהמצבים
                </p>
              </div>
            ) : (
              <div key={activeMode.id} className="driving-mode-card">
                <div className="driving-mode-badge">מצב נהיגה</div>
                <h2 className="driving-mode-title">{activeMode.modeName}</h2>
                <p className="driving-mode-description">
                  {activeMode.description}
                </p>

                {activeMode.extra && (
                  <div className="driving-mode-extra">
                    <span className="driving-mode-extra-icon">i</span>
                    <p>{activeMode.extra}</p>
                  </div>
                )}
              </div>
            )}
          </section>

          <aside className="driving-image-panel">
            <div className="driving-image-placeholder">
              <span>מקום לתמונה</span>
            </div>
          </aside>
        </div>*/}
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
  );
};

export default DrivingTypes;