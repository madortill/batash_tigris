import React, { useState } from "react";
import FlipCard from "./FlipCard";

function IsFliped({ cards, children }) {
  const [seenCards, setSeenCards] = useState([]);

  const handleSeen = (index) => {
    setSeenCards((prev) => {
      if (prev.includes(index)) return prev;
      return [...prev, index];
    });
  };

  const canContinue = seenCards.length === cards.length;

  return children({
    canContinue,
    handleSeen,
  });
}

export default IsFliped;