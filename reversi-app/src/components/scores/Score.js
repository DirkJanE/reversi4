import React, { useState, useEffect } from 'react';
import './Score.css';

const Score = () => {
    //set usestate variables and setters.
    const [gamesPlayed, setGamesPlayed] = useState();
    const [gamesWon, setGamesWon] = useState();
    const [stonesWon, setStonesWon] = useState();

  //get scores from localstorage and set them for display on page.
  useEffect (() => {
    setGamesPlayed(localStorage.getItem('gamesPlayed'));
    setGamesWon(localStorage.getItem('gamesWon'));
    setStonesWon(localStorage.getItem('stonesWon'));        
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