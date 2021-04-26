import React from 'react';
import { Box, Text } from '../style/style';

export const Scorebox = (scores) => {

    //console.log(scores.gamesPlayed)

    return (
    <Box style={{flexFlow: 'column', alignItems: 'center', marginTop: 50}}>
        <Text style={{fontSize: 30}}> Your scores: </Text>
        <Text style={{marginTop: 20}}> Games you have played: {scores.gamesPlayed}</Text>
        <Text style={{marginTop: 20}}> Games you have won: {scores.gamesWon} </Text>
        <Text style={{marginTop: 20}}> Total number of stones you have won: {scores.stonesWon}</Text>
    </Box>
    );
}
