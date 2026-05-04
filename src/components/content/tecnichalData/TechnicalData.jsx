import React from "react";
import "../../../style/TecnichalData.css";
import { useState } from "react";
import { useData } from "../../../context/DataContext";
import backBtn from "../../../assets/images/backBtn.svg";
import galGalgal from "../../../assets/images/galGalgal.png";

function TechnicalData({ setPage, changeToSection }) {
  const { data } = useData();
  const nextBtn = data.general[1].text;
  const backBtnText = data.general[0].text;
  const tableData = data.TechnicalData[0].tableData;
  const technicalTitle = data.TechnicalData[1].title;

  const previousPage = () => {
    setPage(0);
  };

  const nextPage = () => {
    changeToSection(2);
  };

  return (
    <div className="TechnicalData">
      <div className="backBtn">
        <img
          src={backBtn}
          alt="backBtn"
          className="backBtnImg"
          onClick={previousPage}
        />
        <p className="backBtnText">{backBtnText}</p>
      </div>
      <p className="technicalData-title">{technicalTitle}</p>
      <table className="hover-table">
        <tbody>
          {tableData.map((row, rowIdx) => (
            <tr
              key={rowIdx}
              className={rowIdx >= 6 && rowIdx <= 8 ? "highlight-row" : ""}
            >
              {row.map((cellText, colIdx) => (
                <td
                  key={colIdx}
                  className={`
              ${rowIdx === 0 ? "first-row" : ""}
              ${rowIdx === 0 || colIdx === 0 ? "bold-cell" : ""}
            `}
                >
                  {cellText}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="galTechnical galBubble">
        <img
          src={data.TechnicalData[1].img}
          className="galTechnicalBubble"
          alt="galTechnicalBubble"
        />
        <img className="galTechnicalImg" src={galGalgal} alt="galGalgal" />
      </div>
      <button className="nextBtn" onClick={nextPage}>
        {nextBtn}
      </button>
    </div>
  );
}

export default TechnicalData;
