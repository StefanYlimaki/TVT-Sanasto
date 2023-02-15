import React, { useState, useEffect } from 'react'
import { Checkbox } from '@mui/material'

import LoadingScreen from '../../../../components/loadingScreen/LoadingScreen'
import GameLengthSlider from '../../../../elements/GameLengthSlider'
import AmountOfOptionsSlider from '../../../../elements/AmountOfOptionsSlider'
import './MWAT__gameSettings.css'

const GameSettings = ({
  setCategory,
  gameLength,
  setGameLength,
  setErrorMessage,
  setGameRunning,
  amountOfOptions,
  setAmountOfOptions,
  setLanguages
}) => {

  const [selectedCategory, setSelectedCategory] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [finnishChecked, setFinnishChecked] = useState(true)
  const [englishChecked, setEnglishChecked] = useState(true)

  useEffect(() => {
    if(localStorage.getItem('basic-comp') !== null && localStorage.getItem('internet-basic') !== null){
      setIsLoading(false)
    }
    const interval = setInterval(() => {
      if(localStorage.getItem('basic-comp') !== null && localStorage.getItem('internet-basic') !== null){
        setIsLoading(false)
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  if(isLoading){
    return(
      <LoadingScreen />
    )
  }

  const handleRoundsSliderChange = (event) => {
    setGameLength(event.target.value)
  }

  const handleOptionsSliderChange = (event) => {
    setAmountOfOptions(event.target.value)
  }

  const getLanguages = () => {
    let array = new Array()

    if(finnishChecked){
      array.push('finnish')
    }

    if(englishChecked){
      array.push('english')
    }

    return array
  }

  const handleStartGameClick = () => {
    if (selectedCategory !== null) {
      setCategory(selectedCategory)
      setLanguages(getLanguages())
      setGameRunning('true')
    } else {
      setErrorMessage('Valitse kategoria')
      setTimeout(() => {
        setErrorMessage(null)
      }, 2000)
    }
  }

  const handleFinnishCheckboxChange = (event) => {
    setFinnishChecked(event.target.checked)
  }

  const handleEnglishCheckboxChange = (event) => {
    setEnglishChecked(event.target.checked)
  }

  return(
    <div className="MWAT__game-settings">
      <div className='MWAT__game-settings__languages'>
        <div className='MWAT__game-settings__languages-text'>
          <p>Kysymykset kielellä:</p>
        </div>
        <div className='MWAT__game-settings__languages-checkbox'>
          <p>Suomi <Checkbox checked = { finnishChecked } onChange = { handleFinnishCheckboxChange } /></p>
          <p>Englanti <Checkbox checked = { englishChecked } onChange = { handleEnglishCheckboxChange } /></p>
        </div>
      </div>
      <div className="MWAT__game-settings__gamelength">
        <p>Valitse kierrosten lukumäärä:</p>
        <div className="MWAT__game-settings__gamelength-slider">
          <GameLengthSlider handleChange = { handleRoundsSliderChange } value = { gameLength }/>
        </div>
      </div>
      <div className="MWAT__game-settings__gamelength">
        <p>Valitse vaihtoehtojen lukumäärä:</p>
        <div className="MWAT__game-settings__gamelength-slider">
          <AmountOfOptionsSlider handleChange = { handleOptionsSliderChange } value = { amountOfOptions } />
        </div>
      </div>
      <div className="MWAT__game-settings__category">
        <p>Valitse kategoria:</p>
        <div className="MWAT__game-settings__category-buttons">
          <button
            onClick={() => {
              setSelectedCategory('basic-comp')
            }}
          >
            Tietotekniikan Perustermistöä
          </button>
          <button
            onClick={() => {
              setSelectedCategory('internet-basic')
            }}
          >
            Internet ja Tietoverkot
          </button>
        </div>
      </div>
      <div className="MWAT__game-settings__start-game">
        <button onClick={handleStartGameClick}>Aloita peli</button>
      </div>
    </div>
  )
}

export default GameSettings
