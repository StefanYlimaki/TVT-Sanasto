import React, { useState } from 'react'
import './gameSettings.css'
import { Slider } from '@mui/material'

function GameSettings({
  setWords, gameLength, setGameLength, setErrorMessage,
}) {
  const [selectedCategory, setSelectedCategory] = useState(null)

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

  const handleSliderChange = (event, newValue) => {
    setGameLength(newValue)
  }

  const handleStartGameClick = () => {
    if (selectedCategory !== null) {
      setWords(JSON.parse(localStorage.getItem(selectedCategory)))
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
              setSelectedCategory('networks-basic')
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
