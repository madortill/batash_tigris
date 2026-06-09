import { useState, useEffect } from "react"
import { useData } from "../../../context/DataContext";
import "../../../style/UsesNav.css";
import backBtn from "../../../assets/images/backBtn.svg";

import { useNavigate } from "react-router-dom";

const changingTire = ({changeToPage,startPage}) => {
  const { data } = useData();
  const navigate = useNavigate();
  const backBtnText = data?.general?.[0]?.text || "חזור";
  const nextBtn = data?.general?.[1]?.text || "הבא";
const pageData=data.changingWheel[0]; 
const title=pageData.title; 
const Semititle=pageData.text; 

  const previousPage = () => changeToPage(0);
    const nextPage = () => navigate("/end");

    return (
        <>
        <header className="changTire-page">
        <h1 className="tigris-general-title effect-underline">{title}</h1>
         <p className="Semititle-chang-wheel">{Semititle}</p>

      </header>

         <button className="nextBtn tigris-next-btn" onClick={nextPage}>
                {nextBtn}
              </button>
              <div className="backBtn" onClick={previousPage}>
                <img src={backBtn} alt="backBtn" className="backBtnImg" />
                <p className="backBtnText">{backBtnText}</p>
              </div>
        </>
    )
}
export default changingTire;