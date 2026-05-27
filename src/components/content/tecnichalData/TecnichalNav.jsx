import React from 'react'
import "../../../style/TecnichalData.css";
import { useState, useEffect } from "react";
import TechnicalData from './TecnicalData.jsx';
import LicenseTigris from "./LicenseTigris.jsx" ;

const  TecnichalNav= ({ changeToSection, startingPage })=> {

  const [page, setPage] = useState(startingPage);
  const [startPage, setStartPage] = useState(0);
  const [completedPages, setCompletedPages] = useState({});
    const handleChangePage = (data) => {
      setStartPage(1);
      setPage(data);
    };

const markPageCompleted = (pageName) => {
  setCompletedPages((prev) => ({
    ...prev,
    [pageName]: true,
  }));
};
  return (
    <div className='TecnichalNav'>
      {page == 0 && <TechnicalData startPage={startPage}  onSendData={handleChangePage} changeToSection={changeToSection}/>}
      {page == 1 && <LicenseTigris    setPage={setPage}
    changeToSection={changeToSection}
    isCompleted={!!completedPages.licenseTigris}
    onComplete={() => markPageCompleted("licenseTigris")} />}
    </div>
  )
}
export default TecnichalNav;
