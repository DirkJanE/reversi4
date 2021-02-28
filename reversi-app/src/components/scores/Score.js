import React, { useState, useEffect } from 'react';
import { getScore } from '../requests/get';
import './Score.css';

const Score = () => {
    //set usestate variables and setters.
    const [gamesPlayed, setGamesPlayed] = useState();
    const [gamesWon, setGamesWon] = useState();
    const [stonesWon, setStonesWon] = useState();
    //const [result, setResult] = useState();
    //const [error, setError] = useState();

  //get scores from database and set them for display on page.
  useEffect (() => {
        getScore(setGamesPlayed, setGamesWon, setStonesWon)
    }, [gamesPlayed, gamesWon, stonesWon])

return (
    <div className="scores-container">
        <p>Games you have played: {gamesPlayed}</p>
        <p>Games you have won: {gamesWon} </p>
        <p>Total number of stones you have won: {stonesWon}</p>
    </div>
    );
}

export default Score;