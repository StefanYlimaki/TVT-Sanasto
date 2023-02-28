import React from 'react'

import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import { BrowserView, MobileView } from 'react-device-detect'
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper, Button, TableHead } from '@mui/material/'
import { makeStyles } from '@material-ui/styles'
import CheckIcon from '@mui/icons-material/Check'
import ClearIcon from '@mui/icons-material/Clear'

import { checkIfCorrect } from '../../../../utils/checkIfCorrect'

import './MWAT__scoreboard.css'

const useStyles = makeStyles({
  customTableContainer: {
    overflowX: 'initial',
  }
})

const Scoreboard = ({
  setGameRunning,
  raport
}) => {

  const classes = useStyles()

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
    <div className='MWAT__scoreboard'>
      { /* BROWSERS */}
      <BrowserView>
        <div className='MWAT__scoreboard-textual__feedback'>
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
        <div className='MWAT__scoreboard-raport'>
          <TableContainer className='MWAT__scoreboard-raport__table-container' classes={{ root: classes.customTableContainer }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow className='MWAT__tablerow-header'>
                  <TableCell className='MWAT__tablecell-header' style={{ backgroundColor: '#ADEFD1FF' }}>
                    <p><strong>Oikein / Väärin</strong></p>
                  </TableCell>
                  <TableCell className='MWAT__tablecell-header' style={{ backgroundColor: '#ADEFD1FF' }}>
                    <p><strong>Kysytty Sana</strong></p>
                  </TableCell>
                  <TableCell className='MWAT__tablecell-header' style={{ backgroundColor: '#ADEFD1FF' }}>
                    <p><strong>Vastauksesi</strong></p>
                  </TableCell>
                  <TableCell className='MWAT__tablecell-header' style={{ backgroundColor: '#ADEFD1FF' }}>
                    <p><strong>Oikea Vastaus</strong></p>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { raportRounds.map((round) => (
                  <TableRow key={round.question.id} className='MWAT__tableRow-content'>
                    <TableCell className='MWAT__tablecell-content'>
                      { checkIfCorrect(round)
                        ? <CheckIcon color='success'/>
                        : <ClearIcon color='error'/>
                      }
                    </TableCell>
                    <TableCell className='MWAT__tablecell-container'>
                      <div className='MWAT__tablecell-container__content'>
                        <p>{ getPromptedWord(round) }</p>
                      </div>
                    </TableCell>
                    <TableCell className='MWAT__tablecell-container'>
                      <div className='MWAT__tablecell-container__content'>
                        <p>{ getAnsweredWord(round) }</p>
                      </div>
                    </TableCell>
                    <TableCell className='MWAT__tablecell-container'>
                      <div className='MWAT__tablecell-container__content'>
                        <p>{ getCorrectAnswer(round) }</p>
                      </div>
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
              <TableContainer className='mobile__scoreboard-raport__table' classes={{ root: classes.customTableContainer }}>
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

      <div className='MWAT__closebutton'>
        <Button color='warning' onClick={() => { setGameRunning('false') } }>Sulje raportti</Button>
      </div>
    </div>
  )

}


export default Scoreboard
