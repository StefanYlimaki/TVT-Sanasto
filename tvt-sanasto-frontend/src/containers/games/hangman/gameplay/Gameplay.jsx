import React, { useState, useEffect } from 'react'

import shuffleArray from '../../../../utils/shuffleArray'
import LoadingScreen from '../../../../components/loadingScreen/LoadingScreen'
import Scoreboard from '../scoreboard/Scoreboard'
import GameplayArea from '../gameplayArea/GameplayArea'

function Gameplay({
  category,
  gameLenght,
  setGameRunning,
  languages,
  amountOfGuesses
}) {

  let words = [] // array to store the words in.
  // Fill the array above with words from the chosen category.
  if (category === 'basic-comp') {
    words = JSON.parse(localStorage.getItem('basic-comp'))
  } else {
    words = JSON.parse(localStorage.getItem('internet-basic'))
  }

  const [points, setPoints] = useState(0) // Keeps track of the points.
  const [round, setRound] = useState(0) // Keeps track of the round.

  const [usedWordIndexes, setUsedWordIndexes] = useState([]) // Keeps track of the used words.

  const [gameHasEnded, setGameHasEnded] = useState(false)
  const [gameIsLoading, setGameIsLoading] = useState(true)

  const [randomWord, setRandomWord] = useState()
  const [guessesLeft, setGuessesLeft] = useState(amountOfGuesses)

  useEffect(() => {
    startGame()
  }, [])

  // function for getting a random word, which is not already appeared in the game.
  const getRandomWord = () => {
    let index = Math.floor(Math.random() * words.length) // Get random integer between 0 and lenght of words array
    for (let i = 0; usedWordIndexes.includes(index); i++) {
      index = Math.floor(Math.random() * words.length)
    }
    setUsedWordIndexes(usedWordIndexes.concat(index))

    // Return the word in the language that was chosen by the user.
    if(languages.length === 2 || languages.length === 0){
      if(Math.round(Math.random())){
        return words[index].english
      } else {
        return words[index].finnish
      }
    } else if( languages.includes('finnish')) {
      return words[index].finnish
    } else {
      return words[index].english
    }
  }

  // Function for starting the game.
  const startGame = () => {
    setGameIsLoading(false)
    nextRound(false)
  }

  // Function for advancing to the next round.
  const nextRound = (correctAnswer) => {
    // If the parameter given was true => Increase points count by one.
    if(correctAnswer){
      setPoints(points + 1)
    }
    setRound(round + 1) // Increment round count
    setGuessesLeft(amountOfGuesses) // set guessesLeft to the value that was given by the user in the settings screen.

    // Check if game has ended.
    if(round >= gameLenght){
      setGameHasEnded(true)
    }

    // Get new randomWord and set it as the randomWord.
    const word = getRandomWord()
    setRandomWord(word)
  }

  return (
    <div>
      { gameIsLoading
        ? (
          <LoadingScreen />
        )
        : ( <div>
          { gameHasEnded
            ? (<Scoreboard
              setGameRunning = { setGameRunning }
              points = { points }
              rounds = { gameLenght }
            />)
            : (
              <GameplayArea
                guessesLeft = {guessesLeft}
                setGuessesLeft = { setGuessesLeft }
                round = { round }
                gameLenght = { gameLenght }
                points = { points }
                randomWord = { randomWord }
                nextRound = { nextRound }
                setGameHasEnded = { setGameHasEnded }
                amountOfGuesses = { amountOfGuesses }
              />)
          }
        </div>
        )}
    </div>
  )
}

export default Gameplay