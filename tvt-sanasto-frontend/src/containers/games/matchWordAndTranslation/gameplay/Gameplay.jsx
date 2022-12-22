import { Button } from '@mui/material'
import React, { useState } from 'react'
import Scoreboard from '../scoreboard/Scoreboard'
import './gameplay.css'

const Gameplay = ({
  setGameRunning
}) => {

  const [gameHasEnded, setGameHasEnded] = useState(false)

  return (
    <div>
      { gameHasEnded
        ?
        <Scoreboard
          setGameRunning = { setGameRunning }
        />
        :
        <div>
          <p>Gameplay</p>
          <Button onClick={ () => setGameHasEnded(true) } >Lopeta Peli</Button>
        </div>
      }
    </div>
  )
}


export default Gameplay