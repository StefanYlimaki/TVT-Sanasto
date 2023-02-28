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

export default AmountOfOptionsSlider