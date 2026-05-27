import { useNavigate } from "react-router-dom";
import { useData } from "../../../context/DataContext";
import { useState } from "react";
import "../../../style/SystemNav.css"
import DrivingTypes from "./DrivingTypes.jsx";
import SystemTypes from "./SystemTypes.jsx";

const GearboxNav= ({ changeToSection, startingPage }) => {
  const [page, setPage] = useState(startingPage);
  const [startPage, setStartPage] = useState(0);
  const navigate = useNavigate();

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
  const pageExists =
    typeof targetPage === "number" &&
    pagesMap?.[targetPage] !== undefined &&
    pagesMap?.[targetPage] !== null;

  if (!pageExists) {
    navigate("/end");
    return;
  }

  setPage(targetPage);

  if (returnToLast) {
    setStartPage(pagesMap[targetPage]);
  } else {
    setStartPage(0);
  }
};

const handleChangeSection = (section, returnToLast = false) => {
  if (!changeToSection) {
    navigate("/end");
    return;
  }

  changeToSection(section, returnToLast);
};
  console.log("Rendering GearboxNav. Current page:", page, "Type of page:", typeof page);

  return (
    <div className='GearboxNav'>
     {page === 0 && <DrivingTypes changeToPage={handleChangePage} changeToSection={handleChangeSection} />}
     {page === 1 && <SystemTypes changeToPage={handleChangePage} startPage={startPage} />}
     {/*{page == 2 && <Lockers changeToPage={handleChangePage}/>}
     {page == 3 && <BDriveA changeToPage={handleChangePage}/>}
     {page == 4 && <Gearbox changeToPage={handleChangePage}/>}
     {page == 5 && <GearboxTransfer changeToPage={handleChangePage} startPage={startPage}/>}
     {page == 5 && <CarSystem changeToPage={handleChangePage}/>}
     {page == 6 && <HighlixDoors changeToPage={handleChangePage} changeToSection={handleChangeSection}/>} */}
    </div>
  )
}

export default GearboxNav; 