import { useEffect, useMemo, useState } from "react";
import "../../../style/SystemNav.css";
import { useData } from "../../../context/DataContext";

import backBtn from "../../../assets/images/backBtn.svg";

import ABSCard from "../../../assets/images/ABSCard.svg";
import EXCard from "../../../assets/images/ABSCard.svg";
import TCCard from "../../../assets/images/ABSCard.svg";

import SystemPopup from "./SystemPopup";

const SYSTEM_COMPLETED_KEY = "systemTypesCompletedCards";

const SystemTypes = ({ changeToPage, isCompleted = false, onComplete }) => {
  const { data } = useData();


  const pageData = data.System[1];

  const backBtnText = data.general?.[0]?.text;
  const nextBtn = data.general?.[1]?.text;

  const title = pageData.title;
  const subTitle = pageData.Semititle;
  const ui = pageData.ui || {};
  const cardTitles = pageData.cards || {};

  const cards = useMemo(
    () => [
      {
        id: "exhaust",
        img: EXCard,
        title: cardTitles.EB,
        popupData: pageData.EB,
      },
      {
        id: "abs",
        img: ABSCard,
        title: cardTitles.AntiBrake,
        popupData: pageData.AntiBrake,
      },
      {
        id: "tc",
        img: TCCard,
        title: cardTitles.TC,
        popupData: pageData.TC,
      },
    ],
    [pageData, cardTitles]
  );

  const [activeIndex, setActiveIndex] = useState(1);
  const [activePopupId, setActivePopupId] = useState(null);

  const [completedCards, setCompletedCards] = useState(() => {
    if (isCompleted) return ["exhaust", "abs", "tc"];

    try {
      return JSON.parse(localStorage.getItem(SYSTEM_COMPLETED_KEY)) || [];
    } catch {
      return [];
    }
  });

  const canContinue = completedCards.length === cards.length;

  useEffect(() => {
    localStorage.setItem(SYSTEM_COMPLETED_KEY, JSON.stringify(completedCards));

    if (completedCards.length === cards.length) {
      onComplete?.();
    }
  }, [completedCards, cards.length, onComplete]);

  const handlePrevCard = () => {
    setActiveIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNextCard = () => {
    setActiveIndex((prev) => Math.min(prev + 1, cards.length - 1));
  };
const openSystemPopup = (cardId) => {
  console.log("clicked popup:", cardId, "activeIndex:", activeIndex);
  setActivePopupId(cardId);
};

  const closeSystemPopup = () => {
    setCompletedCards((prev) => {
      if (!activePopupId || prev.includes(activePopupId)) return prev;
      return [...prev, activePopupId];
    });

    setActivePopupId(null);
  };

  const activePopupCard = cards.find((card) => card.id === activePopupId);

  return (
    <div className="sys-types-page">
      <header className="sys-types-header">
        <h1 className="sys-types-title effect-underline">{title}</h1>
      </header>

        <p className="sys-types-subtitle">{subTitle}</p>
      <section className="sys-types-carousel" aria-label={subTitle}>
        <button
          type="button"
          className={`sys-types-arrow sys-types-arrow--left ${
            activeIndex === 0 ? "sys-types-arrow--disabled" : ""
          }`}
          onClick={handlePrevCard}
          disabled={activeIndex === 0}
          aria-label={ui.prevCard}
        >
          &#10094;
        </button>

        <div className="sys-types-cards">
          {cards.map((card, index) => {
            const isActive = index === activeIndex;
            const isCompletedCard = completedCards.includes(card.id);

            return (
              <button
                key={card.id}
                type="button"
                className={`
                  sys-types-card-btn
                  ${isActive ? "sys-types-card-btn--active" : "sys-types-card-btn--inactive"}
                  ${isCompletedCard ? "sys-types-card-btn--completed" : ""}
                `}
                onClick={isActive ? () => openSystemPopup(card.id) : undefined}
                disabled={!isActive}
                aria-label={card.title}
              >
                {isCompletedCard && (
                  <span className="sys-types-checkmark">✓</span>
                )}

                <img
                  src={card.img}
                  alt={card.title}
                  className="sys-types-card-img"
                />
              </button>
            );
          })}
        </div>

        <button
          type="button"
          className={`sys-types-arrow sys-types-arrow--right ${
            activeIndex === cards.length - 1 ? "sys-types-arrow--disabled" : ""
          }`}
          onClick={handleNextCard}
          disabled={activeIndex === cards.length - 1}
          aria-label={ui.nextCard}
        >
          &#10095;
        </button>
      </section>

      <div className="backBtn" onClick={() => changeToPage(0)}>
        <img src={backBtn} alt={backBtnText} className="backBtnImg" />
        <p className="backBtnText">{backBtnText}</p>
      </div>

      <button
        className={`nextBtn tigris-next-btn ${
          !canContinue ? "nextBtnDisable" : ""
        }`}
        disabled={!canContinue}
        onClick={() => changeToPage(2)}
      >
        {nextBtn}
      </button>

      {activePopupCard && (
        <SystemPopup
          type={activePopupCard.id}
          data={activePopupCard.popupData}
          ui={ui}
          onClose={closeSystemPopup}
        />
      )}
    </div>
  );
};

export default SystemTypes;