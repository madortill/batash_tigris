import React, { useState } from "react";
import FlipCard from "./FlipCard";
import {useEffect} from "react"

function IsFliped({ cards, children , initialCompleted = false, onComplete }) {
  const [seenCards, setSeenCards] = useState([]);

  const handleSeen = (index) => {
    setSeenCards((prev) => {
      if (prev.includes(index)) return prev;
      return [...prev, index];
    });
  };

const canContinue = initialCompleted || seenCards.length === cards.length;

useEffect(() => {
    if (!initialCompleted && seenCards.length === cards.length) {
      onComplete?.();
    }
  }, [seenCards, cards.length, initialCompleted, onComplete]);

  return children({ canContinue, handleSeen });
};

export default IsFliped;
