import React from 'react'
import "../../../style/TecnichalData.css";
import { useState, useEffect } from "react";
import TechnicalData from './TecnicalData.jsx';
import LicenseTigris from "./LicenseTigris.jsx" ;

const  TecnichalManager= ({ changeToSection, startingPage })=> {
  const [page, setPage] = useState(startingPage);
  const [startPage, setStartPage] = useState(0);
    const handleChangePage = (data) => {
      setStartPage(1);
      setPage(data);
    };
  return (
    <div className='TecnichalManager'>
      {page == 0 && <TechnicalData startPage={startPage}  onSendData={handleChangePage}/>}
      {page == 1 && <LicenseTigris  changeToSection={changeToSection} setPage={setPage}/>}
    </div>
  )
}
export default TecnichalManager;
