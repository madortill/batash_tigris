import "../../../style/UsesNav.css";
import { useState, useEffect } from "react";

const UseHotspotPopup = ({ popup, onClose }) => {
  const [isShootingOpen, setIsShootingOpen] = useState(false);

  useEffect(() => {
    setIsShootingOpen(false);
  }, [popup]);

  if (!popup) return null;

  const isShootingPopup = popup.id === "middle";
  const shouldShowShootingIntro = isShootingPopup && !isShootingOpen;

  const currentImage =
    isShootingPopup && isShootingOpen && popup.openImage
      ? popup.openImage
      : popup.image;

  const handleOpenShooting = () => {
    if (isShootingPopup && !isShootingOpen) {
      setIsShootingOpen(true);
    }
  };

  return (
    <div className="uses-popup-overlay" onClick={onClose}>
      <div className="uses-popup-card" onClick={(e) => e.stopPropagation()}>
        <div className="uses-popup-img-wrap">
          <img
            src={currentImage}
            alt={popup.title}
            className="uses-popup-img"
          />

          {shouldShowShootingIntro && (
            <button
              type="button"
              className="uses-popup-image-click-zone"
              onClick={handleOpenShooting}
              aria-label={popup.openText || "לחצו לפתיחת חור הירי"}
            />
          )}
        </div>

        <h3 className="uses-popup-title">{popup.title}</h3>

        {shouldShowShootingIntro ? (
          <p className="uses-popup-shooting-text">
            {popup.openText || "לחצו לפתיחת חור הירי"}
          </p>
        ) : (
          <button
            type="button"
            className="uses-popup-btn"
            onClick={onClose}
          >
            {popup.buttonText || "הבנתי"}
          </button>
        )}
      </div>
    </div>
  );
};

export default UseHotspotPopup;