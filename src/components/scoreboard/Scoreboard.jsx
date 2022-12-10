import React from "react";
import "./scoreboard.css";
import Confetti from 'react-confetti'

const Scoreboard = ({
  setPoints,
  points,
  setScoreBoardVisible,
  setCondition,
  condition,
  gameLenght
}) => {
  return (
    <div>
      {condition === 'won'
      ? <div><Confetti />Voitit Pelin</div>
      : <div>Hävisit pelin</div>
      }
      <p>Sait {points}/{gameLenght} pistettä</p>
      <button
        onClick={() => {
          setScoreBoardVisible(false);
          setPoints(0);
          setCondition(null);
        }}
      >
        sulje scoreboard
      </button>
    </div>
  );
};

export default Scoreboard;
