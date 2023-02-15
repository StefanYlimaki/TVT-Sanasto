import React, { useState } from 'react'
import './matchWordAndDefinition.css'

import GameSettings from './gameSettings/MWAD__GameSettings'
import Gameplay from './gameplay/MWAD__Gameplay'
import ErrorMessage from '../../../components/errorMessage/ErrorMessage'

function MatchWordAndDefinition() {
  // This variable stores the information about the chosen category. It gets updated, when a user clicks on a category in the game settings view.
  const [category, setCategory] = useState('')

  // This variable stores the state of the game. If game is not running game settings -view should be rendered.
  // A user can set game running by clicking "start game" -button in the game settings view.
  const [gameRunning, setGameRunning] = useState('false')

  // This variable stores the error message. Error message is used when a user tries to start game and category is not selected.
  // The error message clears itself after 3 seconds.
  const [errorMessage, setErrorMessage] = useState(null)

  // This variable stores the information about the chosen game length. It gets updatad, when a user slides game length slider in the game settings view.
  const [gameLength, setGameLength] = useState(10)

  return (
    <div className='MWAD__game'>
      <div className='MWAD__game-error'><ErrorMessage message={ errorMessage }/></div>
      {/* This is a placeholder for the errormessage. If error message is defined, it is rendered. */}
      {/* If game is not running, game settings -view is rendered. If the game is running the gameplay -view is rendered */}
      { gameRunning === 'false'
        ? (<GameSettings
          setCategory = { setCategory }
          gameLength = { gameLength }
          setGameLength = { setGameLength }
          setErrorMessage = { setErrorMessage }
          setGameRunning = { setGameRunning }
        />)
        : (<Gameplay
          category = { category }
          gameLenght = { gameLength }
          setGameRunning = { setGameRunning }
        />)
      }
    </div>)
}

export default MatchWordAndDefinition