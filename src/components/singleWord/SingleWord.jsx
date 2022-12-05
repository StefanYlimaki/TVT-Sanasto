import React from "react";
import { useParams as getParams, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

import networks_basic from "../../assets/networks-basic.json";
import comp_basic from "../../assets/comp-basic.json";
import "./singleWord.css";

const words = networks_basic.concat(comp_basic);

const SingleWord = () => {
  const navigate = useNavigate();

  const { id } = getParams();
  const word = words.find((word) => word.id === id);
  
  return (
    <div className="singleword">
      <div className="singleword__backwards-button">
        <Button variant='contained' onClick={() => navigate(-1)}>Takaisin</Button>
      </div>
      <div className="singleword__word">
        <div className="singleword__finnish">{word.finnish}</div>
        <div className="singleword__english">{word.english}</div>
      </div>
      <div className="singleword__definition">{word.definition}</div>
      <div className="singleword__sources">
        <p>Lähteet</p>
        <p><a href={word.finnishLink}>{word.finnishLink}</a></p>
        <p><a href={word.englishLink}>{word.englishLink}</a></p>
      </div>
      
    </div>
  );
};

export default SingleWord;
