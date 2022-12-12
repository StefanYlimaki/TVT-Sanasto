import React, { useState } from "react";
import { Button } from "@mui/material";
import { styled as mstyled } from '@mui/material/styles';

import "./dictionary.css";
import WordList from "../../components/wordList/WordList";
import SingleWord from "../../components/singleWord/SingleWord";
import comp_basic from "../../assets/data/comp-basic.json";
import networks_basic from "../../assets/data/networks-basic.json"

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
    fontFamily: [].join(','),
    '&:focus': {
      borderRadius: 10,
      borderColor: '#6F38C5',
    },
  },
}));

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
          <div className="category__input-box_search">
            <input
              placeholder="Hae sanaa englanniksi tai suomeksi"
              type="text"
              value={search}
              onChange={(e) => {setWord(null); setSearch(e.target.value)}}
            ></input>
          </div>
          <div className="catogory__input-box_select">
            <select
            value={category}
            onChange={(e)=>{setGategory(e.target.value); setWord(null); setSearch('')}}
            input={<BootstrapInput />}
            >
              <option value={"comp_basic"}>Tietotekniikan Perustermistöä</option>
              <option value={"networks_basic"}>Internet ja Tietoverkot</option>
            </select>
          </div>
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


