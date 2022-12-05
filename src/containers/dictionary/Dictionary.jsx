import React, { useState } from "react";
import "./dictionary.css";
import comp_basic from "../../assets/comp-basic.json";
import networks_basic from "../../assets/networks-basic.json"
import { Button } from "@mui/material";
import { styled as mstyled } from '@mui/material/styles';
import styled from '@emotion/styled'

import "../../index.css";
import WordList from "../../components/wordList/WordList";
import SingleWord from "../../components/singleWord/SingleWord";


import NativeSelect from '@mui/material/NativeSelect';
import InputBase from '@mui/material/InputBase';

const BootstrapInput = mstyled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 10,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #6F38C5',
    fontSize: 20,
    padding: '12px 0px 11px 10px',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 10,
      borderColor: '#6F38C5',
    },
  },
}));


const Input = styled.input`
  background-color: white;
  &:disabled {
    background-color: gray;
  }
`;


const CompBasicCategory = () => {
  const [category, setGategory] = useState("comp_basic")
  const [search, setSearch] = useState("");
  const [word, setWord] = useState(null)

  let selectedWords

 if(category === 'comp_basic'){
    selectedWords = comp_basic
  } else {
    selectedWords = networks_basic
  }
  
  let wordsToShow = selectedWords.filter((w) =>
      w.english.toLowerCase().includes(search.toLowerCase()) ||
      w.finnish.toLowerCase().includes(search.toLowerCase()) 
  );

  return (
    <div className="category">
      <div className="category__input">
        <div className="category__input-text">Suomi - Englanti - Suomi</div>
        <div className="category__input-box">
          <Input
            placeholder="Hae sanaa suomeksi tai englanniksi"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          ></Input>
          <div style={{ padding: "5px" }}></div>
          <NativeSelect
          value={category}
          onChange={(e)=>setGategory(e.target.value)}
          input={<BootstrapInput />}
        >
          <option value={"comp_basic"}>Tietotekniikan Perustermistöä</option>
          <option value={"networks_basic"}>Internet ja Tietoverkot</option>
        </NativeSelect>
        </div>
        <div>
          {search !== "" || word 
            ? 
              <div className="category__input-box_button">
                <Button variant="outlined" onClick={() => {setWord(null); setSearch("")}}>Tyhjennä haku</Button>
              </div>
            : <></>
          }
        </div>
      </div>
      { word 
      ? <SingleWord word={word} />
      : <WordList words={wordsToShow} setSearch={setSearch} setWord={setWord}/>
    }
      
    </div>
  );
};

export default CompBasicCategory;


