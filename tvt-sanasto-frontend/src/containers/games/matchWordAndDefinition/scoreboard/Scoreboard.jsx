import React from 'react'
import './scoreboard.css'
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

function Scoreboard({
  setGameRunning,
  raport
}) {
  const { points, rounds, category_id } = raport
  const { width, height } = useWindowSize()
  let won = false


  let category
  if(category_id === 'basic-comp'){
    category = 'Tietotekniikan Perustermistöä'
  } else if(category_id === 'internet-basic'){
    category = 'Internet ja Tietoverkot'
  } else (
    category = tuntematon
  )

  if(points === rounds){
    won = true
  }

  return (
    <div>
      { won
        ? (
          <div>
            Mahtavaa!
            <Confetti width={width} height={height} />
          </div>
        )
        : (<div>Parempi onni ensi kerralla!</div>)
      }
      <div>{`Sait ${points}/${rounds} pistettä kategoriassa ${category}`}</div>

      <button onClick={() => { setGameRunning('false') } }>
        sulje scoreboard
      </button>
    </div>
  )
}

export default Scoreboard
