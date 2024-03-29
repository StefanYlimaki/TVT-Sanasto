import React, { useState, useEffect } from 'react'

import LoadingScreen from '../../../../components/loadingScreen/LoadingScreen'
import GameLengthSlider from '../../../../elements/GameLengthSlider'
import './MWAD__gameSettings.css'

function GameSettings({
  setCategory,
  gameLength,
  setGameLength,
  setErrorMessage,
  setGameRunning
}) {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

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

  const handleSliderChange = (event) => {
    setGameLength(event.target.value)
  }

  const handleStartGameClick = () => {
    if (selectedCategory !== null) {
      setCategory(selectedCategory)
      setGameRunning('true')
    } else {
      setErrorMessage('Valitse kategoria')
      setTimeout(() => {
        setErrorMessage(null)
      }, 2000)
    }
  }

  return (
    <div className="MWAD__game-settings">
      <div className="MWAD__game-settings__gamelength">
        <p>Valitse kierrosten määrä:</p>
        <div className="MWAD__game-settings__gamelength-slider">
          <GameLengthSlider handleChange = { handleSliderChange } value = { gameLength }  min = {4} max = { 20 } defaultValue = { 10 } />
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