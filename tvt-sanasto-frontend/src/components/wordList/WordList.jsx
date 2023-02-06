import React from 'react'
import { List, ListItem, ListItemText } from '@mui/material'
import SingleWord from '../singleWord/SingleWord'
import './wordList.css'

const textColor = '#ADEFD1FF'

function WordList({ words, setSearch, setWord }) {
  return (
    <div className='wordlist'>
      {words.length === 1
        ? <SingleWord word={words[0]} />
        : (
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
        )}
    </div>
  )
}

export default WordList