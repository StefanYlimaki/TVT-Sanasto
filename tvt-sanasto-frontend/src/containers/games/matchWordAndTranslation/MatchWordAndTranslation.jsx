import React, { useState } from 'react'

import GameSettings from './gameSettings/MWAT__GameSettings'
import Gameplay from './gameplay/MWAT__Gameplay'
import ErrorMessage from '../../../components/errorMessage/ErrorMessage'

import './matchWordAndTranslation.css'

const MatchWordAndTranslation = () => {
  const [category, setCategory] = useState('')
  const [gameRunning, setGameRunning] = useState('false')
  const [errorMessage, setErrorMessage] = useState(null)
  const [gameLength, setGameLength] = useState(10)
  const [amountOfOptions, setAmountOfOptions] = useState(4)
  const [languages, setLanguages] = useState([])

  return (
    <div className='game'>
      <ErrorMessage message={ errorMessage }/>
      { gameRunning === 'false'
        ? (<GameSettings
          setCategory = { setCategory }
          gameLength = { gameLength }
          setGameLength = { setGameLength }
          setErrorMessage = { setErrorMessage }
          setGameRunning = { setGameRunning }
          amountOfOptions = { amountOfOptions }
          setAmountOfOptions = { setAmountOfOptions }
          setLanguages = { setLanguages }
        />)
        : (<Gameplay
          category = { category }
          gameLenght = { gameLength }
          setGameRunning = { setGameRunning }
          amountOfOptions = { amountOfOptions }
          languages = { languages }
        />)
      }
    </div>)
}

export default MatchWordAndTranslation