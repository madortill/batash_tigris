import { useNavigate } from "react-router-dom";
import { useData } from "../../../context/DataContext";
import Selectbox from "./Selectbox.jsx" 
import { useState, useEffect } from "react";
import "../../../style/GearboxNav.css"
import TransferCaseBox from "./TransferCaseBox.jsx";
import Gearbox from "./Gearbox.jsx";
import Lockers from "./Lockers.jsx";
import BDriveA from "./BDriveA.jsx";
import GearboxTransfer from "./GearboxTransfer.jsx";

const GearboxNav = ({ changeToSection, startingPage = 0, onPageChange }) => {
    const [page, setPage] = useState(startingPage);
  const [startPage, setStartPage] = useState(0);
  useEffect(() => {
  setPage(startingPage);
}, [startingPage]);
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
  onPageChange?.(targetPage);

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
     {page === 0 && (
  <Selectbox
    changeToPage={handleChangePage}
    changeToSection={handleChangeSection}
    step="first"
  />
)}
     {page == 1 && <Gearbox changeToPage={handleChangePage}/>}
     {page == 2 && <GearboxTransfer changeToPage={handleChangePage}/>}
          {page === 3 && (
        <Selectbox
          changeToPage={handleChangePage}
          changeToSection={handleChangeSection}
          step="second"
        />
      )}
     {page === 4 && <TransferCaseBox changeToPage={handleChangePage} startPage={startPage} />}
     {page == 5 && <Lockers changeToPage={handleChangePage}/>}
     {page == 6 && <BDriveA changeToPage={handleChangePage} startPage={startPage} changeToSection={handleChangeSection}/>}
     {/*{page == 5 && <CarSystem changeToPage={handleChangePage}/>}
     {page == 6 && <HighlixDoors changeToPage={handleChangePage} changeToSection={handleChangeSection}/>} */}
    </div>
  )
}

export default GearboxNav;