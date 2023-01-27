import React from 'react'
import { Slider } from '@mui/material'

const LengthOfOptionSlider = ({ handleChange, value }) => {

  return (
    <Slider
      defaultValue = { 300 }
      min = { 200 }
      max = { 800 }
      step = { 100 }
      valueLabelDisplay = "auto"
      value = { value }
      onChange = { handleChange }
    />
  )
}

export default LengthOfOptionSlider
