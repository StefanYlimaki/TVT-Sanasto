import React from 'react'
import './scoreboard.css'
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

import { Table, TableBody, TableCell, TableContainer, TableRow, Paper, Button } from '@mui/material/'
import CheckIcon from '@mui/icons-material/Check'
import ClearIcon from '@mui/icons-material/Clear'

const Scoreboard = ({
  setGameRunning,
  raport
}) => {

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
    category = 'tuntematon'
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
      index: i,
      answer: raport.answers[i],
      question: raport.questions[i],
      correctAnswer: raport.questions[i].english,
    }
    raportRounds.push(round)
  }

  return (
    <div className='scoreboard'>
      <div className='scoreboard__textual-feedback'>
        { won
          ? (
            <div>
            Mahtavaa!
              <Confetti width={width} height={height} />
            </div>
          )
          : (<div>Parempi onni ensi kerralla!</div>)
        }
        {`Sait ${points}/${rounds} pistettä kategoriassa ${category}`}
      </div>
      <div className='scoreboard__raport'>
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
                  <strong>Vastauksesi</strong>
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
                        ? <CheckIcon />
                        : <ClearIcon />
                      }
                    </TableCell>
                    <TableCell>
                      { round.question.finnish }
                    </TableCell>
                    <TableCell>
                      { round.answer.english }
                    </TableCell>
                    <TableCell>
                      <div>
                        <p>{ round.correctAnswer }</p>
                      </div>
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