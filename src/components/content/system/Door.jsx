import { useState } from "react";
import "../../../style/SystemDoor.css";

const Door = ({ doorImage, doorLabel, hintText, annotationText, onDoorOpened }) => {
  const [openDoorAnimation, setOpenDoorAnimation] = useState(false);
  const [growAnimation, setGrowAnimation]         = useState(false);
  const [showOpening, setShowOpening]             = useState(true);
 
  const openDoor = () => {
    if (openDoorAnimation) return;
    setOpenDoorAnimation(true);
    setShowOpening(false);
 
    setTimeout(() => {
      setGrowAnimation(true);
      if (onDoorOpened) onDoorOpened();
    }, 1000);
  };
 
    return (
    <>
      <div className="door-scene">
        <div className="door-wrapper">
          {/* ── תוכן מאחורי הדלת ── */}
          <div className={`doorway ${growAnimation ? "grow" : ""}`}>
            {growAnimation && (
              <div className="doorway-content">
                <img src={doorImage} alt={doorLabel} className="door-inner-image" />
              </div>
            )}
          </div>
   
          {/* ── הדלת עצמה ── */}
          <div
            className={`door ${openDoorAnimation ? "open-door" : ""}`}
            onClick={openDoor}
          >
            {/* 
            <div className="door-panel door-panel-top" />
            <div className="door-panel door-panel-bottom" />
            <div className="hinge hinge-top" />
            <div className="hinge hinge-bottom" />
            <div className="door-handle" />
            */}
          </div>
        </div>
   
        <p className="door-label">{doorLabel}</p>
        <div className="annotation">
          <span className="annotation-text">{annotationText}</span>
          <div className="annotation-arrow" />
        </div>
      </div>
    </>
  );
};
 
export default Door;
 