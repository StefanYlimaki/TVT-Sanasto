import React, { useState } from 'react'
import './matchWordAndDefinition.css'

import GameSettings from './gameSettings/GameSettings'
import Gameplay from './gameplay/Gameplay'
import ErrorMessage from '../../../components/errorMessage/ErrorMessage'

function MatchWordAndDefinition() {
  const [category, setCategory] = useState('')
  const [gameRunning, setGameRunning] = useState('false')
  const [errorMessage, setErrorMessage] = useState(null)
  const [gameLength, setGameLength] = useState(10)

  return (
    <div>
      <ErrorMessage message={ errorMessage }/>
      { gameRunning === 'false'
        ? (<div><GameSettings
          setCategory = { setCategory }
          gameLength = { gameLength }
          setGameLength = { setGameLength }
          setErrorMessage = { setErrorMessage }
          setGameRunning = { setGameRunning }
        /></div>)
        : (<div><Gameplay
          category = { category }
          gameLenght = { gameLength }
          setGameRunning = { setGameRunning }
        /></div>)
      }
    </div>)
}

export default MatchWordAndDefinition
