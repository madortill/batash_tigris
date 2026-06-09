import { useState } from "react";
import "../../../style/SystemDoor.css";

const OPEN_IMAGE_DELAY = 350;

const Door = ({
  doorImage,
  openDoorImage,
  innerImage,
  doorLabel,
  innerDoorLabel,
  hintText,
  annotationText,
  innerAnnotationText,
  onDoorOpened,
    shouldFlashHint = true,

}) => {
  const [isDoorOpen, setIsDoorOpen] = useState(false);
  const [showOpenImage, setShowOpenImage] = useState(false);

  // const toggleDoor = () => {
  //   if (isDoorOpen || showOpenImage) return;

  //   setShowOpenImage(true);
  //   onDoorOpened?.();

  //   setTimeout(() => {
  //     setIsDoorOpen(true);
  //     setShowOpenImage(false);
  //   }, OPEN_IMAGE_DELAY);
  // };
  const toggleDoor = () => {
  if (showOpenImage) return;

  if (isDoorOpen) {
    setIsDoorOpen(false);
    return;
  }

  setShowOpenImage(true);
  onDoorOpened?.();

  setTimeout(() => {
    setIsDoorOpen(true);
    setShowOpenImage(false);
  }, OPEN_IMAGE_DELAY);
};

  const currentLabel = isDoorOpen ? innerDoorLabel : doorLabel;
  const currentAnnotation = isDoorOpen
    ? innerAnnotationText || annotationText
    : annotationText;

  const displayedDoorImage = showOpenImage && openDoorImage
    ? openDoorImage
    : doorImage;

  return (
    <div className="door-scene">
      <button
        type="button"
        className="door-click-area"
        onClick={toggleDoor}
        aria-label={currentLabel}
      >
        <div className="door-wrapper">
          <div className={`doorway ${isDoorOpen ? "grow" : ""}`}>
            <div className="doorway-content">
              <img
                src={innerImage}
                alt={innerDoorLabel}
                className="door-inner-image"
              />
            </div>
          </div>

          <div
            className={`door ${
              isDoorOpen ? "open-door" : ""
            } ${showOpenImage ? "show-open-image" : ""}`}
          >
            <span className="door-front-face">
              <img
                src={displayedDoorImage}
                alt=""
                className="door-outer-image"
                aria-hidden="true"
              />
            </span>
          </div>
        </div>
      </button>

      {hintText && (
    <p
          className={`door-hint-text ${
            !shouldFlashHint ? "door-hint-text-press" : ""
          }`}
        >
          {hintText}
        </p>
      )}

      <p className="door-label">{currentLabel}</p>

      <div className="annotation">
        <span className="annotation-text">{currentAnnotation}</span>
        <div className="annotation-arrow" />
      </div>
    </div>
  );
};

export default Door;