import React from "react";
import "../../../style/Navbar.css";

import TiresNavbar from "./TiresNavbar";

function NavBar({ currentSection, navSection, changeToSection }) {
  return (
    <div className="navbar-wrapper">
      <TiresNavbar
        contentStart={false}
        currentSection={currentSection}
        navSection={navSection}
        changeToSection={changeToSection}
      />
    </div>
  );
}

export default NavBar;