import React, { useState } from 'react'

import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper, Button } from '@mui/material/'
import CheckIcon from '@mui/icons-material/Check'
import ClearIcon from '@mui/icons-material/Clear'

import { checkIfCorrect } from '../../../../utils/checkIfCorrect'

import './MWAD__scoreboard.css'

function Scoreboard({
  setGameRunning, // This is a function to stop the game running. It's called when a user clicks on "close raport" in the scoreboard view.
  raport // This is an objest which contains information such as game length, points, questions and answers about the played game.
}) {

  const { points, rounds, category_id } = raport // Let's get the points, rounds and category to be own variables.

  // This array keeps track of which answers should be rendered in full lenght. By default every answer is rendered in shortened version.
  const [showFullLength, setShowFullLength] = useState(Array(rounds).fill(false))

  const { width, height } = useWindowSize() // Getting the width and height of the user's devices viewport.

  // Boolean variable to store the information about has the user won or lost the game. Initialised as false.
  // Used when conditionally rendering the message and deploying confetti.
  let won = false

  // Initialising an array for later use. Used to gather information by rounds.
  // Used to store round objects which contain all the information about a certain round.
  const raportRounds = []

  let category // Initialising a category variable. Used later when rendering the category

  // Assinging the correct string to the category variable.
  if(category_id === 'basic-comp'){
    category = 'Tietotekniikan Perustermistöä'
  } else if(category_id === 'internet-basic'){
    category = 'Internet ja Tietoverkot'
  } else (
    category = 'tuntematon'
  )

  // Determining whether user has won the game.
  if(points === rounds){
    won = true
  }

  // Combining information of each round to the rounds array.
  // The rounds array's objects contain the following:
  // index (the round number), answer (the user's answer for that round), question (the question asked that round),
  // correct definition (the correct answer's definition).
  // Lastly push the generated round object to raportRounds array.
  for(let i = 0; i < rounds; i++){
    let round = {
      index: i,
      answer: raport.answers[i],
      question: raport.questions[i],
      correctDefinition: raport.questions[i].definition
    }
    raportRounds.push(round)
  }

  // Function for shortening a definition, so that definition's max length is 300 characters.
  // The shortened definition is further shortened to a last '.' character.
  const getShortenedDefinition = (definition) => {
    const shortenedText = definition.substring(0, 300)
    const lastIndex = shortenedText.lastIndexOf('.')
    return shortenedText.substring(0, lastIndex + 1)
  }

  // Function for handling the toggling of definition lengths.
  const toggleShowFullLength = (round) => {
    let temp = [...showFullLength]
    temp[round.index] = !temp[round.index]
    setShowFullLength(temp)
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
                      { showFullLength[round.index]
                        ?
                        <div>
                          <p>{ round.question.definition }</p>
                          <Button size="small" onClick={ () => toggleShowFullLength(round) }>Piilota koko vastaus</Button>
                        </div>
                        :
                        <div>
                          <p>{ getShortenedDefinition(round.question.definition) }</p>
                          <Button size="small" onClick={ () => toggleShowFullLength(round) }>Näytä koko vastaus</Button>
                        </div>
                      }
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
