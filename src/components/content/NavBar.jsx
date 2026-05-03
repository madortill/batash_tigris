import React from 'react'
import { useState } from "react";
import { useData } from "../context/DataContext";
import "../style/Navbar.css";

import TiresNavbar from "./TiresNavbar";

function NavBar({ navSection}) {
  return (
    <>
    <div className='navbar-wrapper'>
      <TiresNavbar contentStart={false} navSection={navSection} />
    </div>
    </>
  )
}

export default NavBar
