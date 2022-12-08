import React, { useState } from "react";
import "./matchWordAndDefinition.css";

import comp_basic from "../../../assets/comp-basic.json";
import networks_basic from "../../../assets/networks-basic.json";

import Select from "react-select";
import { Button } from "@mui/material";

const MatchWordAndDefinition = () => {
  const [gameRunning, setGameRunning] = useState(false);
  const [scoreBoardVisible, setScoreBoardVisible] = useState(false);
  const [error, setError] = useState(null);
  const [words, setWords] = useState(comp_basic);
  const [randomWord, setRandomWord] = useState(null);
  const [definitions, setDefinitions] = useState([]);
  const [usedIndexes, setUsedIndexes] = useState([]);
  const [points, setPoints] = useState(0)

  const definitionsToUse = [];

  const options = [
    { value: comp_basic, label: "Tietotekniikan Perustermistöä" },
    { value: networks_basic, label: "Internet ja Tietoverkot" },
  ];

  const getRandomWord = () => {
    let index = Math.floor(Math.random() * words.length);
    for (let i = 0; usedIndexes.includes(index); i++) {
      index = Math.floor(Math.random() * words.length);
    }
    setUsedIndexes(usedIndexes.push(index));
    return words[index];
  };

  const getRandomDefinition = () => {
    const word = getRandomWord();
    let wordsToFilterEnglish = word.english.toLowerCase().split(/[- ,]+/);
    let wordsToFilterFinnish = word.finnish.toLowerCase().split(/[- ,]+/);
    const wordsToFilter = wordsToFilterFinnish.concat(wordsToFilterEnglish);
    let filteredDefinition = word.definition.toLowerCase();
    wordsToFilter.forEach(
      (w) => (filteredDefinition = filteredDefinition.replaceAll(w, "****"))
    );
    return filteredDefinition;
  };

  const handleClickOnDefinition = (definition) => {
    const answer = definition;

    let wordsToFilterEnglish = randomWord.english.toLowerCase().split(/[- ,]+/);
    let wordsToFilterFinnish = randomWord.finnish.toLowerCase().split(/[- ,]+/);
    const wordsToFilter = wordsToFilterFinnish.concat(wordsToFilterEnglish);
    let filteredDefinition = randomWord.definition.toLowerCase();
    wordsToFilter.forEach(
      (w) => (filteredDefinition = filteredDefinition.replaceAll(w, "****"))
    );

    if (answer === filteredDefinition) {
      nextRound();
    } else {
      endOfGame();
    }
  };

  const endOfGame = () => {
    setGameRunning(false);
    setWords(null);
    setScoreBoardVisible(true)
  };

  const nextRound = () => {
    setPoints(points + 1)
    let index = Math.floor(Math.random() * words.length)
    usedIndexes.push(index)
    const wordThatIsRandom = words[index];
    setRandomWord(wordThatIsRandom);
    definitionsToUse.push(getRandomDefinition());
    definitionsToUse.push(getRandomDefinition());

    let wordsToFilterEnglish = wordThatIsRandom.english
      .toLowerCase()
      .split(/[- ,]+/);
    let wordsToFilterFinnish = wordThatIsRandom.finnish
      .toLowerCase()
      .split(/[- ,]+/);
    const wordsToFilter = wordsToFilterFinnish.concat(wordsToFilterEnglish);
    let filteredDefinition = wordThatIsRandom.definition.toLowerCase();
    wordsToFilter.forEach(
      (w) => (filteredDefinition = filteredDefinition.replaceAll(w, "****"))
    );
    definitionsToUse.push(filteredDefinition);
    definitionsToUse.sort((a, b) => 0.5 - Math.random());
    setDefinitions(shuffleArray(definitionsToUse));
    setUsedIndexes([]);
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  return (
    <div className="game">
      {error !== null ? <div className="game__error">{error}</div> : <></>}
      {!gameRunning && !scoreBoardVisible ? (
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
                setPoints(0)
                setError(null);
                setGameRunning(true);
                const wordThatIsRandom =
                  words[Math.floor(Math.random() * words.length)];
                setRandomWord(wordThatIsRandom);
                definitionsToUse.push(getRandomDefinition());
                definitionsToUse.push(getRandomDefinition());

                let wordsToFilterEnglish = wordThatIsRandom.english
                  .toLowerCase()
                  .split(/[- ,]+/);
                let wordsToFilterFinnish = wordThatIsRandom.finnish
                  .toLowerCase()
                  .split(/[- ,]+/);
                const wordsToFilter =
                  wordsToFilterFinnish.concat(wordsToFilterEnglish);
                let filteredDefinition =
                  wordThatIsRandom.definition.toLowerCase();
                wordsToFilter.forEach(
                  (w) =>
                    (filteredDefinition = filteredDefinition.replaceAll(
                      w,
                      "****"
                    ))
                );

                definitionsToUse.push(filteredDefinition);
                definitionsToUse.sort((a, b) => 0.5 - Math.random());
                setDefinitions(shuffleArray(definitionsToUse));
                setUsedIndexes([]);
              }
            }}
          >
            Aloita peli
          </Button>
        </div>
      ) : (
        <div>
          {!scoreBoardVisible
          ? (<><div className="game__gameplay">
          <div className="game__gameplay-advice">
            <div className="game__gameplay-advice_text">
              Mikä seuraavista selityksistä sopii sanalle:
            </div>
            {randomWord !== null ? (
              <div className="game__gameplay-advice_word">
                {randomWord.finnish}{" "}
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="game__gameplay-options">
            {definitions !== null ? (
              <div className="game__gameplay-options_single">
                {definitions.map((d) => (
                  <div
                    key={d}
                    className="game__gameplay-options_single-option"
                    onClick={() => handleClickOnDefinition(d)}
                  >
                    <p>{d}</p>
                  </div>
                ))}
              </div>
            ) : (
              <></>
            )}
          </div>
          <Button
            onClick={() => {
              setGameRunning(false);
              setWords(null);
            }}
          >
            Lopeta peli
          </Button>
        </div></>)
          : (<div>
              <p>scoreboard</p>
              <p>Sait {points} pistettä</p>
              <button onClick={() => setScoreBoardVisible(false)}>sulje scoreboard</button>
            </div>)
          }
        </div>
      )}
    </div>
  );
};

export default MatchWordAndDefinition;
