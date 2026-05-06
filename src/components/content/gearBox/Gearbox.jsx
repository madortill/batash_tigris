import {useState} from "react";
import { useData } from "../../../context/DataContext";
import "../../../style/GearboxNav.css"
import backBtn from "../../../assets/images/backBtn.svg";

const  GearBox= ({changeToSection, changeToPage})=> {
    
    const [canContinue, setCanContinue] =useState(false);
      const { data } = useData();
    const pageData = data.Gearbox;
  const nextBtn = data.general[1].text;
  const backBtnText = data.general[0].text;
  const title = pageData[0].title;


  const previousPage = () => {
    changeToSection(2, true);
  };
  const nextPage = () => {
    changeToPage(1);
  };
    return (
        <div className="tigris-general-page">
      <h1 className="tigris-general-title effect-box">{title}</h1>
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
    </div>

    );
}
export default GearBox;  