import React from 'react'
import { List, ListItem, ListItemText } from '@mui/material'
import './wordList.css'

const textColor = '#ADEFD1FF'

/**
 * @param { words } array // words to show
 * @param { setSearch } function // function to set search to match the word that was clicked on.
 * @param { setWord } array // function to set word when there's only one word in the words to show array.
 * @returns Word List -component
 */

function WordList({ words, setSearch, setWord }) {

  // If the lenght of the list of words is equal to one, setWord to that one word.
  // This updates the state initialised in the dictionary -component, and dictionary component will then render the singleWord -component instead of wordList.
  if(words.length === 1){
    setWord(words[0])
  }

  return (
    <div className='wordlist'>
      <List className="category__list" dense>
        {words.map((word) => (
          <ListItem className="category__list-item" key={word.id}>
            <ListItemText
              onClick={() => { setWord(word); setSearch(word.english); window.scrollTo(0, 0) }}
              primaryTypographyProps={{ fontSize: 20, color: textColor, fontFamily: 'Manrope' }}
              secondaryTypographyProps={{ fontSize: 14, color: textColor, fontFamily: 'Manrope' }}
              className="category__list-item_text"
              key={word.id}
              primary={word.english}
              secondary={word.finnish}
            />
          </ListItem>
        ))}
      </List>

    </div>
  )
}

export default WordList