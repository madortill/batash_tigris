import  { useState } from "react";
import "../../../style/SystemNav.css";
import { useData } from "../../../context/DataContext";
import backBtn from "../../../assets/images/backBtn.svg";
import ABSCard from "../../../assets/images/ABSCard.svg";
import EXCard from "../../../assets/images/ABSCard.svg";
import TCCard from "../../../assets/images/ABSCard.svg";


const SystemTypes = ({ changeToPage})=> {
    
  const [canContinue, setCanContinue] =useState(false);
    const [isOpen, setIsOpen] = useState(false);
    
    const { data } = useData();
    const backBtnText= data.general[0].text;
    const nextBtn= data.general[1].text;

    const previousPage = () => {
    changeToPage(0);
  };
  const nextPage = () => {
    changeToPage(2);
  };
    return (
        <>
    <button
      className={`nextBtn tigris-next-btn ${!canContinue ? "nextBtnDisable" : ""}`}
      disabled={!canContinue}
      onClick={nextPage}>
      {nextBtn}
    </button>
      <div className="gal-locker-div">
                  <div className="textBox gear-gal" style={{ width: "clamp(12vw, 18vw, 44vw)"}}>
                    <p className="bubbleText">{currentTextGal}</p>
                </div>
              <img className="gal-locker-img" src={galGalgal} alt="galGalgal" />
            </div>

        </>
    );
};
export default SystemTypes;