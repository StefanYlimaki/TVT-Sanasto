import React, { useState } from 'react'
import './hangman.css'

import Gameplay from './gameplay/Gameplay'
import GameSettings from './gameSettings/GameSettings'
import ErrorMessage from '../../../components/errorMessage/ErrorMessage'

const Hangman = () => {

  // This variable stores the error message. Error message is used when a user tries to start game and category is not selected.
  // The error message clears itself after 3 seconds.
  const [errorMessage, setErrorMessage] = useState(null)

  // This variable stores the state of the game. If game is not running game settings -view should be rendered.
  // A user can set game running by clicking "start game" -button in the game settings view.
  const [gameRunning, setGameRunning] = useState('false')

  // This variable stores the information about the chosen category. It gets updated, when a user clicks on a category in the game settings view.
  const [category, setCategory] = useState('')

  // This variable stores the information about the chosen game length. It gets updatad, when a user slides game length slider in the game settings view.
  const [gameLength, setGameLength] = useState(2)

  const [languages, setLanguages] = useState([]) // keeps track of in which languages the question words should be.
  const [amountOfGuesses, setAmountOfGuesses] = useState(6) // keeps track of how many guesses should the player be granted.

  return (
    <div className='Hangman__game'>
      <div className='Hangman__game-error'><ErrorMessage message={ errorMessage }/></div>
      {/* This is a placeholder for the errormessage. If error message is defined, it is rendered. */}
      {/* If game is not running, game settings -view is rendered. If the game is running the gameplay -view is rendered */}
      { gameRunning === 'false'
        ? (<GameSettings
          setCategory = { setCategory }
          gameLength = { gameLength }
          setGameLength = { setGameLength }
          setErrorMessage = { setErrorMessage }
          setGameRunning = { setGameRunning }
          setLanguages = { setLanguages }
          amountOfGuesses = { amountOfGuesses }
          setAmountOfGuesses = { setAmountOfGuesses }
        />)
        : (<Gameplay
          category = { category }
          gameLenght = { gameLength }
          setGameRunning = { setGameRunning }
          languages = { languages }
          amountOfGuesses = { amountOfGuesses }
        />)
      }
    </div>
  )
}

export default Hangman