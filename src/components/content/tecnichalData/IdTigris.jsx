
// VehicleCard.jsx
// קומפוננטה של כרטיס רכב עם אנימציית הפיכה
// הנתונים מגיעים מקובץ vehicles.json, מתוך המפתח שמועבר כ-prop (pageId)

import { useState, useEffect } from "react";
import vehiclesData from "./vehicles.json"; // ← נתיב יחסי לפי מבנה הפרויקט שלך

/* ─────────────────────────────────────────
   קבועי עיצוב — שינוי כאן משפיע על הכל
───────────────────────────────────────── */
const COLORS = {
  navy:      "#1a3c6e",
  navyDark:  "#0f2548",
  navyLight: "#2a5298",
  gold:      "#c8a830",
  goldLight: "#e8c84a",
  cream:     "#f5f0e8",
  lightBg:   "#eef2f9",
  rowEven:   "#f8fafd",
  rowOdd:    "#ffffff",
  text:      "#1a2840",
  muted:     "#6b7a9b",
  white:     "#ffffff",
};

/* ─────────────────────────────────────────
   CSS-in-JS styles (ללא תלות חיצונית)
   כדאי להעביר ל-CSS Modules / Tailwind
   בפרויקט אמיתי
───────────────────────────────────────── */
const injectStyles = () => {
  if (document.getElementById("vc-styles")) return;
  const style = document.createElement("style");
  style.id = "vc-styles";
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Heebo:wght@400;500;700;900&display=swap');

    /* ── wrapper ── */
    .vc-wrapper {
      direction: rtl;
      font-family: 'Heebo', sans-serif;
      min-height: 100dvh;
      background: ${COLORS.lightBg};
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 24px 16px 40px;
      gap: 24px;
    }

    /* ── top bar ── */
    .vc-topbar {
      width: 100%;
      max-width: 400px;
      background: ${COLORS.navy};
      border-radius: 14px;
      padding: 14px 18px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-shadow: 0 4px 20px rgba(26,60,110,0.25);
    }
    .vc-topbar-title {
      color: ${COLORS.white};
      font-size: 18px;
      font-weight: 700;
      letter-spacing: 0.5px;
    }
    .vc-topbar-sound {
      width: 36px; height: 36px;
      border-radius: 50%;
      background: rgba(255,255,255,0.12);
      border: none;
      cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      transition: background 0.2s;
    }
    .vc-topbar-sound:hover { background: rgba(255,255,255,0.22); }

    /* ── scene / 3-D card ── */
    .vc-scene {
      width: 340px;
      height: 250px;
      perspective: 1100px;
      cursor: pointer;
    }

    .vc-card {
      width: 100%; height: 100%;
      position: relative;
      transform-style: preserve-3d;
      transition: transform 0.72s cubic-bezier(0.4, 0.15, 0.2, 1.0);
      border-radius: 18px;
      filter: drop-shadow(0 8px 24px rgba(26,60,110,0.22));
    }
    .vc-card.flipped { transform: rotateY(180deg); }

    /* ── shared face styles ── */
    .vc-face {
      position: absolute;
      inset: 0;
      border-radius: 18px;
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
      overflow: hidden;
    }

    /* ── FRONT ── */
    .vc-front {
      background: ${COLORS.white};
      border: 2px solid ${COLORS.navy};
      display: flex;
      flex-direction: column;
    }
    .vc-front-header {
      background: ${COLORS.navy};
      color: ${COLORS.white};
      font-size: 16px;
      font-weight: 700;
      text-align: center;
      padding: 11px 16px;
      letter-spacing: 0.4px;
    }
    .vc-front-body {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 14px;
      padding: 16px;
      background: linear-gradient(160deg, #f8f9ff 0%, #eef3fc 100%);
    }

    /* placeholder רכב (SVG inline) */
    .vc-vehicle-svg {
      width: 180px;
      filter: drop-shadow(0 4px 8px rgba(26,60,110,0.18));
      animation: vc-float 3.6s ease-in-out infinite;
    }
    @keyframes vc-float {
      0%, 100% { transform: translateY(0); }
      50%       { transform: translateY(-5px); }
    }

    .vc-flip-hint {
      display: flex;
      align-items: center;
      gap: 6px;
      color: ${COLORS.muted};
      font-size: 12px;
    }
    .vc-flip-icon {
      width: 22px; height: 22px;
      border: 1.5px solid ${COLORS.muted};
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-size: 13px;
      animation: vc-spin-hint 4s ease-in-out infinite;
    }
    @keyframes vc-spin-hint {
      0%, 75%  { transform: rotateY(0deg); }
      88%      { transform: rotateY(180deg); }
      100%     { transform: rotateY(180deg); }
    }

    /* ── BACK ── */
    .vc-back {
      background: ${COLORS.white};
      border: 2px solid ${COLORS.navy};
      transform: rotateY(180deg);
      display: flex;
      flex-direction: column;
    }
    .vc-back-header {
      background: ${COLORS.navyDark};
      color: ${COLORS.white};
      font-size: 15px;
      font-weight: 700;
      text-align: center;
      padding: 10px 16px;
      position: relative;
      letter-spacing: 0.4px;
    }
    .vc-back-dot {
      position: absolute;
      top: 50%; right: 14px;
      transform: translateY(-50%);
      width: 9px; height: 9px;
      background: ${COLORS.gold};
      border-radius: 50%;
      animation: vc-pulse 1.6s ease-in-out infinite;
    }
    @keyframes vc-pulse {
      0%, 100% { opacity: 1; transform: translateY(-50%) scale(1); }
      50%       { opacity: 0.5; transform: translateY(-50%) scale(1.45); }
    }

    .vc-specs-list {
      flex: 1;
      overflow-y: auto;
      scrollbar-width: none;
    }
    .vc-specs-list::-webkit-scrollbar { display: none; }

    .vc-spec-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 7px 16px;
      font-size: 13px;
      border-bottom: 1px solid rgba(26,60,110,0.07);
      opacity: 0;
      transform: translateX(14px);
      transition: opacity 0.32s ease, transform 0.32s ease;
    }
    /* ── stagger: כל שורה נכנסת אחרי ההפיכה ── */
    .vc-card.flipped .vc-spec-row { opacity: 1; transform: translateX(0); }
    .vc-spec-row:nth-child(1)  { transition-delay: 0.30s; }
    .vc-spec-row:nth-child(2)  { transition-delay: 0.37s; }
    .vc-spec-row:nth-child(3)  { transition-delay: 0.44s; }
    .vc-spec-row:nth-child(4)  { transition-delay: 0.51s; }
    .vc-spec-row:nth-child(5)  { transition-delay: 0.58s; }
    .vc-spec-row:nth-child(6)  { transition-delay: 0.65s; }
    .vc-spec-row:nth-child(7)  { transition-delay: 0.72s; }
    .vc-spec-row:nth-child(8)  { transition-delay: 0.79s; }
    .vc-spec-row:nth-child(even) { background: ${COLORS.rowEven}; }

    .vc-spec-label { color: ${COLORS.muted}; font-size: 12.5px; }
    .vc-spec-value {
      font-weight: 700;
      color: ${COLORS.navy};
      font-size: 13px;
      direction: ltr;
      background: rgba(26,60,110,0.06);
      padding: 2px 8px;
      border-radius: 6px;
    }

    /* ── side tabs ── */
    .vc-sidetabs {
      position: absolute;
      left: -38px;
      top: 50%;
      transform: translateY(-50%);
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .vc-sidetab {
      width: 34px; height: 34px;
      border-radius: 8px;
      background: ${COLORS.navy};
      border: none;
      cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      font-size: 9px;
      color: rgba(255,255,255,0.7);
      writing-mode: vertical-rl;
      text-orientation: mixed;
      transition: background 0.2s, transform 0.15s;
      font-family: 'Heebo', sans-serif;
    }
    .vc-sidetab.active {
      background: ${COLORS.gold};
      color: ${COLORS.navyDark};
      font-weight: 700;
    }
    .vc-sidetab:hover:not(.active) {
      background: ${COLORS.navyLight};
      transform: scaleX(1.08);
    }

    /* ── card container (relative, so sidetabs can be absolute) ── */
    .vc-card-container {
      position: relative;
      width: 340px;
    }

    /* ── bottom nav ── */
    .vc-bottom-nav {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      justify-content: center;
    }
    .vc-nav-btn {
      padding: 8px 20px;
      border-radius: 22px;
      border: 1.5px solid ${COLORS.navy};
      background: transparent;
      color: ${COLORS.navy};
      font-size: 14px;
      font-weight: 500;
      font-family: 'Heebo', sans-serif;
      cursor: pointer;
      transition: all 0.22s;
    }
    .vc-nav-btn.active {
      background: ${COLORS.navy};
      color: ${COLORS.white};
      box-shadow: 0 3px 10px rgba(26,60,110,0.3);
    }
    .vc-nav-btn:hover:not(.active) {
      background: rgba(26,60,110,0.07);
    }

    /* ── back button ── */
    .vc-back-btn {
      padding: 10px 28px;
      border-radius: 12px;
      background: ${COLORS.navy};
      color: ${COLORS.white};
      font-size: 15px;
      font-weight: 700;
      font-family: 'Heebo', sans-serif;
      border: none;
      cursor: pointer;
      box-shadow: 0 4px 14px rgba(26,60,110,0.28);
      transition: transform 0.15s, box-shadow 0.15s;
    }
    .vc-back-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 18px rgba(26,60,110,0.35); }
    .vc-back-btn:active { transform: translateY(0); }
  `;
  document.head.appendChild(style);
};

/* ─────────────────────────────────────────
   SVG placeholder של רכב (במקום תמונה אמיתית)
   — החלף ב-<img src={data.image} /> כשיש לך assets
───────────────────────────────────────── */
const VehicleSVG = () => (
  <svg className="vc-vehicle-svg" viewBox="0 0 220 90" xmlns="http://www.w3.org/2000/svg">
    {/* גוף */}
    <rect x="20" y="28" width="165" height="38" rx="8" fill={COLORS.navyLight} />
    {/* תא נהג */}
    <rect x="110" y="14" width="60" height="26" rx="5" fill={COLORS.navy} />
    {/* חלון */}
    <rect x="118" y="19" width="44" height="16" rx="3" fill="#a8c4e0" opacity="0.7" />
    {/* גריל */}
    <rect x="174" y="36" width="12" height="22" rx="4" fill={COLORS.navyDark} />
    {/* גלגלים */}
    <circle cx="55"  cy="68" r="14" fill={COLORS.navyDark} />
    <circle cx="55"  cy="68" r="7"  fill="#8899bb" />
    <circle cx="155" cy="68" r="14" fill={COLORS.navyDark} />
    <circle cx="155" cy="68" r="7"  fill="#8899bb" />
    {/* פס זהב */}
    <rect x="20" y="42" width="165" height="4" rx="2" fill={COLORS.gold} opacity="0.6" />
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

  // טוען את הנתונים לפי ה-pageId
  const data = vehiclesData[pageId];

  // מזריק CSS פעם אחת
  useEffect(() => { injectStyles(); }, []);

  if (!data) {
    return <div style={{ color: "red", padding: 16 }}>שגיאה: לא נמצאו נתונים עבור "{pageId}"</div>;
  }

  return (
    <div className="vc-wrapper">
      {/* ── Top bar ── */}
      <div className="vc-topbar">
        <span className="vc-topbar-title">{activeBottom}</span>
        <button className="vc-topbar-sound" aria-label="הפעל קול">
          {/* speaker icon */}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
          </svg>
        </button>
      </div>

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