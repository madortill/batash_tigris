
const DoorComponent = () => {
  // ניהול המצבים (States)
  const [openDoorAnimation, setOpenDoorAnimation] = useState(false);
  const [growAnimation, setGrowAnimation] = useState(false);
  const [showOpening, setShowOpening] = useState(true);
  const [explainBody, setExplainBody] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const arrayWording = ['פתיחה', 'הסבר פתיחה', 'טקסט גוף', 'הסבר גוף'];

  const openDoor = () => {
    setOpenDoorAnimation(true);
    setShowOpening(false);

    // טיימר להפעלת האנימציה הפנימית אחרי פתיחת הדלת
    setTimeout(() => {
      setGrowAnimation(true);
      setExplainBody(true);
      setShowButton(true);
    }, 1000);
  };

  const moveToSummary = () => {
    console.log("עובר לסיכום...");
  };

  return (
    <div className="container">
      {/* תפריט עליון - מוצג רק בהתחלה */}
      {showOpening && (
        <div className="wording-text-container">
          <h2 className="opening">{arrayWording[0]}</h2>
          <span className="arrow">⬅️</span>
          <h2 className="body">גוף</h2>
          <span className="arrow">⬅️</span>
          <h2 className="sum">סיכום</h2>
        </div>
      )}

      <div className="door-wrapper">
        {/* תוכן מאחורי הדלת */}
        <div className={`doorway ${growAnimation ? 'grow' : ''}`}>
          <p>{arrayWording[2]}</p>
          {explainBody && <p className="body-explanation">{arrayWording[3]}</p>}
          {showButton && <button onClick={moveToSummary}>ואז...</button>}
        </div>

        {/* הדלת עצמה */}
        <div 
          className={`door ${openDoorAnimation ? 'open-door' : ''}`} 
          onClick={openDoor}
        >
          <p>{arrayWording[0]}</p>
          <p className="opening-explanation">{arrayWording[1]}</p>
          <span></span> {/* ידית הדלת */}
        </div>
      </div>
    </div>
  );
};

export default DoorComponent;

// ---------------------------------------------------------------------------------------------------------
//style
// .door-wrapper {
//   position: relative;
//   width: 200px;
//   height: 300px;
//   perspective: 1000px; /* חשוב לאפקט התלת מימד */
//   margin: 50px auto;
// }

// .door {
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background-color: #f39c12;
//   border: 2px solid #d35400;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   cursor: pointer;
//   transition: transform 1.2s cubic-bezier(0.4, 0, 0.2, 1);
//   transform-origin: left; /* פתיחה מהצד */
//   z-index: 2;
// }

// .door.open-door {
//   transform: rotateY(-110deg);
// }

// .doorway {
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background-color: #ecf0f1;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   z-index: 1;
//   transition: transform 0.5s ease;
// }

// .grow {
//   transform: scale(1.1);
// }

// .wording-text-container {
//   display: flex;
//   justify-content: center;
//   gap: 10px;
//   align-items: center;
//   margin-bottom: 20px;
// }
