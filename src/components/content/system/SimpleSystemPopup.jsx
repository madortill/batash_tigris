

const SimpleSystemPopup = ({ type, data, onClose }) => {
  const isTC = type === "tc";

  return (
    <div className="sys-popup-overlay">
      <article className="sys-popup-card sys-simple-card">
        <h2 className="sys-simple-title">{data.title}</h2>

        <p className="sys-simple-text">{data.text}</p>

        {isTC && data.text2 && (
          <div className="sys-tc-extra">
            <span className="sys-tc-info-icon">i</span>
            <p>{data.text2}</p>
          </div>
        )}

        <button
          type="button"
          className="sys-popup-understood-btn"
          onClick={onClose}
        >
          {data.nextBtn || "הבנתי"}
        </button>
      </article>
    </div>
  );
};

export default SimpleSystemPopup;