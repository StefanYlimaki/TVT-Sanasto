
import React from 'react'
import { Slider } from '@mui/material'


const GameLengthSlider = ({ handleChange, value }) => {

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

  return (
    <Slider
      defaultValue = { 10 }
      min = { 4 }
      max = { 20 }
      valueLabelDisplay = "auto"
      marks = { marks }
      value = { value }
      onChange = { handleChange }
    />
  )
}

export default GameLengthSlider