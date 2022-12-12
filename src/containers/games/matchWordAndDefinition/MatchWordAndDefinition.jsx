import React, { useState } from 'react'
import './matchWordAndDefinition.css'

import GameSettings from './gameSettings/GameSettings'
import Gameplay from './gameplay/Gameplay'
import Scoreboard from './scoreboard/Scoreboard'

function MatchWordAndDefinition() {
  const [words, setWords] = useState(null) // Words from the chosen category
  const [scoreBoardVisible, setScoreBoardVisible] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [points, setPoints] = useState(0)
  // game lenght in rounds
  const [gameLength, setGameLength] = useState(10)
  const [condition, setCondition] = useState(null)

  return (
    <div className="game">
      {/* If error message is not null, render it, otherwise render nothing  */}
      {errorMessage !== null ? (
        <div className="game__error">{errorMessage}</div>
      ) : (
        <></>
      )}

      {/*
        If words are not chosen yet and scoreboard is not visible, render game settings
        If words are chosen and scoreboard is not visible, render gameplay
        If scoreboard is visible, render scoreboard
      */}
      {words === null && !scoreBoardVisible ? (
        <div className="game__settings">
          <GameSettings
            setWords={setWords}
            gameLength={gameLength}
            setGameLength={setGameLength}
            setErrorMessage={setErrorMessage}
          />
        </div>
      ) : (
        <div>
          {!scoreBoardVisible ? (
            <div className="game__gameplay">
              <Gameplay
                setWords={setWords}
                words={words}
                setPoints={setPoints}
                points={points}
                setScoreBoardVisible={setScoreBoardVisible}
                setError={setErrorMessage}
                setCondition={setCondition}
                gameLenght={gameLength}
              />
            </div>
          ) : (
            <div>
              <Scoreboard
                setPoints={setPoints}
                points={points}
                setScoreBoardVisible={setScoreBoardVisible}
                setCondition={setCondition}
                condition={condition}
                gameLenght={gameLength}
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default MatchWordAndDefinition
