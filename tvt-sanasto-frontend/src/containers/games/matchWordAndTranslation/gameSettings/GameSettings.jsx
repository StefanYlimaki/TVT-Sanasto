
import React, { useState, useEffect } from 'react'
import './gameSettings.css'
import { Checkbox, FormControlLabel, FormGroup, Slider } from '@mui/material'

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
  const [finnish, setFinnish] = useState(true)
  const [english, setEnglish] = useState(true)

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

  const getLanguages = () => {
    let array = new Array()

    if(finnish){
      array.push('finnish')
    }

    if(english){
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

  const handleFinnishChange = (event) => {
    setFinnish(event.target.checked)
  }

  const handleEnglishChange = (event) => {
    setEnglish(event.target.checked)
  }

  return(
    <div className="game__settings">
      <div className='game__setting-languages'>
        <div className='game__setting-languages__text'>
          <p>Kysymykset kielell??:</p>
        </div>
        <div className='game__setting-languages__checkbox'>
          <p>Suomi <Checkbox checked={finnish} onChange={handleFinnishChange} /></p>
          <p>Englanti <Checkbox checked={english} onChange={handleEnglishChange} /></p>
        </div>
      </div>
      <div className="game__setting-gamelength">
        <p>Valitse kierrosten lukum????r??:</p>
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
        <p>Valitse vaihtoehtojen lukum????r??:</p>
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
            Tietotekniikan Perustermist????
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