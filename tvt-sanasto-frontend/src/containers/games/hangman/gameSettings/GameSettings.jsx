import React, { useState, useEffect } from 'react'
import { Checkbox } from '@mui/material'

import LoadingScreen from '../../../../components/loadingScreen/LoadingScreen'
import GameLengthSlider from '../../../../elements/GameLengthSlider'

function GameSettings({
  setCategory,
  gameLength,
  setGameLength,
  setErrorMessage,
  setGameRunning,
  setLanguages
}) {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [finnishChecked, setFinnishChecked] = useState(true) // keeps track of whether finnish as a question word language is checked
  const [englishChecked, setEnglishChecked] = useState(true) // keeps track of whether english as a question word language is checked

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

  const handleSliderChange = (event) => {
    setGameLength(event.target.value)
  }

  const handleStartGameClick = () => {
    if (selectedCategory !== null) {
      setCategory(selectedCategory)
      setGameRunning('true')
      setLanguages(getLanguages)
    } else {
      setErrorMessage('Valitse kategoria')
      setTimeout(() => {
        setErrorMessage(null)
      }, 2000)
    }
  }

  return (
    <div className="MWAD__game-settings">
      <div className='MWAT__game-settings__languages'>
        <div className='MWAT__game-settings__languages-text'>
          <p>Kysymykset kielellä:</p>
        </div>
        <div className='MWAT__game-settings__languages-checkbox'>
          <p>Suomi <Checkbox checked = { finnishChecked } onChange = { (event) => setFinnishChecked(event.target.checked) } /></p>
          <p>Englanti <Checkbox checked = { englishChecked } onChange = { (event) => setEnglishChecked(event.target.checked) } /></p>
        </div>
      </div>
      <div className="MWAD__game-settings__gamelength">
        <p>Valitse kierrosten määrä:</p>
        <div className="MWAD__game-settings__gamelength-slider">
          <GameLengthSlider handleChange = { handleSliderChange } value = { gameLength } min = {1} max = { 4 } defaultValue = { 2 }/>
        </div>
      </div>
      <div className="MWAD__game-settings__category">
        <p>Valitse kategoria:</p>
        <div className="MWAD__game-settings__category-buttons">
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
      <div className="MWAD__game-settings__start-game">
        <button onClick={handleStartGameClick}>Aloita peli</button>
      </div>
    </div>
  )
}

export default GameSettings