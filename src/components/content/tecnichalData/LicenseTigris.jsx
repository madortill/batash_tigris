
// VehicleCard.jsx
// קומפוננטה של כרטיס רכב עם אנימציית הפיכה
// הנתונים מגיעים מקובץ vehicles.json, מתוך המפתח שמועבר כ-prop (pageId)
import { useData } from "../../../context/DataContext";
import { useState, useEffect } from "react";
import vehiclesData from "../../../data/text.json"; // ← נתיב יחסי לפי מבנה הפרויקט שלך
import "../../../style/TecnichalData.css"
/* ─────────────────────────────────────────
   SVG placeholder של רכב (במקום תמונה אמיתית)
   — החלף ב-<img src={data.image} /> כשיש לך assets
───────────────────────────────────────── */
const VehicleSVG = () => (
  <svg className="vc-vehicle-svg" viewBox="0 0 220 90" xmlns="http://www.w3.org/2000/svg">
    {/* גוף */}
    <rect x="20" y="28" width="165" height="38" rx="8" fill="#2a5298" />
    {/* תא נהג */}
    <rect x="110" y="14" width="60" height="26" rx="5" fill="#1a3c6e" />
    {/* חלון */}
    <rect x="118" y="19" width="44" height="16" rx="3" fill="#a8c4e0" opacity="0.7" />
    {/* גריל */}
    <rect x="174" y="36" width="12" height="22" rx="4" fill="#0f2548" />
    {/* גלגלים */}
    <circle cx="55"  cy="68" r="14" fill="#0f2548" />
    <circle cx="55"  cy="68" r="7"  fill="#8899bb" />
    <circle cx="155" cy="68" r="14" fill="#0f2548" />
    <circle cx="155" cy="68" r="7"  fill="#8899bb" />
    {/* פס זהב */}
    <rect x="20" y="42" width="165" height="4" rx="2" fill="#c8a830" opacity="0.6" />
    {/* לוגו */}
    <polygon points="90,34 97,44 83,44" fill={COLORS.gold} opacity="0.9" />
  </svg>
);

/* ─────────────────────────────────────────
   TAB DEFINITIONS
───────────────────────────────────────── */
const SIDE_TABS = ["הגנה", "טנקים", "תותחים", "טילים", "מל\"טים", "שריון"];
const BOTTOM_TABS = ["נתוני טכניים", "היסטוריה", "סרטונים", "תמונות"];

/* ═══════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════ */
export default function VehicleCard({ pageId = "idTigris" }) {
  const [isFlipped, setIsFlipped]         = useState(false);
  const [activeSide, setActiveSide]       = useState("הגנה");
  const [activeBottom, setActiveBottom]   = useState("נתוני טכניים");

    const { data } = useData();
    const pageData = data.LicenseTigris;

  // טוען את הנתונים לפי ה-pageId


  // if (!data) {
  //   return <div style={{ color: "red", padding: 16 }}>שגיאה: לא נמצאו נתונים עבור "{pageId}"</div>;
  // }

  return (
    <div className="vc-wrapper">
      
      {/* ── Card + side tabs ── */}
      <div className="vc-card-container">
        {/* Side tabs */}
        <div className="vc-sidetabs" role="tablist" aria-label="קטגוריות">
          {SIDE_TABS.map(tab => (
            <button
              key={tab}
              role="tab"
              aria-selected={activeSide === tab}
              className={`vc-sidetab${activeSide === tab ? " active" : ""}`}
              onClick={() => setActiveSide(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* 3-D scene */}
        <div
          className="vc-scene"
          onClick={() => setIsFlipped(f => !f)}
          role="button"
          aria-pressed={isFlipped}
          aria-label={isFlipped ? "הצג חזית הכרטיס" : "הצג נתוני הרכב"}
        >
          <div className={`vc-card${isFlipped ? " flipped" : ""}`}>

            {/* ── FRONT FACE ── */}
            <div className="vc-face vc-front">
              <div className="vc-front-header">{data.title}</div>
              <div className="vc-front-body">
                {/* תמונת רכב — כשיש asset אמיתי: */}
                {/* <img src={data.image} alt={data.title} className="vc-vehicle-svg" /> */}
                <VehicleSVG />
                <div className="vc-flip-hint">
                  <div className="vc-flip-icon">↺</div>
                  <span>לחץ לצפייה בנתונים</span>
                </div>
              </div>
            </div>

            {/* ── BACK FACE ── */}
            <div className="vc-face vc-back">
              <div className="vc-back-header">
                {data.title}
                <div className="vc-back-dot" />
              </div>
              <div className="vc-specs-list" role="list" aria-label="מפרט טכני">
                {data.specs.map(({ label, value }) => (
                  <div key={label} className="vc-spec-row" role="listitem">
                    <span className="vc-spec-label">{label}</span>
                    <span className="vc-spec-value">{value}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── Bottom tabs ── */}
      <nav className="vc-bottom-nav" role="tablist" aria-label="סוגי תוכן">
        {BOTTOM_TABS.map(tab => (
          <button
            key={tab}
            role="tab"
            aria-selected={activeBottom === tab}
            className={`vc-nav-btn${activeBottom === tab ? " active" : ""}`}
            onClick={() => setActiveBottom(tab)}
          >
            {tab}
          </button>
        ))}
      </nav>

      {/* ── Back button ── */}
      <button className="vc-back-btn" onClick={() => window.history.back()}>
        ← הבא
      </button>
    </div>
  );
}