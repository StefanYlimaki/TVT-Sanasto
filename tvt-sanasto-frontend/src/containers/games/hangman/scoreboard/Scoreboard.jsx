import React from 'react'

import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import { Button } from '@mui/material/'

const Scoreboard = ({
  setGameRunning,
  points,
  rounds,
}) => {

  // Determine if the player won all the rounds
  let won
  if(points === rounds){
    won = true
  } else {
    won = false
  }

  const { width, height } = useWindowSize() // Getting the width and height of the user's devices viewport.

  // This component reuses css from the game Match Word and Definition.
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