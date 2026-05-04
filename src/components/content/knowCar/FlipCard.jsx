import React, { useState } from "react";
import "../../../style/GeneralBack.css";

function FlipCard({ img, backText, onSeen, className = "" }) {
  const [flipped, setFlipped] = useState(false);
  const [reported, setReported] = useState(false);

  const handleFlip = () => {
    setFlipped(true);

    if (!reported) {
      setReported(true);
      onSeen?.();
    }
  };

  return (
    <div
      className={`flip-card ${flipped ? "flipped" : ""} ${className}`}
      onMouseEnter={handleFlip}
      onClick={handleFlip}
    >
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <img src={img} alt="" className="flip-card-img" />
        </div>

        <div className="flip-card-back">
          <p>{backText}</p>
        </div>
      </div>
    </div>
  );
}

export default FlipCard;