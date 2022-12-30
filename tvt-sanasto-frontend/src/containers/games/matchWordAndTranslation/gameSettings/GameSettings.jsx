import React, { useState } from 'react'
import './gameSettings.css'
import { Slider } from '@mui/material'

const GameSettings = ({
  setCategory,
  gameLength,
  setGameLength,
  setErrorMessage,
  setGameRunning,
  amountOfOptions,
  setAmountOfOptions
}) => {

  const [selectedCategory, setSelectedCategory] = useState(null) // Keeps track of selected category

  const marksForAmountOfRounds = [
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

  const MarksForAmountOfOptions = [
    {
      value: 2,
      label: '2',
    },
    {
      value: 4,
      label: '4',
    },
    {
      value: 6,
      label: '6',
    },
    {
      value: 8,
      label: '8',
    },
  ]

  const handleRoundsSliderChange = (event) => {
    setGameLength(event.target.value)
  }

  const handleOptionsSliderChange = (event) => {
    setAmountOfOptions(event.target.value)
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

  return(
    <div className="game__settings">
      <div className="game__setting-gamelength">
        <p>Valitse kierrosten lukumäärä:</p>
        <div className="game__setting-gamelength_slider">
          <Slider
            defaultValue={10}
            min={4}
            max={20}
            valueLabelDisplay="auto"
            marks={marksForAmountOfRounds}
            value={gameLength}
            onChange={handleRoundsSliderChange}
          />
        </div>
      </div>
      <div className="game__setting-gamelength">
        <p>Valitse vaihtoehtojen lukumäärä:</p>
        <div className="game__setting-gamelength_slider">
          <Slider
            defaultValue={4}
            min={2}
            max={8}
            valueLabelDisplay="auto"
            marks={MarksForAmountOfOptions}
            value={amountOfOptions}
            onChange={handleOptionsSliderChange}
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