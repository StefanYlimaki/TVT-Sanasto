import React from 'react'
import './scoreboard.css'
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

import { Table, TableBody, TableCell, TableContainer, TableRow, Paper, Button } from '@mui/material/'
import CheckIcon from '@mui/icons-material/Check'
import ClearIcon from '@mui/icons-material/Clear'

import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect'

const Scoreboard = ({
  setGameRunning,
  raport
}) => {
  const { points, rounds, category_id } = raport
  const { width, height } = useWindowSize()
  let won = false

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
      language: raport.questionLanguages[i],
      answer: raport.answers[i],
      question: raport.questions[i],
      correctAnswer: raport.questions[i]
    }
    raportRounds.push(round)
  }


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
        <div className='scoreboard__raport'>
          <TableContainer className='scoreboard__raport-table' component={Paper}>
            <Table>
              <TableBody>
                <TableRow className='tableRow' style={{ backgroundColor: '#7CFC00' }}>
                  <TableCell className='tablecell'>
                    <p><strong>Oikein/ Väärin</strong></p>
                  </TableCell>
                  <TableCell className='tablecell'>
                    <p><strong>Kysytty Sana</strong></p>
                  </TableCell>
                  <TableCell className='tablecell'>
                    <p><strong>Vastauksesi</strong></p>
                  </TableCell>
                  <TableCell className='tablecell'>
                    <p><strong>Oikea Vastaus</strong></p>
                  </TableCell>
                </TableRow>
                {
                  raportRounds.map((round) => (
                    <TableRow key={round.question.id} style={{ backgroundColor: '#F0F8FF' }}>
                      <TableCell className='tablecell'>
                        { checkIfCorrect(round)
                          ? <CheckIcon />
                          : <ClearIcon />
                        }
                      </TableCell>
                      <TableCell className='tablecell'>
                        <p>{ getPromptedWord(round) }</p>
                      </TableCell>
                      <TableCell className='tablecell'>
                        <p>{ getAnsweredWord(round) }</p>
                      </TableCell>
                      <TableCell className='tablecell'>
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
            <div className='mobile__raport' key={round.question.id}>
              <TableContainer className='mobile__raport-tableContainter' component={ Paper }>
                <Table className='mobile__raport-table' >
                  <TableBody className='mobile__raport-tablebody' >
                    <TableRow className='mobile__raport-tablerow'>
                      <TableCell className='mobile__raport-header__tablecell'>
                        <p><strong>Oikein/Väärin</strong></p>
                      </TableCell>
                      <TableCell className='mobile__raport-content__tablecell'>
                        { checkIfCorrect(round)
                          ? <CheckIcon />
                          : <ClearIcon />
                        }
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className='mobile__raport-header__tablecell'>
                        <p><strong>Kysytty Sana</strong></p>
                      </TableCell>
                      <TableCell className='mobile__raport-content__tablecell'>
                        <p>{ round.question.finnish }</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className='mobile__raport-header__tablecell'>
                        <p><strong>Vastauksesi</strong></p>
                      </TableCell>
                      <TableCell className='mobile__raport-content__tablecell'>
                        <p>{ round.answer.english }</p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className='mobile__raport-header__tablecell'>
                        <p><strong>Oikea Vastaus</strong></p>
                      </TableCell>
                      <TableCell className='mobile__raport-content__tablecell'>
                        <div>
                          <p>{ round.correctAnswer }</p>
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