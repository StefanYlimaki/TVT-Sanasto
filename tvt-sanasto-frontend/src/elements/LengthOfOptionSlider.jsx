import React from 'react'
import { Slider } from '@mui/material'

/**
 * Responsible for returning an slider to control the lenght of text
 */
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
