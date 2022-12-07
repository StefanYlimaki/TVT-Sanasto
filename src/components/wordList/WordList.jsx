

import React from 'react'
import { List, ListItem, ListItemText } from "@mui/material";
import SingleWord from "../../components/singleWord/SingleWord";
import './wordList.css'

const color = "#453C67";

const WordList = ({ words, setSearch, setWord }) => {

  return (
    <div>
        {words.length === 1 
      ? <SingleWord word={words[0]} />
      : 
        <List className="category__list" dense={true}>
          {words.map((word) => (
            <ListItem className="category__list-item" key={word.id}>
              <ListItemText
                onClick={() => {setWord(word); setSearch(word.english)}}
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
      }
    </div>
  )
}

export default WordList