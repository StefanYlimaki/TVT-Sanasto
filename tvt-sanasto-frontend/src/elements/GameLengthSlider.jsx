
import React from 'react'
import { Slider } from '@mui/material'
import '../index.css'
import { makeStyles } from '@material-ui/core/styles'


/**
 * Responsible for returning a slider for controlling the amount of rounds to be played.
 * @param { handleChange } function Function to call, onChange -function of slider triggers
 * @param { value } integer value of slider
 * @returns Slider to set amount of rounds in a game
 */
const GameLengthSlider = ({ handleChange, value, min, max }) => {

  const getMarks = (min, max) => {
    return [
      {
        value: min,
        label: `${min}`
      },
      {
        value: Math.floor(min + (max - min)/2),
        label: `${Math.floor(min + (max - min)/2)}`
      },
      {
        value: max,
        label: `${max}`
      }
    ]
  }

  const classes = useStyles()
  return (
    <Slider
      min = { min }
      max = { max }
      valueLabelDisplay = "auto"
      marks = { getMarks(min, max) }
      value = { value }
      onChange = { handleChange }
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



export default GameLengthSlider
