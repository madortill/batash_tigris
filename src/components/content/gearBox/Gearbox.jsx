import  { useState } from "react";
import "../../../style/GearboxNav.css";
import { useData } from "../../../context/DataContext";
import backBtn from "../../../assets/images/backBtn.svg";

const Gearbox = ({ changeToPage})=> {
    
  const [canContinue, setCanContinue] =useState(false);
  
  const { data } = useData();
  const backBtnText= data.general[0].text;
  const nextBtn= data.general[1].text;



  const previousPage = () => {
    changeToPage(1);
  };
  const nextPage = () => {
    changeToPage(3);
  };


return(
    <>
     <div className="backBtn">
          <img
            src={backBtn}
            alt="backBtn"
            className="backBtnImg"
            onClick={previousPage}
            />
            <p className="backBtnText">{backBtnText}</p>
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
    </>
)

}
export default Gearbox;