import React, { useState, useEffect } from 'react';
import { getScore } from '../requests/get';
import { BoxColumn } from '../style/style';
import { Scorebox } from './Scorebox';

const Score = () => {
    //set usestate variables and setters.
    const [gamesPlayed, setGamesPlayed] = useState();
    const [gamesWon, setGamesWon] = useState();
    const [stonesWon, setStonesWon] = useState();
    const [scores, setScores] = useState();

  //get scores from database and store them in object.
  useEffect (() => {
    
    getScore(setGamesPlayed, setGamesWon, setStonesWon)
        setScores({'gamesPlayed': gamesPlayed, 'gamesWon': gamesWon, 'stonesWon': stonesWon})
    
    }, [gamesPlayed, gamesWon, stonesWon])

return (
    <BoxColumn style={{flexFlow: 'column' , alignItems: 'center', height: 300, width: 500, marginTop: 200, color: 'black', backgroundColor: 'red', borderRadius: 10}}>
        <Scorebox {...scores}>
        </Scorebox>
    </BoxColumn>
    );
}

export default Score;