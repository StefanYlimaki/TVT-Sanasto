import React, { useState } from "react";
import { Button } from "@mui/material";

import shuffleArray from "../../utils/shuffleArray";
import "./gameplay.css";
import { useEffect } from "react";

const Gameplay = ({
  setScoreBoardVisible,
  setPoints,
  points,
  setWords,
  words,
  setError,
  setCondition,
  gameLenght
}) => {
  // random word to be guessed definition of
  const [randomWord, setRandomWord] = useState();
  // store indexes of already used words whilst getting random definitions
  const [usedWordIndexes, setUsedWordIndexes] = useState([]);
  // save the definitions to use
  const [definitions, setDefinitions] = useState([]);
  const [usedRandomWordsIndexes, setUsedRandomWordsIndexes] = useState([])
  const [gameRunning, setGameRunning] = useState(false);
  const [round, setRound] = useState(0)
  const definitionsToUse = [];

  // start the game
  useEffect(() => {
    startGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // function for getting a random word, which index is not in usedWordIndexes
  const getRandomWord = (boolean) => {
    let index = Math.floor(Math.random() * words.length);
    if(boolean === true){
      for (let i = 0; usedRandomWordsIndexes.includes(index); i++) {
        index = Math.floor(Math.random() * words.length);
      }
      setUsedRandomWordsIndexes(usedRandomWordsIndexes.concat(index))
    } else {
      for (let i = 0; usedWordIndexes.includes(index); i++) {
        index = Math.floor(Math.random() * words.length);
      }

    }
    setUsedWordIndexes(usedWordIndexes.push(index));
    return words[index];
  };

  // function for getting a filtered definition of a word
  // replaces all occurrances of a set of words in its definition
  // the set of words to replace is the word in finnish, the word in english,
  // plus the words that come from splitting above menitioned words by characters "- ,()"
  const getFilteredDefinition = (word) => {
    let wordsToFilterEnglish = word.english.toLowerCase().split(/[- ,(]+/);
    let wordsToFilterFinnish = word.finnish.toLowerCase().split(/[- ,(]+/);
    const wordsToFilter = wordsToFilterFinnish.concat(wordsToFilterEnglish);
    let filteredDefinition = word.definition.toLowerCase();
    wordsToFilter.forEach(
      (w) => (filteredDefinition = filteredDefinition.replaceAll(w, "****"))
    );
    return filteredDefinition;
  };

  // function for starting the game
  const startGame = () => {
    setGameRunning(true);
    setError(null);
    nextRound();
  };

  // function for starting next round
  const nextRound = () => {
    setRound(round + 1)

    if(round >= gameLenght){
      const condition = 'won' 
      endGame(condition)
    }

    // increment points by one
    setPoints(points + 1);

    // get new random word 
    const newRandomWord = getRandomWord(true);
    // set the new random word
    setRandomWord(newRandomWord);

    // get definitions to use in the game
    definitionsToUse.push(getFilteredDefinition(getRandomWord(false)));
    definitionsToUse.push(getFilteredDefinition(getRandomWord(false)));
    definitionsToUse.push(getFilteredDefinition(newRandomWord));

    // set used words indexes to empty array every second round
    setUsedWordIndexes([]);
    setDefinitions(shuffleArray(definitionsToUse));
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
      const condition='lost'
      endGame(condition);
    }
  };

  const endGame = (condition) => {
    setScoreBoardVisible(true);
    setCondition(condition)
    setWords(null);
  };


  return (
    <div className="game__gameplay">
      {!gameRunning ? (
        <div>game loading...</div>
      ) : (
        <div>
          <div>Kierros {round}/10</div>
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
          <Button onClick={() => endGame()}>Lopeta peli</Button>
        </div>
      )}
    </div>
  );
};

export default Gameplay;
