import  { useState } from "react";
import "../../../style/GearBox.css";
import { useData } from "../../../context/DataContext";
import backBtn from "../../../assets/images/backBtn.svg";
import tigrisInside from "../../../assets/images/tigrisInside.svg";
import plus from "../../../assets/images/plusIcon.svg";
import galGalgal from "../../../assets/images/galGalgal.png";

const Gearbox = ({ changeToPage})=> {
    
  const [canContinue, setCanContinue] =useState(false);
    const [isOpen, setIsOpen] = useState(false);
    
    const { data } = useData();
    const backBtnText= data.general[0].text;
    const nextBtn= data.general[1].text;
    
    
    const pageData= data.Gearbox[5].GearboxPage;
    const title= pageData.title;
    const text= pageData.text;
    const galText = pageData.galText;
    const galTextAfter = pageData.textAfter;
    const [currentTextGal, setcurrentTextGal] = useState(galText);




  const previousPage = () => {
    changeToPage(3);
  };
  const nextPage = () => {
    changeToPage(5);
  };


  const handleCircleClick = (e) => {
    e.stopPropagation(); // מונע פתיחה של הזום ברקע
    // setCanContinue(true); 
    setcurrentTextGal(galTextAfter);
        setTimeout(() => {
    nextPage();
    }, 1500);
  };
return(
    <>
      <h1 className="tigris-general-title effect-box">{title}</h1> 
      <h4 className="lockers-semi-title">{text}</h4> 
     <div className="backBtn">
          <img
            src={backBtn}
            alt="backBtn"
            className="backBtnImg"
            onClick={previousPage}
            />
            <p className="backBtnText">{backBtnText}</p>
          </div>
      <div className="image-container">
          <img
        src={plus}
        alt="כפתור/תמונה"
        className="plus-image"
        onClick={() => setIsOpen(true)}
        />
      <img
        src={tigrisInside}
        alt="כפתור/תמונה"
        className="thumb-image"
        onClick={() => setIsOpen(true)}
      />
   <div 
          className="hotspot-circle" 
          onClick={handleCircleClick}
          title="לחץ כאן"
        >
          <div className="hotspot-core"></div>
        </div>

      {/* חלון הזום המוגדל (מופיע רק כשלוחצים) */}
      {isOpen && (
        <div className="zoom-overlay" onClick={() => setIsOpen(false)}>
          <img
            src={tigrisInside}
            alt="zoom"
            className="zoom-content"
            onClick={(e) => e.stopPropagation()} // מונע סגירה כשלוחצים על התמונה עצמה
          />
        </div>
      )}
    </div>
    <button
      className={`nextBtn tigris-next-btn ${
        !canContinue ? "nextBtnDisable" : ""
      }`}
      disabled={!canContinue}
      onClick={nextPage}
    >
      {nextBtn}
    </button>
      <div className="gal-locker-div">
                  <div className="textBox gear-gal" style={{ width: "clamp(12vw, 18vw, 44vw)"}}>
                    <p className="bubbleText">{currentTextGal}</p>
                </div>
              <img className="gal-locker-img" src={galGalgal} alt="galGalgal" />
            </div>
    </>
)

};
export default Gearbox;