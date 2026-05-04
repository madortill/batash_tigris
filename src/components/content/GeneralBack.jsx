import React from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../../context/DataContext";

import FlipCard from "./FlipCard";
import FlipCardsGate from "./IsFliped";
import backBtn from "../../assets/images/backBtn.svg";

import fox from "../../assets/images/wolf.svg";
import madeInIsrael from "../../assets/images/hebrowIsrael.svg";
import target from "../../assets/images/target.svg";
import ford from "../../assets/images/ford.svg";
import clock from "../../assets/images/time.svg";

import NavBar from "./NavBar";
import "../../style/GeneralBack.css";

const GeneralBack = ({handleChangeSection}) => {

  const navigate = useNavigate();
  const { data } = useData();
  const pageData = data.GeneralBack;

  const backBtnText= data.general[0].text;
  const nextBtn= data.general[1].text;

  const cards = [
    {
      img: fox,
      backText: pageData.cards[0].text,
    },
    {
      img: madeInIsrael,
      backText: pageData.cards[1].text,
    },
    {
      img: target,
      backText: pageData.cards[2].text,
    },
    {
      img: ford,
      backText: pageData.cards[3].text,
    },
    {
      img: clock,
      backText: pageData.cards[4].text,
    },
  ];

  const nextPage = () => {
    handleChangeSection(2);
  };
  const previousPage = () => {
        handleChangeSection(0);
;
  };

  return (
    <div className="tigris-general-page">
      <h1 className="tigris-general-title">{pageData.title}</h1>

      <div className="backBtn">
              <img
                src={backBtn}
                alt="backBtn"
                className="backBtnImg"
                onClick={previousPage}
              />
              <p className="backBtnText">{backBtnText}</p>
            </div>

      <FlipCardsGate cards={cards}>
        {({ canContinue, handleSeen }) => (
          <>
            <div className="tigris-cards-grid">
              {cards.map((card, index) => (
                <FlipCard
                  key={index}
                  img={card.img}
                  backText={card.backText}
                  onSeen={() => handleSeen(index)}
                />
              ))}
            </div>

            <button
              className={`nextBtn tigris-next-btn ${
                !canContinue ? "nextBtnDisable" : ""
              }`}
              disabled={!canContinue}
              onClick={nextPage}
            >
              {nextBtn}
            </button>
          </>
        )}
      </FlipCardsGate>
    </div>
  );
};

export default GeneralBack;