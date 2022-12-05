import React from 'react'
import './networksBasicCategory.css'
import words from '../../assets/networks-basic.json'
import { List, ListItem, ListItemText } from '@mui/material'
import { Link } from 'react-router-dom'

const NetworksBasicCategory = () => {
  return (
    <div className='category'>
      <List className='category__list' dense={false}>
        {words.map(word => 
          <ListItem className='category__list-item' key={word.id} component={Link} to={`/networks_basic/${word.id}`}>
            <ListItemText 
              primaryTypographyProps={{ fontSize: 18, color: 'white'}} 
              secondaryTypographyProps={{ fontSize: 14, color: 'white'}}
              className='category__list-item_text' 
              key={word.id} 
              primary={word.english} 
              secondary={word.finnish}
              />
          </ListItem>
        )}
      </List>
    </div>
  )
}

export default NetworksBasicCategory