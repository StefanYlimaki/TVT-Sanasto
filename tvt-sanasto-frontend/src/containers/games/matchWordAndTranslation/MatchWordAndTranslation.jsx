import React, { useState } from 'react'

import GameSettings from './gameSettings/MWAT__GameSettings'
import Gameplay from './gameplay/MWAT__Gameplay'
import ErrorMessage from '../../../components/errorMessage/ErrorMessage'

import './matchWordAndTranslation.css'

/**
 * This component is responsible for orchestrating a game and all of it's screens.
 * @returns Match Word and Translation game
 */

const MatchWordAndTranslation = () => {
  const [category, setCategory] = useState('') // keeps track of which category words used in the game come from
  const [gameRunning, setGameRunning] = useState('false') // keeps track of the state of the game.
  const [errorMessage, setErrorMessage] = useState(null) // error message is set, if needed. When error message is set, it is rendered, otherwise not.
  const [gameLength, setGameLength] = useState(10) // keeps track of amount of rounds that should be played.
  const [amountOfOptions, setAmountOfOptions] = useState(4) // keeps track of how many answer options should be displayed.
  const [languages, setLanguages] = useState([]) // keeps track of in which languages the question words should be.

  /**
   * If the game is not running
   *  --> render game settings
   * else
   *  --> render game play
   */
  return (
    <div className='MWAT__game'>
      <div className='MWAT__game-error'><ErrorMessage message={ errorMessage }/></div>
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
