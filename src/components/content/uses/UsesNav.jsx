
import JeepInside from "./JeepInside"
import ChangingTire from "./JeepInside"
import { useData } from "../../../context/DataContext";
import { useState, useEffect } from "react";
import "../../../style/UsesNav.css"
import { useNavigate } from "react-router-dom";


const UsesNav= ({ changeToSection, startingPage }) => {
  const [page, setPage] = useState(() => startingPage ?? 0);
  const [startPage, setStartPage] = useState(0);
  const navigate = useNavigate();

  const { data } = useData();
  const pagesMap = {
    0: 0,
    1: 2,
    2: 0,
    3: 0,
  };


useEffect(() => {
  if (typeof startingPage === "number") {
    setPage(startingPage);
  } else {
    setPage(0);
  }
}, [startingPage]);

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
  console.log("Rendering SystemNav. Current page:", page, "Type of page:", typeof page);

  return (
    <div className='UsesNav'>
     {page === 0 && <JeepInside changeToPage={handleChangePage} changeToSection={handleChangeSection} />}
     {page === 1 && <ChangingTire changeToPage={handleChangePage} startPage={startPage} />}
     {/*{page == 2 && <DoorPage changeToPage={handleChangePage} changeToSection={handleChangeSection}/>}
     {/*{page == 3 && <BDriveA changeToPage={handleChangePage}/>}
     {page == 4 && <Gearbox changeToPage={handleChangePage}/>}
     {page == 5 && <GearboxTransfer changeToPage={handleChangePage} startPage={startPage}/>}
     {page == 6 && <HighlixDoors changeToPage={handleChangePage} changeToSection={handleChangeSection}/>} */}
     {page !== 0 && page !== 1 && page !== 2 && (
      <div style={{ color: "red", textAlign: "center", marginTop: "100px", fontSize: "20px" }}>
        <h3>שגיאת ניווט!</h3>
        <p>ניסית לגשת לעמוד מספר: <strong>{String(page)}</strong></p>
        <p>עמוד זה אינו קייםוד.</p>
        <button 
          onClick={() => handleChangePage(0)}
          style={{ padding: "10px 20px", marginTop: "10px", cursor: "pointer" }}
        >
          חזור לעמוד הראשי (0)
        </button>
      </div>
    )}
    </div>
  )
}

export default UsesNav; 