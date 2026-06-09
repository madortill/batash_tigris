import { useEffect, useState } from "react";
import "../../../style/UsesNav.css";

const UseHotspotPopup = ({ popup, onClose }) => {
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    setIsRevealed(false);
  }, [popup?.id]);

  if (!popup) return null;

  const isMiddleShootingHole = popup.id === "middle" && Boolean(popup.openImage);

  const isButtonRevealPopup =
    popup.requiresRevealBeforeClose && Boolean(popup.openImage);

  const hasRevealStep = isMiddleShootingHole || isButtonRevealPopup;

  const currentImage =
    hasRevealStep && isRevealed ? popup.openImage : popup.image;

  const currentButtonText =
    isButtonRevealPopup && !isRevealed
      ? popup.openText || "הראה מיקום"
      : popup.buttonText || "הבנתי";

  const handleImageClick = () => {
    if (isMiddleShootingHole && !isRevealed) {
      setIsRevealed(true);
    }
  };

  const handleButtonClick = () => {
    if (isButtonRevealPopup && !isRevealed) {
      setIsRevealed(true);
      return;
    }

    onClose();
  };

  return (
    <div className="uses-popup-overlay" onClick={onClose}>
      <div className="uses-popup-card" onClick={(e) => e.stopPropagation()}>
        <img
          src={currentImage}
          alt={popup.title || ""}
          className={`uses-popup-img ${
            isMiddleShootingHole && !isRevealed
              ? "uses-popup-img-clickable"
              : ""
          }`}
          onClick={handleImageClick}
        />

<h3 className="uses-popup-title">
  {isMiddleShootingHole && isRevealed
    ? popup.titleOpen || popup.title
    : popup.title}
</h3>
        {isMiddleShootingHole && !isRevealed && popup.openText && (
          <p className="uses-popup-text">{popup.openText}</p>
        )}

        {popup.text && <p className="uses-popup-text">{popup.text}</p>}

        <button
          type="button"
          className="uses-popup-btn"
          onClick={handleButtonClick}
        >
          {currentButtonText}
        </button>
      </div>
    </div>
  );
};

export default UseHotspotPopup;