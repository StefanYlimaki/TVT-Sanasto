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
  setLanguages,
  amountOfGuesses,
  setAmountOfGuesses
}) {
  const [selectedCategory, setSelectedCategory] = useState(null) // Keeps track os selected category of words.
  const [isLoading, setIsLoading] = useState(true) // If the dictionary data hasn't yet been downloaded, isLoading is true and loading screen is shown.
  const [finnishChecked, setFinnishChecked] = useState(true) // keeps track of whether finnish as a question word language is checked
  const [englishChecked, setEnglishChecked] = useState(false) // keeps track of whether english as a question word language is checked

  // Checking if dictionary data has been downloaded to user's browser's localstorage.
  useEffect(() => {
    // If it is, set isLoading to false to render settings screen.
    if(localStorage.getItem('basic-comp') !== null && localStorage.getItem('internet-basic') !== null){
      setIsLoading(false)
    } else { // Otherwise, set interval to check repeatedly is the data downloaded. When data is downloaded, clear interval and set isLoading to false.
      const interval = setInterval(() => {
        if(localStorage.getItem('basic-comp') !== null && localStorage.getItem('internet-basic') !== null){
          if(isLoading === false){
            clearInterval(interval)
          }
          setIsLoading(false)
        }
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [])

  // If isLoading equals true => show loadingScreen
  if(isLoading){
    return(
      <LoadingScreen />
    )
  }

  // Function for getting chosen languages in an array.
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

  // Function for handling the change in the amount of guesses slider.
  const handleAmountOfGuessesSliderChange = (event) => {
    setAmountOfGuesses(event.target.value)
  }

  // Function for handling the change in the game length slider.
  const handleGameLengthSliderChange = (event) => {
    setGameLength(event.target.value)
  }

  // Function for handling a click on start game button.
  const handleStartGameClick = () => {
    // If category is selected => start the game
    if (selectedCategory !== null) {
      setCategory(selectedCategory)
      setGameRunning('true')
      setLanguages(getLanguages)
    } else { // otherwise, show error message.
      setErrorMessage('Valitse kategoria')
      setTimeout(() => {
        setErrorMessage(null)
      }, 2000)
    }
  }

  // This component reuses css from the game Match Word and Definition.
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
        <p>Valitse arvausten määrä:</p>
        <div className="MWAD__game-settings__gamelength-slider">
          <GameLengthSlider handleChange = { handleAmountOfGuessesSliderChange } value = { amountOfGuesses } min = {1} max = {9}/>
        </div>
      </div>
      <div className="MWAD__game-settings__gamelength">
        <p>Valitse kierrosten määrä:</p>
        <div className="MWAD__game-settings__gamelength-slider">
          <GameLengthSlider handleChange = { handleGameLengthSliderChange } value = { gameLength } min = {1} max = {5}/>
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