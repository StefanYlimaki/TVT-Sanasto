
import React from 'react'
import { Slider } from '@mui/material'
import '../index.css'
import { makeStyles } from '@material-ui/core/styles'

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

const GameLengthSlider = ({ handleChange, value }) => {

  const classes = useStyles()

  return (
    <Slider
      defaultValue = { 10 }
      min = { 4 }
      max = { 20 }
      valueLabelDisplay = "auto"
      marks = { marks }
      value = { value }
      onChange = { handleChange }
      classes = {{ markLabel: classes.mark }}
    />
  )
}

export default GameLengthSlider
