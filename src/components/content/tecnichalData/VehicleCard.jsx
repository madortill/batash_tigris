import { useState } from "react";
import tigrisJeep from "../../../assets/images/idTigris.svg";
import "../../../style/TecnichalData.css";

export default function VehicleCard({ pageData, onFlipped }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    const next = !isFlipped;
    setIsFlipped(next);
    if (next && onFlipped) onFlipped(); // מאפשר כפתור הבא
  };

  return (
    <div className="vc-wrapper">

      {/* ── שרוך ── */}
      <div className="vc-lanyard" aria-hidden="true">
        <div className="vc-lanyard-left" />
        <div className="vc-lanyard-right" />
        <div className="vc-lanyard-knot" />
      </div>

      {/* ── כרטיס ── */}
      <div className="vc-scene" onClick={handleFlip}>
        <div className={`vc-body ${isFlipped ? "vc-body--flipped" : ""}`}>

          {/* פנים קדמי */}
          <div className="vc-face vc-face--front">
            <div className="vc-header">
            </div>
            <div className="vc-inner">
              <p className="vc-subtitle">{pageData.titleID}</p>
              <div className="vc-image-wrap">
                <img src={tigrisJeep} alt="טיגריס" className="vc-image" />
              </div>
              <span className="vc-flip-hint">↩</span>
            </div>
          </div>

        <div className="vc-face vc-face--back">
  <div className="vc-header">
    <span className="vc-header-text">{pageData.title}</span>
  </div>
  
  <div className="vc-inner">
    <p className="vc-subtitle">{pageData.titleID}</p>
    
    <div className="vc-image-wrap-back">
      <img src={tigrisJeep} alt="טיגריס" className="vc-image-back" />
    </div>

    <div className="vc-specs">
      {pageData.specs.map((spec, i) => (
        <div key={i} className={`vc-spec-row ${i % 2 === 0 ? "vc-spec-row--even" : ""}`}>
          <span className="vc-spec-label">{spec.label}</span>
          <span className="vc-spec-value">{spec.value}</span>
        </div>
      ))}
    </div>
  </div>
</div>

        </div>
      </div>
    </div>
  );
}