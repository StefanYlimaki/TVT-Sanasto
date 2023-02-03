import React from 'react'

import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import { BrowserView, MobileView } from 'react-device-detect'
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper, Button } from '@mui/material/'
import CheckIcon from '@mui/icons-material/Check'
import ClearIcon from '@mui/icons-material/Clear'

import { checkIfCorrect } from '../../../../utils/checkIfCorrect'

import './MWAT__scoreboard.css'

const Scoreboard = ({
  setGameRunning,
  raport
}) => {
  console.log(raport)

  const { points, rounds, category_id } = raport
  const { width, height } = useWindowSize()
  let won = false
  const raportRounds = []
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

  for(let i = 0; i < rounds; i++){
    let round = {
      index: i,
      language: raport.questionLanguages[i],
      answer: raport.answers[i],
      question: raport.questions[i],
      correctAnswer: raport.questions[i]
    }
    raportRounds.push(round)
  }

  console.log(raportRounds)


  const getPromptedWord = (round) => {
    if(round.language === 'finnish'){
      return round.question.finnish
    }
    return round.question.english
  }

  const getAnsweredWord = (round) => {
    if(round.language === 'finnish'){
      return round.answer.english
    }
    return round.answer.finnish
  }

  const getCorrectAnswer = (round) => {
    if(round.language === 'finnish'){
      return round.correctAnswer.english
    }
    return round.correctAnswer.finnish
  }

  return (
    <div className='scoreboard'>
      { /* BROWSERS */}
      <BrowserView>
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
        <div className='browser__scoreboard-raport'>
          <TableContainer className='browser__scoreboard-raport__table' component={Paper}>
            <Table>
              <TableBody>
                <TableRow className='browser__tableRow'>
                  <TableCell className='browser__tablecell'>
                    <p><strong>Oikein / Väärin</strong></p>
                  </TableCell>
                  <TableCell className='browser__tablecell'>
                    <p><strong>Kysytty Sana</strong></p>
                  </TableCell>
                  <TableCell className='browser__tablecell'>
                    <p><strong>Vastauksesi</strong></p>
                  </TableCell>
                  <TableCell className='browser__tablecell'>
                    <p><strong>Oikea Vastaus</strong></p>
                  </TableCell>
                </TableRow>
                {
                  raportRounds.map((round) => (
                    <TableRow key={round.question.id} className='browser__tablerow' style={{ backgroundColor: '#F0F8FF' }}>
                      <TableCell className='browser__tablecell'>
                        { checkIfCorrect(round)
                          ? <CheckIcon />
                          : <ClearIcon />
                        }
                      </TableCell>
                      <TableCell className='browser__tablecell'>
                        <p>{ getPromptedWord(round) }</p>
                      </TableCell>
                      <TableCell className='browser__tablecell'>
                        <p>{ getAnsweredWord(round) }</p>
                      </TableCell>
                      <TableCell className='browser__tablecell'>
                        <p>{ getCorrectAnswer(round) }</p>
                      </TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </BrowserView>
      { /* MOBILE DEVICES */}
      <MobileView>
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

        {
          raportRounds.map((round) => (
            <div className='mobile__scoreboard-raport' key={round.question.id}>
              <TableContainer className='mobile__scoreboard-raport__table' component={ Paper }>
                <Table className='mobile__table'>
                  <TableBody className='mobile__tablebody'>
                    <TableRow className='mobile__tablerow'>
                      <TableCell className='mobile__tablecell-header'>
                        <p><strong>Oikein/Väärin</strong></p>
                      </TableCell>
                      <TableCell className='mobile__tablecell-content'>
                        { checkIfCorrect(round)
                          ? <CheckIcon />
                          : <ClearIcon />
                        }
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className='mobile__tablecell-header'>
                        <p><strong>Kysytty Sana</strong></p>
                      </TableCell>
                      <TableCell className='mobile__tablecell-content'>
                        <p>{ getPromptedWord(round) }</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className='mobile__tablecell-header'>
                        <p><strong>Vastauksesi</strong></p>
                      </TableCell>
                      <TableCell className='mobile__tablecell-content'>
                        <p>{ getAnsweredWord(round) }</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className='mobile__tablecell-header'>
                        <p><strong>Oikea Vastaus</strong></p>
                      </TableCell>
                      <TableCell className='mobile__tablecell-content'>
                        <div>
                          <p>{ getCorrectAnswer(round) }</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          ))

        }
      </MobileView>
      <div style={{ height: '20px' }}></div>
      <Button variant="contained" onClick={() => { setGameRunning('false') } }>
        Sulje Raportti
      </Button>
    </div>
  )

}


export default Scoreboard
