import {useState} from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../../../context/DataContext";


  const { data } = useData();
  const pageData = data.Gearbox;
  

function GearBox({changeToSection, changeToPage}) {
    const { data } = useData();
  const nextBtn = data.general[1].text;
  const backBtnText = data.general[0].text;
  const title = data.Gearbox[0].title;


  const previousPage = () => {
    changeToSection(2, true);
  };
  const nextPage = () => {
    changeToPage(1);
  };

    return (

        <div className="tigris-general-page">
      <h1 className="tigris-general-title effect-underline">{pageData.title}</h1>

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