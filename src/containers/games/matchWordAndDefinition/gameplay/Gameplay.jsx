import React, { useState } from "react";
import { Button } from "@mui/material";

import shuffleArray from "../../../../utils/shuffleArray";
import "./gameplay.css";
import { useEffect } from "react";
import { Slider } from "@mui/material";

const Gameplay = ({
  setScoreBoardVisible,
  setPoints,
  points,
  setWords,
  words,
  setError,
  setCondition,
  gameLenght,
}) => {
  // random word to be guessed definition of
  const [randomWord, setRandomWord] = useState();
  // store indexes of already used words whilst getting random definitions
  const [usedWordIndexes, setUsedWordIndexes] = useState([]);
  // save the definitions to use
  const [usedRandomWordsIndexes, setUsedRandomWordsIndexes] = useState([]);
  const [gameRunning, setGameRunning] = useState(false);
  const [round, setRound] = useState(0);
  const [optionWords, setOptionWords] = useState([])
  const [correctAnswer, setCorrectAnswer] = useState({})
  const [definitionLength, setDefinitionLength] = useState(300)
  const wordsToUse = [];

  // start the game
  useEffect(() => {
    startGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // function for getting a random word, which's index is not in usedWordIndexes
  const getRandomWord = (boolean) => {
    // get random index that's between 0 and length of words-array
    let index = Math.floor(Math.random() * words.length);
    // boolean is true when random word we want is to be the word to be guessed the definition of
    if (boolean === true) {
      // in that case we want the word to not be any word which definition we have guessed previously
      for (let i = 0; usedRandomWordsIndexes.includes(index); i++) {
        index = Math.floor(Math.random() * words.length);
      }
      // then set the word to be correct answer
      setCorrectAnswer(words[index])
      // and save the used index
      setUsedRandomWordsIndexes(usedRandomWordsIndexes.concat(index));
    } else {
      // when the boolean is not true, we just want a random word that is not a same word, used in the options for this round
      for (let i = 0; usedWordIndexes.includes(index); i++) {
        index = Math.floor(Math.random() * words.length);
      }
    }
    // then let's set the index used (no matter if the boolean was true or not), to the array of used indexes. That way we dont have duplicates even for the word to be guessed
    setUsedWordIndexes(usedWordIndexes.push(index));
    // return the random word
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
    nextRound(false);
  };

  // function for starting next round
  const nextRound = (correctAnswer) => {
    // check if round same to game length (NOTICE! before incrementing the round count)
    if (round === gameLenght) {
      // if true
      let condition;
      // check if (points + 1) equals to rounds and latest answer was correct
      if (points + 1 === round && correctAnswer ) {
        // set condition to 'won'
        condition = "won";
      } else {
        // set condition to 'lost'
        condition = "lost";
      }
      // end game with correct condition
      endGame(condition);
    }

    // increment round count
    setRound(round + 1);

    if (correctAnswer) {
      // increment points by one
      setPoints(points + 1)
    }

    // get new random word
    const newRandomWord = getRandomWord(true);
    // set the new random word
    setRandomWord(newRandomWord);

    // get definitions to use in the game
    wordsToUse.push((getRandomWord(false)));
    wordsToUse.push((getRandomWord(false)));
    wordsToUse.push((newRandomWord));

    // set used words indexes to empty array
    setUsedWordIndexes([]);
    setOptionWords(shuffleArray(wordsToUse));
  };

  // function for handling click on an option
  const handleClickOnOption = (word) => {
    // if selected option's (word selected) id matches with that of correct answer's 
    if (word.id === correctAnswer.id) {
      // call nextRound function with paramater value true (correctAnswer === true in nextRound-function)
      nextRound(true);
    } else {
      // call nextRound function with paramater value false  (correctAnswer === false in nextRound-function)
      nextRound(false);
    }
  };

  // function for ending the game
  const endGame = (condition) => {
    setScoreBoardVisible(true);
    setCondition(condition);
    setWords(null);
  };

  const getShortenedText = (text) => {
    let shortenedText = text.substring(0, definitionLength)
    const lastIndex = shortenedText.lastIndexOf('.')
    return shortenedText.substring(0, lastIndex + 1)
  }

  return (
    <div className="game__gameplay">
      {!gameRunning ? (
        <div>game loading...</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column'}}>
          <div className="game__gameplay-stats_and-text_length">
            <div className="game__gameplay-stats_and-text_length-stats">
              <div>Kierros {round}/{gameLenght}</div>
              <div>Pisteet {points}/{round - 1}</div>
            </div>
            <div className="game__gameplay-stats_and-text_length-text_length"> Säädä vastausvaihtoehtojen pituutta
              <Slider
                defaultValue={300}
                min={200}
                max={800}
                step={100}
                valueLabelDisplay="auto"
                value={definitionLength}
                onChange={(event, value) => setDefinitionLength(value)}
              />
            </div>
          </div>
          
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
            {optionWords !== null ? (
              <div className="game__gameplay-options_single">
                {optionWords.map((w) => (
                  <div
                    key={w.definition}
                    className="game__gameplay-options_single-option"
                    onClick={() => handleClickOnOption(w)}
                  >
                    <p>{getShortenedText(getFilteredDefinition(w))}</p>
                    
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
