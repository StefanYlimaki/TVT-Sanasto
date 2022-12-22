import React from 'react'
import './gameSettings.css'

const GameSettings = ({
  setGameRunning
}) => {
  return (
    <div>
      <p>GameSettings</p>
      <button onClick={ () => setGameRunning(true) }>start game</button>
    </div>
  )
}

export default GameSettings