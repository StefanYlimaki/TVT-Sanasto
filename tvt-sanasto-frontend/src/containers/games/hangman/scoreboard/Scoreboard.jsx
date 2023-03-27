import React, { useState } from 'react'

import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import { Table, TableBody, TableHead, TableCell, TableContainer, TableRow, Paper, Button } from '@mui/material/'
import { makeStyles } from '@material-ui/styles'
import CheckIcon from '@mui/icons-material/Check'
import ClearIcon from '@mui/icons-material/Clear'

const Scoreboard = ({
  setGameRunning,
  points,
  rounds,
}) => {

  let won
  if(points === rounds){
    won = true
  } else {
    won = false
  }

  const { width, height } = useWindowSize() // Getting the width and height of the user's devices viewport.

  return (
    <div className='MWAD__scoreboard'>
      <div className='MWAD__scoreboard-textual__feedback'>
        { won
          ? (
            <div>
              Mahtavaa!
              <Confetti width={width} height={height} />
            </div>
          )
          : (<div>Parempi onni ensi kerralla!</div>)
        }
        {`Sait ${points}/${rounds} pistettä`}
      </div>
      <div className='MWAD__closebutton'>
        <Button color='warning' onClick={() => { setGameRunning('false') } }>Sulje raportti</Button>
      </div>
    </div>
  )
}

export default Scoreboard