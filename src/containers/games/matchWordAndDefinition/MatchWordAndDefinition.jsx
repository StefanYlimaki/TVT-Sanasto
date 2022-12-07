import React, { useState } from "react";
import "./matchWordAndDefinition.css";

import comp_basic from "../../../assets/comp-basic.json";
import networks_basic from "../../../assets/networks-basic.json";

import Select from "react-select";
import { Button } from "@mui/material";

const MatchWordAndDefinition = () => {
  const [gameRunning, setGameRunning] = useState(false);
  const [error, setError] = useState(null);
  const [words, setWords] = useState(comp_basic);
  const [randomWord, setRandomWord] = useState(null);
  const [definitions, setDefinitions] = useState([]);

  const definitionsToUse = []

  const options = [
    { value: comp_basic, label: "Tietotekniikan Perustermistöä" },
    { value: networks_basic, label: "Internet ja Tietoverkot" },
  ];

  const getRandomDefinition = () => {
    const word = words[Math.floor(Math.random() * words.length)];
    const FilteredDefinition = word.definition.replaceAll(word.finnish, "****").replaceAll(word.english, "****")
    return FilteredDefinition;
  };

  return (
    <div className="game">
      {error !== null ? <div className="game__error">{error}</div> : <></>}
      {!gameRunning ? (
        <div className="game__settings">
          <Select
            placeholder="Valitse kategoria jonka sanoja haluat harjoitella"
            options={options}
            onChange={(e) => setWords(e.value)}
          />
          <Button
            onClick={() => {
              if (words === null) {
                setError("Valitse ensin kategoria!");
                setTimeout(() => {
                  setError(null);
                }, 3000);
              } else {
                setError(null);
                setGameRunning(true);
                const wordThatIsRandom = (words[Math.floor(Math.random() * words.length)]);
                setRandomWord(wordThatIsRandom)
                definitionsToUse.push(getRandomDefinition())
                definitionsToUse.push(getRandomDefinition())
                definitionsToUse.push(wordThatIsRandom.definition.replaceAll(wordThatIsRandom.finnish, "****").replaceAll(wordThatIsRandom.english, "****"))
                setDefinitions(definitionsToUse)
              }
            }}
          >
            Aloita peli
          </Button>
        </div>
      ) : (
        <div className="game__gameplay">
          <div className="game__gameplay-advice">
            Mikä seuraavista selityksistä sopii sanalle:
            {randomWord !== null ? (
              <div>{randomWord.finnish} </div>
            ) : (
              <></>
            )}
          </div>
          <div className="game__gameplay-options">
            {definitions !== null
            ? 
              <div>
                {definitions.map(d => 
                  <div 
                    key={d}
                    className="game__gameplay-options_single"
                  > 
                    <div><p>{d}</p><button>valitse tämä</button></div>
                    
                  </div>
                )}
              </div>
            : <></>
            }
          </div>
          <Button
            onClick={() => {
              setGameRunning(false);
              setWords(null);
            }}
          >
            Lopeta peli
          </Button>
        </div>
      )}
    </div>
  );
};

export default MatchWordAndDefinition;
