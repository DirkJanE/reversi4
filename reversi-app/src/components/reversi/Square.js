import React from "react";
import "./Square";
import dark from "./images/token-dark.gif";
import light from "./images/token-light.gif";
import green from "./images/token-green.gif";
import './Reversi.css';

//defines each single square.
function Square({value, onClick}) {

  return (
    <button className="square"
            onClick={onClick}
    >  
      {value === 'dark' ? <img className="stone" src={ dark } alt='' /> : null}
      {value === 'light' ? <img className="stone" src= { light } alt='' /> : null}
      {value === 'green' ? <img className="stone" src= { green } alt='' /> : null}
    </button>
  );
}

export default Square;