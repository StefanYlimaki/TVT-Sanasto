import React from 'react'
import './scoreboard.css'

import { Button } from '@mui/material'

const Scoreboard = ({
  setGameRunning
}) => {
  return (
    <div>
      <p>Scoreboard</p>
      <Button onClick={() => setGameRunning('false')}>Sulje Scoreboard</Button>
    </div>
  )

}


export default Scoreboard