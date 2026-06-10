
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
const [sectionStartPages, setSectionStartPages] = useState(() => {
  try {
    return JSON.parse(localStorage.getItem("tigrisStartPages")) || {};
  } catch {
    return {};
  }
});

useEffect(() => {
  localStorage.setItem("tigrisStartPages", JSON.stringify(sectionStartPages));
}, [sectionStartPages]);  // const [navSection, setNavSection] = useState(0);

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


const [completedSections, setCompletedSections] = useState(() => {
  try {
    return JSON.parse(localStorage.getItem("tigrisCompletedSections")) || {};
  } catch {
    return {};
  }
});

useEffect(() => {
  localStorage.setItem(
    "tigrisCompletedSections",
    JSON.stringify(completedSections)
  );
}, [completedSections]);
  const SECTION_RETURN_PAGE_MAP = {
    1: 0,
    2: 1,
    3: 6,
    4: 2,
    5: 1
  };
  const markSectionCompleted = (sectionNumber) => {
  setCompletedSections((prev) => ({
    ...prev,
    [sectionNumber]: true,
  }));
};

//   const handleChangeSection = (targetSection, returnToLast = false) => {
//   if (targetSection === 6) {
//     setSection(0);
//     return;
//   }

//   setSection(targetSection);

//   setSectionStartPages((prev) => {
//     if (returnToLast) {
//       return {
//         ...prev,
//         [targetSection]:
//           prev[targetSection] ?? SECTION_RETURN_PAGE_MAP[targetSection] ?? 0,
//       };
//     }

//     return {
//       ...prev,
//       [targetSection]: 0,
//     };
//   });

//   setNavSection((prev) => (targetSection > prev ? targetSection : prev));
// };
const [lastPagesBySection, setLastPagesBySection] = useState(() => {
  try {
    return JSON.parse(localStorage.getItem("tigrisLastPagesBySection")) || {};
  } catch {
    return {};
  }
});

useEffect(() => {
  localStorage.setItem(
    "tigrisLastPagesBySection",
    JSON.stringify(lastPagesBySection)
  );
}, [lastPagesBySection]);


const handleChangeSection = (targetSection, returnToLast = false) => {
  if (targetSection === 6) {
    setSection(0);
    return;
  }

  const startPage = returnToLast
    ? lastPagesBySection[targetSection] ?? SECTION_RETURN_PAGE_MAP[targetSection] ?? 0
    : 0;

  setSectionStartPages((prev) => ({
    ...prev,
    [targetSection]: startPage,
  }));

  setSection(targetSection);

  setNavSection((prev) => (targetSection > prev ? targetSection : prev));
};


const saveLastPageInSection = (sectionNumber, pageNumber) => {
  setLastPagesBySection((prev) => ({
    ...prev,
    [sectionNumber]: pageNumber,
  }));
};
  return (
    <div className="content">
      {section === 0 && <ContentStart changeToSection={handleChangeSection} />}
     {section === 1 && <GeneralBack changeToSection={handleChangeSection}
          startingPage={sectionStartPages[1] ?? 0}
           isCompleted={!!completedSections[1]}
    onComplete={() => markSectionCompleted(1)}
      onPageChange={(pageNumber) => saveLastPageInSection(1, pageNumber)}
/>}
      {section === 2 && (
        <TecnichalManager
          changeToSection={handleChangeSection}
          startingPage={sectionStartPages[2] ?? 0}
            onPageChange={(pageNumber) => saveLastPageInSection(2, pageNumber)}

        />
      )}
      {section === 3 && <GearboxNav changeToSection={handleChangeSection}
          startingPage={sectionStartPages[3] ?? 0}
            onPageChange={(pageNumber) => saveLastPageInSection(3, pageNumber)}
/>}

          {section === 4 && (
            <SystemNav 
              changeToSection={handleChangeSection}
              startingPage={sectionStartPages[4] ?? 0} 
                  onPageChange={(pageNumber) => saveLastPageInSection(4, pageNumber)}

            />
          )}      
              {section === 5 && (
          <Uses
            changeToSection={handleChangeSection}
            startingPage={sectionStartPages[5] ?? 0}
            onPageChange={(pageNumber) => saveLastPageInSection(5, pageNumber)}
          />
        )}
              {section == 6 && <End changeToSection={handleChangeSection} />}
      
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

