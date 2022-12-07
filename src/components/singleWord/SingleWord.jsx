import React from "react";
import "./singleWord.css";
import flag_united_kingdom from '../../assets/flag_of_united_kingdom.jpg'
import flag_finland from '../../assets/flag_of_finland.png'

const SingleWord = ({ word }) => {
  return (
    <div className="singleword">
      
  
      
      <div className="singleword__finnish">
        <img src={flag_finland} alt="flag of Finland"></img>{ ' ' + word.finnish }
      </div>
      <div className="singleword__english">
        <img src={flag_united_kingdom} alt="flag of United Kingdom"></img>{ ' ' + word.english }</div>
      
      <div className="singleword__definition">{ word.definition }</div>
      <div className="singleword__sources">
        <p>Lähteet:</p>
        <p><a href={ word.finnishLink }>{ word.finnishLink }</a></p>
        <p><a href={ word.englishLink }>{ word.englishLink }</a></p>
      </div>
    </div>
  );
};

export default SingleWord;
