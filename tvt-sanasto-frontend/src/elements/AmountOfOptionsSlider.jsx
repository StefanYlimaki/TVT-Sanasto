import React from 'react'
import { Slider } from '@mui/material'

const AmountOfOptionsSlider = ({ handleChange, value }) => {
  const marks = [
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

  return (
    <Slider
      defaultValue={4}
      min={2}
      max={8}
      valueLabelDisplay="auto"
      marks={marks}
      value={value}
      onChange={handleChange}
    />
  )
}

export default AmountOfOptionsSlider
