import  { useState } from "react";
import "../../../style/GearboxNav.css";
import { useData } from "../../../context/DataContext";
import backBtn from "../../../assets/images/backBtn.svg";
import locker from "../../../assets/images/locker.svg";

const Lockers = ({ })=> {
    
  const [canContinue, setCanContinue] =useState(false);

  const backBtnText= data.general[0].text;
  const nextBtn= data.general[1].text;
  const { data } = useData();

  const pageData = data.Lokers;


  const previousPage = () => {
    changeToPage(2);
  };
  const nextPage = () => {
    changeToPage(4);
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
               <p className="technicalData-title effect-underline">{pageData.title}</p>


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
export default Lockers;