import React, { useState, useEffect } from 'react'
import { Checkbox } from '@mui/material'

import LoadingScreen from '../../../../components/loadingScreen/LoadingScreen'
import GameLengthSlider from '../../../../elements/GameLengthSlider'
import AmountOfOptionsSlider from '../../../../elements/AmountOfOptionsSlider'
import './MWAT__gameSettings.css'

/**
 * MWAT_GameSettings component is responsible for rendering a settings screen for the MWAT-game.
 * @param { setCategory } function Function to set a category for the game.
 * @param { gameLength } integer Value that represents the desired amount of rounds to be played.
 * @param { setGameLength } function Function to change a value described above.
 * @param { setErrorMessage } function Function to set an error message.
 * @param { setGameRunning } function Function to set game running (will cause the gameplay to be rendered, instead of game settings).
 * @param { amountOfOptions } integer Value that represents the desired amount of answer options to be displayed in each round.
 * @param { setAmountOfOptions } function Function to change a value desribed above.
 * @param { setLanguages } function Function to set the language of question words (can contain multiple languges)
 * @returns Game Settings screen
 */
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

  const [selectedCategory, setSelectedCategory] = useState(null) // Used to keep track of the category selected.
  const [isLoading, setIsLoading] = useState(true) // If words aren't loaded, game settings screen can't be rendered.
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

  return(
    <div className="MWAT__game-settings">
      <div className='MWAT__game-settings__languages'>
        <div className='MWAT__game-settings__languages-text'>
          <p>Kysymykset kielellä:</p>
        </div>
        <div className='MWAT__game-settings__languages-checkbox'>
          <p>Suomi <Checkbox checked = { finnishChecked } onChange = { (event) => setFinnishChecked(event.target.checked) } /></p>
          <p>Englanti <Checkbox checked = { englishChecked } onChange = { (event) => setEnglishChecked(event.target.checked) } /></p>
        </div>
      </div>
      <div className="MWAT__game-settings__gamelength">
        <p>Valitse kierrosten lukumäärä:</p>
        <div className="MWAT__game-settings__gamelength-slider">
          <GameLengthSlider handleChange = { handleRoundsSliderChange } value = { gameLength }  min = {4} max = { 20 } defaultValue = { 10 } />
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
