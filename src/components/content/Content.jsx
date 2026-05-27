
import React from "react";
import "../../style/Content.css";
import { useState,useEffect } from "react";
import ContentStart from "./ContentStart";
import GeneralBack from "./knowCar/GeneralBack.jsx";
import NavBar from "./navbar/NavBar.jsx";
import TecnichalManager from "./tecnichalData/TecnichalNav.jsx";
import GearboxNav from "./gearBox/GearboxNav.jsx"
import SystemNav from "./system/SystemNav.jsx"
import Uses from "./uses/UsesNav.jsx"

const  Content= () => {
  // const [section, setSection] = useState(0);
  const [sectionStartPages, setSectionStartPages] = useState({});
  // const [navSection, setNavSection] = useState(0);

  const [section, setSection] = useState(() => {
  return Number(localStorage.getItem("tigrisSection")) || 0;
});

const [navSection, setNavSection] = useState(() => {
  return Number(localStorage.getItem("tigrisNavSection")) || 0;
});

useEffect(() => {
  localStorage.setItem("tigrisSection", String(section));
}, [section]);

useEffect(() => {
  localStorage.setItem("tigrisNavSection", String(navSection));
}, [navSection]);

  const [completedSections, setCompletedSections] = useState({});
  const SECTION_RETURN_PAGE_MAP = {
    1: 0,
    2: 1,
    3: 5,
    4: 0,
    5: 0
  };
  const markSectionCompleted = (sectionNumber) => {
  setCompletedSections((prev) => ({
    ...prev,
    [sectionNumber]: true,
  }));
};
  const handleChangeSection = (targetSection, returnToLast = false) => {
    if (targetSection === 6) {
      setSection(0);
      return;
    }

    setSection(targetSection);

    setSectionStartPages((prev) => ({
      ...prev,
      [targetSection]: returnToLast 
        ? SECTION_RETURN_PAGE_MAP[targetSection] ?? 0
        : 0,
    }));

    setNavSection((prev) => (targetSection > prev ? targetSection : prev));
  };
  return (
    <div className="content">
      {section == 0 && <ContentStart changeToSection={handleChangeSection} />}
     {section == 1 && <GeneralBack changeToSection={handleChangeSection}
          startingPage={sectionStartPages[1] ?? 0}
           isCompleted={!!completedSections[1]}
    onComplete={() => markSectionCompleted(1)}/>}
      {section == 2 && (
        <TecnichalManager
          changeToSection={handleChangeSection}
          startingPage={sectionStartPages[2] ?? 0}
        />
      )}
      {section == 3 && <GearboxNav changeToSection={handleChangeSection}
          startingPage={sectionStartPages[3] ?? 0}/>}

          {section == 4 && <SystemNav changeToSection={handleChangeSection}/>}
          {section == 5 && <Uses changeToSection={handleChangeSection}/>}
      
      {section !== 0 && (
        <NavBar
          currentSection={section}
          navSection={navSection}
          changeToSection={handleChangeSection}
        />
      )}
    </div>
  );
}

export default Content;
