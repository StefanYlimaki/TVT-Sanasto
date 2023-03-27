import React from 'react'
import { Slider } from '@mui/material'
import { makeStyles } from '@material-ui/core/styles'

import '../index.css'

/**
 * Responsible for returning a slider for controlling the amount of answer options for a game
 * @param { handleChange } function Function to call, onChange -function of slider triggers
 * @param { value } integer value of slider
 * @returns Slider to set amount of answer options in a game
 */
const AmountOfOptionsSlider = ({ handleChange, value }) => {
  const classes = useStyles()

  return (
    <Slider
      defaultValue={4}
      min={2}
      max={8}
      valueLabelDisplay="auto"
      marks={marks}
      value={value}
      onChange={handleChange}
      classes = {{ markLabel: classes.mark }}
    />
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300,
  },
  margin: {
    height: theme.spacing(3),
  },
  mark: {
    color: 'white',
  },
}))

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

export default AmountOfOptionsSlider