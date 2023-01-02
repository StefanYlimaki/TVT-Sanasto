import React, { useState, useEffect } from 'react'
import './gameSettings.css'
import { Slider } from '@mui/material'

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
    return(<div>Loading...</div>)
  }

  const marks = [
    {
      value: 4,
      label: '4',
    },
    {
      value: 10,
      label: '10',
    },
    {
      value: 20,
      label: '20',
    },
  ]

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
    <div className="game__settings">
      <div className="game__setting-gamelength">
        <p>Valitse kierrosten määrä:</p>
        <div className="game__setting-gamelength_slider">
          <Slider
            defaultValue={10}
            min={4}
            max={20}
            valueLabelDisplay="auto"
            marks={marks}
            value={gameLength}
            onChange={handleSliderChange}
          />
        </div>
      </div>
      <div className="game__settings-category">
        <p>Valitse kategoria:</p>
        <div className="game__settings-category_buttons">
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
      <div className="game__settings-start_game">
        <button onClick={handleStartGameClick}>Aloita peli</button>
      </div>
    </div>
  )
}

export default GameSettings
