import React from "react";

import "./scoreboard.css";

const Scoreboard = ({
  setPoints,
  points,
  setScoreBoardVisible,
  setCondition,
  condition
}) => {
  return (
    <div>
      <p>{condition}</p>
      <p>Sait {points} pistettä</p>
      <button
        onClick={() => {
          setScoreBoardVisible(false);
          setPoints(-1);
          setCondition(null);
        }}
      >
        sulje scoreboard
      </button>
    </div>
  );
};

export default Scoreboard;
