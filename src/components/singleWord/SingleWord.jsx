import React from "react";
import "./singleWord.css";


const SingleWord = ({ word }) => {
  return (
    <div className="singleword">
      
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
