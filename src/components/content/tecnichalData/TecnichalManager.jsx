import React from 'react'
import "../style/KnowCar.css";
import { useState, useEffect } from "react";
import Introduction from './Introduction';
import TechnicalData from './TechnicalData';
import IdTigris from "./IdTigris.jsx" ;

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
      {page == 1 && <IdTigris  changeToSection={changeToSection} setPage={setPage}/>}
    </div>
  )
}

export default TecnichalManager;
