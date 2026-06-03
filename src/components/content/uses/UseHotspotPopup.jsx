import "../../../style/UsesNav.css";

const UseHotspotPopup = ({ popup, onClose }) => {
  if (!popup) return null;

  return (
    <div className="uses-popup-overlay" onClick={onClose}>
      <div className="uses-popup-card" onClick={(e) => e.stopPropagation()}>
        <img
          src={popup.image}
          alt={popup.title}
          className="uses-popup-img"
        />

        <h3 className="uses-popup-title">{popup.title}</h3>

        <button
          type="button"
          className="uses-popup-btn"
          onClick={onClose}
        >
          {popup.buttonText || "הבנתי"}
        </button>
      </div>
    </div>
  );
};

export default UseHotspotPopup;