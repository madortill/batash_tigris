
import React from "react";
import "../../style/Content.css";
import { useState } from "react";
import ContentStart from "./ContentStart";
import GeneralBack from "./GeneralBack.jsx";

function Content() {
  const [section, setSection] = useState(0);
  const [sectionStartPages, setSectionStartPages] = useState({});
  const [navSection, setNavSection] = useState(0);
  const SECTION_RETURN_PAGE_MAP = {
    1: 7,
    2: 3,
    3: 8
  };
  const handleChangeSection = (targetSection, returnToLast = false) => {
    // חזרה לתפריט הראשי
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
          startingPage={sectionStartPages[1] ?? 0}/>}
      {/* {section == 2 && (
        <Practices
          changeToSection={handleChangeSection}
          startingPage={sectionStartPages[2] ?? 0}
        />
      )}
      {section == 3 && <SpecialConditions changeToSection={handleChangeSection}
          startingPage={sectionStartPages[3] ?? 0}/>}
          {section == 4 && <Summary changeToSection={handleChangeSection}/>}
      {section !== 0 && (
        <NavBar navSection={navSection} setNavSection={setNavSection} />
      )} */}
    </div>
  );
}

export default Content;
