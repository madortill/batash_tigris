import React from "react";
import "../../style/Content.css";
import { useState } from "react";
import { useData } from "../../context/DataContext";
import tigrisJeep from "../../assets/images/tigrisJeep.svg"
import TiresNavbar from "./navbar/TiresNavbar.jsx";
import JeepTracks from "./knowCar/JeepTracks.jsx";

const ContentStart=({ changeToSection })=> {
  const { data } = useData();
  const contentStartTitle = data.contentStart[0].text;
  return (
    <>
    <div className="ContentStart">
      <p className="content-start-title">{contentStartTitle}</p>
      <div className="svg-wrapper">
        <TiresNavbar className="navbar-start" contentStart={true} changeToSection={changeToSection}/>
      </div>
    </div>
        {/* <img src={tigrisJeep} className="jeep-start"></img> */}
        <JeepTracks/>
    </>
  );
}

export default ContentStart;
