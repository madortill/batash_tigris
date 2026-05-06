import { useNavigate } from "react-router-dom";
import { useData } from "../../../context/DataContext";
import Gearbox from "./Gearbox.jsx" 
import { useState } from "react";
import backBtn from "../../../assets/images/backBtn.svg";
import "../../../style/GearboxNav.css"


const GearboxNav= ({ changeToSection, startingPage }) => {
  const [page, setPage] = useState(startingPage);
  const [startPage, setStartPage] = useState(0);
  
  const { data } = useData();
  const pagesMap = {
    0: 0,
    1: 2,
    2: 0,
    3: 0,
    4: 1,
    5: 0,
    6: 0
  };
  const handleChangePage = (targetPage, returnToLast = false) => {
    setPage(targetPage);
    if (returnToLast) {
      setStartPage(pagesMap[targetPage]);
    } else {
      setStartPage(0);
    }
  };

  const handleChangeSection = (section, returnToLast = false) => {
    if (changeToSection) changeToSection(section, returnToLast);
  };
  return (
    <div className='GearboxNav'>
     {page == 0 && <Gearbox changeToPage={handleChangePage} changeToSection={handleChangeSection} />}
     {/* {page == 1 && <HighlixVideo changeToPage={handleChangePage} startPage={startPage} />} */}
     {/* {page == 2 && <FrontSeren changeToPage={handleChangePage}/>}
     {page == 3 && <SwitchBoard changeToPage={handleChangePage}/>}
     {page == 4 && <Handbrake changeToPage={handleChangePage} startPage={startPage}/>}
     {page == 5 && <CarSystem changeToPage={handleChangePage}/>}
     {page == 6 && <HighlixDoors changeToPage={handleChangePage} changeToSection={handleChangeSection}/>} */}
    </div>
  )
}

export default GearboxNav;