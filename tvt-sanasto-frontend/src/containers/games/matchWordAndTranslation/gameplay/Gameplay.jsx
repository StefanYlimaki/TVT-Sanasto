import { ColorRing } from 'react-loader-spinner'
import { Button } from '@mui/material'
import React, { useState, useEffect } from 'react'
import Scoreboard from '../scoreboard/Scoreboard'
import shuffleArray from '../../../../utils/shuffleArray'
import './gameplay.css'

const Gameplay = ({
  category,
  gameLenght,
  setGameRunning,
  amountOfOptions
}) => {
  let words = []
  if (category === 'basic-comp') {
    words = JSON.parse(localStorage.getItem('basic-comp'))
  } else {
    words = JSON.parse(localStorage.getItem('internet-basic'))
  }

  const [points, setPoints] = useState(0)
  const [round, setRound] = useState(0)

  const [usedWordIndexes, setUsedWordIndexes] = useState([])
  const [usedRandomWordsIndexes, setUsedRandomWordsIndexes] = useState([])

  const [gameHasEnded, setGameHasEnded] = useState(false)
  const [gameIsLoading, setGameIsLoading] = useState(true)

  const [randomWord, setRandomWord] = useState()
  const [optionWords, setOptionWords] = useState([])
  const [correctAnswer, setCorrectAnswer] = useState({})

  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState([])
  const [options, setOptions] = useState([])

  const wordsToUse = []


  useEffect(() => {
    startGame()
  }, [])

  // function for getting a random word, which's index is not in usedWordIndexes
  const getRandomWord = (isToBeGuessed) => {
    let index = Math.floor(Math.random() * words.length) // Get random integer between 0 and lenght of words array
    if (isToBeGuessed === true) { // If word is going to be the word to guess, then check that it is not been guessed earlier in the game
      for (let i = 0; usedRandomWordsIndexes.includes(index); i++) {
        index = Math.floor(Math.random() * words.length)
      }
      setCorrectAnswer(words[index])
      setUsedRandomWordsIndexes(usedRandomWordsIndexes.concat(index))
    } else {
      for (let i = 0; usedWordIndexes.includes(index); i++) {
        index = Math.floor(Math.random() * words.length)
      }
    }
    setUsedWordIndexes(usedWordIndexes.push(index))
    return words[index]
  }

  const startGame = () => {
    setGameIsLoading(false)
    nextRound(false)
  }

  const nextRound = (correctAnswer) => {
    if (round === gameLenght) {
      if(correctAnswer) endGame(true)
      endGame(false)
    }

    if (correctAnswer) {
      setPoints(points + 1)
    }

    setRound(round + 1)

    const newRandomWord = getRandomWord(true)
    setQuestions(questions.concat(newRandomWord))
    setRandomWord(newRandomWord)

    // get definitions to use for options in the round
    for(let i = 1; i < amountOfOptions; i++){
      wordsToUse.push((getRandomWord(false)))
    }
    wordsToUse.push((newRandomWord))

    // saving options for later use
    setOptions(options.concat(wordsToUse))

    setUsedWordIndexes([])
    setOptionWords(shuffleArray(wordsToUse))
  }

  const handleClickOnOption = (word) => {
    setAnswers(answers.concat(word))
    // if selected option's (word selected) id matches with that of correct answer's
    if (word.id === correctAnswer.id) {
      nextRound(true)
    } else {
      nextRound(false)
    }
  }

  const generateGameRaport = () => {
    const raport = {
      points: points,
      rounds: round - 1,
      category_id: category,
      questions: questions,
      answers: answers,
      options: options
    }
    return raport
  }

  const endGame = () => {
    setGameHasEnded(true)
  }

  return (
    <div>
      { gameIsLoading
        ? ( <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        /> )
        : ( <div className='game__gameplay'>
          { gameHasEnded
            ? (<div><Scoreboard
              setGameRunning = { setGameRunning }
              points = { points }
              rounds = { gameLenght }
              raport = { generateGameRaport() }
            /></div>)
            : (<div className="game_gameplay-main">
              <div className="game__gameplay-stats_and-text_length">
                <div className="game__gameplay-stats_and-text_length-stats">
                  <div>
                    Kierros&nbsp;
                    {round}
                    /
                    {gameLenght}
                  </div>
                  <div>
                    Pisteet&nbsp;
                    {points}
                    /
                    {round - 1}
                  </div>
                </div>
              </div>

              <div className="game__gameplay-advice">
                <div className="game__gameplay-advice_text">
                  Mikä seuraavista käännöksistä sopii sanalle:
                </div>
                {randomWord !== null ? (
                  <div className="game__gameplay-advice_word">
                    {randomWord.finnish}
                    {' '}
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
                        key={w.english}
                        className="game__gameplay-options_single-option"
                        onClick={() => handleClickOnOption(w)}
                      >
                        <p>{w.english}</p>

                      </div>
                    ))}
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <Button variant="contained" onClick={() => endGame()}>Lopeta peli</Button>
            </div>)
          }
        </div>
        )}
    </div>
  )
}


export default Gameplay