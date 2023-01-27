import React from 'react'
import { List, ListItem, ListItemText } from '@mui/material'
import SingleWord from '../singleWord/SingleWord'
import './wordList.css'

const color = '#453C67'

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
                  primaryTypographyProps={{ fontSize: 18, color: { color } }}
                  secondaryTypographyProps={{ fontSize: 14, color: { color } }}
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