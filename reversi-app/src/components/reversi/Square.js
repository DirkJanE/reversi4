import React from "react";
import { OneSquare, Stone } from './style/style.js';
import dark from "./images/token-dark.gif";
import light from "./images/token-light.gif";
import green from "./images/token-green.gif";

//defines each single square.
const Square = ({value, onClick}) => {
  //console.log(value)
  return (
    <OneSquare onClick= {onClick}>  
      {value === 'dark' ? <Stone src={ dark } alt='' /> : null}
      {value === 'light' ? <Stone src= { light } alt='' /> : null}
      {value === 'green' ? <Stone src= { green } alt='' /> : null}
    </OneSquare>
  );
}

export default Square;