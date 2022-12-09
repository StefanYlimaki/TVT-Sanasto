import React from "react";

import comp_basic from "../../assets/comp-basic.json";
import networks_basic from "../../assets/networks-basic.json";
import "./gameSettings.css";

const GameSettings = ({ setWords }) => {
  return (
    <div className="game__settings">
      <div className="game__settings-category_select">
        <button
          onClick={() => {
            setWords(comp_basic);
          }}
        >
          Tietotekniikan Perustermistöä
        </button>
        <button
          onClick={() => {
            setWords(networks_basic);
          }}
        >
          Internet ja Tietoverkot
        </button>
      </div>
    </div>
  );
};

export default GameSettings;
