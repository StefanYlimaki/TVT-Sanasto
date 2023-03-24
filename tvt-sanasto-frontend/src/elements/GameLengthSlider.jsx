
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

  const getMarks = (min) => {
    if(min === 1){
      return [
        {
          value: 1,
          label: '1',
        },
        {
          value: 2,
          label: '2',
        },
        {
          value: 3,
          label: '3',
        },
        {
          value: 4,
          label: '4',
        }
      ]
    } else {
      return [
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
    }
  }

  const classes = useStyles()

  return (
    <Slider
      defaultValue = { 10 }
      min = { min }
      max = { max }
      valueLabelDisplay = "auto"
      marks = { getMarks(min) }
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
