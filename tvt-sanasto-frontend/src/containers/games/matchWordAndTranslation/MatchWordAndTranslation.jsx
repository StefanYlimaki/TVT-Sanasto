import React, { useState } from 'react'
import './matchWordAndTranslation.css'

import GameSettings from './gameSettings/GameSettings'
import Gameplay from './gameplay/Gameplay'
import ErrorMessage from '../../../components/errorMessage/ErrorMessage'

const MatchWordAndTranslation = () => {
  const [category, setCategory] = useState('')
  const [gameRunning, setGameRunning] = useState('false')
  const [errorMessage, setErrorMessage] = useState(null)
  const [gameLength, setGameLength] = useState(10)
  const [amountOfOptions, setAmountOfOptions] = useState(4)

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
          amountOfOptions = { amountOfOptions }
          setAmountOfOptions = { setAmountOfOptions }
        /></div>)
        : (<div><Gameplay
          category = { category }
          gameLenght = { gameLength }
          setGameRunning = { setGameRunning }
          amountOfOptions = { amountOfOptions }
        /></div>)
      }
    </div>)
}

export default MatchWordAndTranslation