import React from 'react'
import './scoreboard.css'
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

function Scoreboard({
  setPoints,
  points,
  setScoreBoardVisible,
  setCondition,
  condition,
  gameLenght,
}) {
  const { width, height } = useWindowSize()
  return (
    <div>
      {condition === 'won'
        ? (
          <div>
            <Confetti width={width} height={height} />
            Voitit Pelin
          </div>
        )
        : <div>Hävisit pelin</div>}
      <p>
        Sait
        {points}
        /
        {gameLenght}
        {' '}
        pistettä
      </p>
      <button
        onClick={() => {
          setScoreBoardVisible(false)
          setPoints(0)
          setCondition(null)
        }}
      >
        sulje scoreboard
      </button>
    </div>
  )
}

export default Scoreboard
