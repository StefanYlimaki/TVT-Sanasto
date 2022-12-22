import React from 'react'
import './scoreboard.css'
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

import { Table, TableBody, TableCell, TableContainer, TableRow, Paper, Button } from '@mui/material/'
import CheckIcon from '@mui/icons-material/Check'
import ClearIcon from '@mui/icons-material/Clear'



function Scoreboard({
  setGameRunning,
  raport
}) {
  const { points, rounds, category_id } = raport
  const { width, height } = useWindowSize()
  let won = false

  console.log(raport)

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

  const checkIfCorrect = (round) => {
    if(round.answer.id === round.question.id){
      return true
    }
    return false
  }

  const raportRounds = []

  for(let i = 0; i < rounds; i++){
    let round = {
      answer: raport.answers[i],
      question: raport.questions[i],
      correctDefinition: raport.questions[i].definition
    }
    raportRounds.push(round)
  }

  console.log(raportRounds)


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
      <div>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              <TableRow style={{ backgroundColor: '#7CFC00' }}>
                <TableCell>
                  <strong>Oikein/Väärin</strong>
                </TableCell>
                <TableCell>
                  <strong>Kysytty Sana</strong>
                </TableCell>
                <TableCell>
                  <strong>Oikea Vastaus</strong>
                </TableCell>
              </TableRow>
              {
                raportRounds.map((round) => (
                  <TableRow key={round.question.id} style={{ backgroundColor: '#F0F8FF' }}>
                    <TableCell>
                      { checkIfCorrect(round)
                        ? <div><CheckIcon /></div>
                        : <div><ClearIcon /></div>
                      }
                    </TableCell>
                    <TableCell>
                      { round.question.finnish }
                    </TableCell>
                    <TableCell>
                      { round.question.definition }
                    </TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <Button variant="contained" onClick={() => { setGameRunning('false') } }>
        Sulje Raportti
      </Button>
    </div>
  )
}


export default Scoreboard
