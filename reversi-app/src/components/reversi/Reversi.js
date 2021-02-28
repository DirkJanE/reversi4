import React, { useState, useEffect, useReducer } from 'react';
import Square from "./Square";
import io from "socket.io-client";
import axios from 'axios';
import { IP } from '../url/url';
import './Reversi.css';
import { getImageForReversi } from '../requests/get';
import avatar from '../avatar/Avatar.JPG';

const ENDPOINT = 'http://192.168.1.218:4000';
let socket = io(ENDPOINT);

function Reversi () {

    let startBoard = [];
    //set squares of board

    for (let i = 0; i < 64; i++) {
    startBoard[i] = 'green';
    };

    //set the 4 squares in the middle
    startBoard[27] = 'dark';
    startBoard[28] = 'light';
    startBoard[35] = 'light';
    startBoard[36] = 'dark';

    const [board, setBoard] = useState(startBoard);
    const [lightCount, setLightCount] = useState(2);
    const [darkCount, setDarkCount] = useState(2);
    const [player1Active, setPlayer1Active] = useState({active: null});
    const [player2Active, setPlayer2Active] = useState({active: null});
    const [player1NameForTurn, setPlayer1NameForTurn]= useState();
    const [player2NameForTurn, setPlayer2NameForTurn] = useState();
    const [player1NameForScore, setPlayer1NameForScore]= useState();
    const [player2NameForScore, setPlayer2NameForScore] = useState();
    const [player1Present, setPlayer1Present]= useState(false);
    const [player2Present, setPlayer2Present] = useState(false);
    const [avatar1Result, setAvatar1Result] = useState(false);
    const [avatar2Result, setAvatar2Result] = useState(false);
    const [image1, setImage1] = useState();
    const [image2, setImage2] = useState();
    
    const [isWinner, setIsWinner] = useState(false);
    const [winnerName, setWinnerName] = useState();

    const [lightgamesplayed, setLightGamesPlayed] = useState();
    const [lightgameswon, setLightGamesWon] = useState();
    const [lightstoneswon, setLightStonesWon] = useState();
    const [lightresult, setLightResult] = useState();
    const [lighterror, setLightError] = useState();
    const [lightcounter, setLightCounter] = useState(0);

    const [darkgamesplayed, setDarkGamesPlayed] = useState();
    const [darkgameswon, setDarkGamesWon] = useState();
    const [darkstoneswon, setDarkStonesWon] = useState();
    const [darkresult, setDarkResult] = useState();
    const [darkerror, setDarkError] = useState();
    const [darkcounter, setDarkCounter] = useState(0);

    const player1Token = 'dark';
    const player2Token = 'light';

    let currentToken;
    let opponentToken;

    let diagonalBoundary = [];
    let verticalBoundary = [];
    let horizontalBoundary = [];

    let surroundingFields = [-9, -8, -7, -1, 1, 7, 8, 9];
    let maxsquarestoflip;

    let firstfield;
    let firstfieldcolor;   
    
    let nextfield;
    let nextfieldcolor;

    let direction;
    let directioncounter = 0;

    let moveProperties = [ {direction: '', squarestoflip: [], validmove: null},
                            {direction: '', squarestoflip: [], validmove: null},
                            {direction: '', squarestoflip: [], validmove: null},
                            {direction: '', squarestoflip: [], validmove: null},
                            {direction: '', squarestoflip: [], validmove: null}]

    useEffect(() => {
        function setActivePlayer() {
            let counter = 0;
            for (let i = 0; i < board.length; i++) {
                if (board[i] === "green") {
                    counter++;
                }
            }
            if (counter % 2 === 0) {
                setPlayer1Active(true);
                setPlayer2Active(false);
            } else {
                setPlayer1Active(false);
                setPlayer2Active(true);  
            }
                //console.log(player1Props.active, player2Props.active)
        }
        setActivePlayer();
        },)

  function setToken() {
      if (player1Active === true) {
          currentToken = player1Token;
          opponentToken = player2Token;
      } else {
          currentToken = player2Token;
          opponentToken = player1Token;
      }
      //console.log(currentToken, opponentToken)
  }

  function setverticalBoundary(key) {
        
    let verticalkeybegin = 0;
    let verticalkeyend = 7;
    let firstverticalnumber = 0;
    let secondverticalnumber = 7;

    for (let i = 0; i < 8; i++) {

        if (key >= verticalkeybegin && key <= verticalkeyend) {
            verticalBoundary[0] = firstverticalnumber;
            verticalBoundary[1] = secondverticalnumber
        }
        //console.log(verticalkeybegin, verticalkeyend, firstverticalnumber, secondverticalnumber)
        verticalkeybegin = verticalkeybegin + 8;
        verticalkeyend = verticalkeyend + 8;
        firstverticalnumber = firstverticalnumber + 1;
        secondverticalnumber = secondverticalnumber - 1;
        }
    }
    //console.log(verticalBoundary)

    function sethorizontalBoundary(key) {
        
        let horizontalkey = 0;
        let counter = 0;
        let firsthorizontalnumber = 0;
        let secondhorizontalnumber = 7;
       
        for (let i = 0; i < 8; i++) {
        horizontalkey = counter;    
            for (let j = 0; j < 8; j++) {
    
                if (key === horizontalkey) {
                    horizontalBoundary[0] = firsthorizontalnumber;
                    horizontalBoundary[1] = secondhorizontalnumber
                }
            //console.log(verticalkeybegin, verticalkeyend, firstverticalnumber, secondverticalnumber)
                horizontalkey = horizontalkey + 8;
            }
        firsthorizontalnumber++; 
        secondhorizontalnumber--;    
        counter++;    
        }
    }

    function setUpperDiagonal(key) {
        let diagonalcounter = 0;
        let diagonalmax = 8;
        let diagonaldiversion = 0;

        for (let i = 0; i < 3; i++) {
            diagonalcounter = diagonaldiversion;
            for (let j = 0; j < diagonalmax; j++) {
                if (key === diagonalcounter) {
                    diagonalBoundary[0] = verticalBoundary[0];
                    diagonalBoundary[1] = verticalBoundary[0];
                    diagonalBoundary[2] = horizontalBoundary[0];
                    diagonalBoundary[3] = horizontalBoundary[1];
                }
                diagonalcounter++; 
            }
        diagonaldiversion += 9;
        diagonalmax -= 2; 
        }
        //console.log(diagonalBoundary)       
    }
    
    function setLowerDiagonal(key) {
        let diagonalcounter = 63;
        let diagonalmax = 8;
        let diagonaldiversion = 63;

        for (let i = 0; i < 3; i++) {
            diagonalcounter = diagonaldiversion;
            for (let j = 0; j < diagonalmax; j++) {
                if (key === diagonalcounter) {
                    diagonalBoundary[0] = horizontalBoundary[0];
                    diagonalBoundary[1] = horizontalBoundary[1];
                    diagonalBoundary[2] = verticalBoundary[1];
                    diagonalBoundary[3] = verticalBoundary[1];
                }
                diagonalcounter--; 
            }
        diagonalcounter = diagonalcounter - 2;
        diagonalmax -= 2;
        diagonaldiversion -= 9;
        }
        //console.log(diagonalBoundary)
    }

    function setLeftDiagonal(key) {
        let diagonalcounter = 8;
        let diagonalmax = 8;
        let diagonaldiversion = 8;

    for (let i = 0; i < 3; i++) {
        diagonalcounter = diagonaldiversion;
        for (let i = 0; i < diagonalmax; i++) {
            if (key === diagonalcounter) {
                diagonalBoundary[0] = horizontalBoundary[0];
                diagonalBoundary[1] = verticalBoundary[0]
                diagonalBoundary[2] = horizontalBoundary[0];
                diagonalBoundary[3] = verticalBoundary[1];
                }
                diagonalcounter += 8;  
            }   
            diagonaldiversion += 9;
            diagonalcounter = diagonalcounter - 2;
            diagonalmax -= 2;
        }
        //console.log(diagonalBoundary)
    }

    function setRightDiagonal(key) {
        let diagonalcounter = 15;
        let diagonalmax = 8;
        let diagonaldiversion = 15;

        for (let i = 0; i < 3; i++) {
            diagonalcounter = diagonaldiversion;
            for (let i = 0; i < diagonalmax; i++) {
                if (key === diagonalcounter) {
                    diagonalBoundary[0] = verticalBoundary[0];
                    diagonalBoundary[1] = horizontalBoundary[1];
                    diagonalBoundary[2] = verticalBoundary[1];
                    diagonalBoundary[3] = horizontalBoundary[1];
                    }
                    diagonalcounter += 8;  
                }   
                diagonaldiversion += 7;
                diagonalcounter = diagonalcounter - 2;
                diagonalmax -= 2;
            }
            //console.log(diagonalBoundary)
        }
    
    function firstField(key, changedsquares, surroundingFields) {
        
        for (let i = 0; i < surroundingFields.length; i++) {
            
            firstfield = key + surroundingFields[i]
            firstfieldcolor = changedsquares[firstfield]
            
            try {
     
                firstfield = key + surroundingFields[i]
                firstfieldcolor = changedsquares[firstfield]
                //console.log("key: " + key, " surroundingFields: " + surroundingFields[i], " firstfield to check: " + firstfield + " first field color: " + firstfieldcolor)
                                
                if (firstfieldcolor === opponentToken) {
                    //direction = {direction: surroundingFields[i]}
                    moveProperties[directioncounter].direction = surroundingFields[i];
                    //console.log(moveProperties)
                    directioncounter++;
                             
                } else {
                    continue;
                    }   
                } catch(err) {
                    if(err) {
                        continue;
                }      
            }
        }
        //console.log(moveProperties)
    }
    
    function maxSquaresToFlip(direction) {
            
        if (direction === -8) {
            maxsquarestoflip = verticalBoundary[0];
        } else if (direction === 8) {
            maxsquarestoflip = verticalBoundary[1];
        } else if (direction === -1) {
            maxsquarestoflip = horizontalBoundary[0];
        } else if (direction === 1) {
            maxsquarestoflip = horizontalBoundary[1];
        } else if (direction === -9) {
            maxsquarestoflip = diagonalBoundary[0];
            //console.log("diagonal boundary 0: " + diagonalBoundary[0]);
        } else if (direction === -7) {
            maxsquarestoflip = diagonalBoundary[1];
            //console.log("diagonal boundary 1: " + diagonalBoundary[1]);
        } else if (direction === 7) {
            maxsquarestoflip = diagonalBoundary[2];
            //console.log("diagonal boundary 2: " + diagonalBoundary[2]);
        } else if (direction === 9) {
            maxsquarestoflip = diagonalBoundary[3]; 
        } else {
            maxsquarestoflip = [];
        }
        //console.log(maxsquarestoflip)
    } 
    
    function nextField(key, changedSquares) {

        for (let i = 0; i < directioncounter; i++) {
            direction = moveProperties[i].direction;
            maxSquaresToFlip(direction);
            nextfield = key + direction;

            let fieldKeys = [];
            //console.log("number of squares to flip: " + maxsquarestoflip)
            for (let j = 0; j < maxsquarestoflip; j++) {

                nextfieldcolor = changedSquares[nextfield];
                //console.log("test: " + nextfieldcolor, currentToken)    
                if (nextfieldcolor === opponentToken) {

                    fieldKeys.push(nextfield)
                    moveProperties[i].squarestoflip = fieldKeys; 
                    //nextfieldcounter++;

                } else {
                    break;
                    
                    }
                nextfield = nextfield + direction;                  
                
                }
            }
        }
       
    function lastField(key, changedSquares) {

        for (let i = 0; i < directioncounter; i++) {
            direction = moveProperties[i].direction;
            let previousfields = moveProperties[i].squarestoflip.length;
            let lastfield = key + (direction * previousfields) + direction;
            let lastfieldcolor = changedSquares[lastfield];
            //console.log(moveProperties[i].squarestoflip.length)
            if (lastfieldcolor === currentToken) {
                moveProperties[i].validmove = true;
            }
        }
    }
        
    function flipSquares(key, changedSquares) {
        
        let flipsquare = 0;
        let counter = 0;
        if (changedSquares[key] === 'green') {
            for (let i = 0; i < moveProperties.length; i++) {
                //console.log(moveProperties[counter].validmove)
                if (moveProperties[counter].validmove === true) {
                    
                    changedSquares[key] = player1Active ? player1Token : player2Token;

                    for (let j = 0; j <= moveProperties[counter].squarestoflip.length; j++) {
                    
                        flipsquare = moveProperties[counter].squarestoflip[j];
                        changedSquares[flipsquare] = currentToken;
                        //console.log(changedSquares[flipsquare])
                    }
                }
                counter++;
            }
        }
    }

    useEffect(() => {
        function countStones() {
            let lightcount = 0;
            let darkcount = 0;
            for (let i = 0; i < board.length; i++) {
                if (board[i] === "light") {
                    lightcount++
                } else if (board[i] === "dark") {
                    darkcount++
                }
            }
            setLightCount(lightcount)
            setDarkCount(darkcount)
            //console.log(darkcount, lightcount)
        }
    countStones()
    },)

    const [{ changedSquares }, dispatch] = useReducer((state, action) => {
        if (action.type === 'changedSquares') {
          state.changedSquares.push(action.changedSquares)
          return state
        }
        return state 
      }, { changedSquares: [] })
    
      useEffect(() => {
        
        socket.on("changedSquares", (changedSquares) => {
          dispatch({ type: 'changedSquares', changedSquares })
          let receivedSquares = Object.values(changedSquares);
          setBoard(...receivedSquares, receivedSquares);
          //console.log(receivedSquares)
        });
      },)

      useEffect(() => {
        socket.on("playerNames1", (playerName1) => {
            let compareName = localStorage.getItem('name');
            if (compareName === playerName1) {
                localStorage.setItem('playerToken', 'dark')
            } 
            //storeName.current = playerName1;
            playerName1 = playerName1.slice(1, playerName1.length - 1);
            setPlayer1NameForTurn(playerName1 + ", it's your turn!");
            setPlayer1Present(true);
            setPlayer1NameForScore(playerName1);
            });
        },)

        useEffect(() => {
            socket.on("playerId1", (playerId1) => {
                //console.log(playerId1);
                getImageForReversi(playerId1, setImage1, setAvatar1Result)
                });
            },)

    //console.log(player1Name)

    useEffect(() => {
        socket.on("playerNames2", (playerName2) => {
            let compareName = localStorage.getItem('name');
            if (compareName === playerName2) {
                localStorage.setItem('playerToken', 'light')
            } 
            playerName2 = playerName2.slice(1, playerName2.length - 1);
            setPlayer2NameForTurn(playerName2 + ", it's your turn!");
            setPlayer2Present(true);
            setPlayer2NameForScore(playerName2);
            });
        },)

    useEffect(() => {
        socket.on("playerId2", (playerId2) => {
            //console.log(playerId2);
            getImageForReversi(playerId2, setImage2, setAvatar2Result)
            });
        },)

    //console.log(player2Name)

    function socketEmitPlayerData() {
        let id = localStorage.getItem('id');
        let socketid = socket.id;
        let name = localStorage.getItem('name')      
        let playerData = {socketid, id, name}
        socket.emit('playerData', playerData)
        }

    function socketEmitSquares(changedSquares) {
        socket.emit("changedSquares", changedSquares);
    }

    useEffect(() => {
        if (lightCount + darkCount === 64)
            if (darkCount > lightCount) {
                setIsWinner(true);
                setWinnerName(player1NameForScore);
            } else if (darkCount < lightCount) {
                setIsWinner(true);
                setWinnerName(player2NameForScore);
            } else {

            }
    },[lightCount, darkCount, isWinner, winnerName, player1NameForScore, player2NameForScore])

    useEffect(() => {
        function uploadDarkScores(lightCount, darkCount) {
                const token = JSON.parse(localStorage.getItem('token'));    
                const id = localStorage.getItem('id');
                const playerToken = localStorage.getItem('playerToken');

                //console.log(counter)
                if (playerToken === 'dark' && darkcounter === 0) {

                    if (lightCount + darkCount === 5) {

                        //request to get scores from database for Reversi page

                        const token = JSON.parse(localStorage.getItem('token'));
                    
                        axios.get(`http://${IP}:8080/api/score/getscore/${id}`,
                        { headers: { "Authorization": `Bearer ${token}` }})
                            .then(response => {
                                    setDarkResult(response.status);
                                    setDarkGamesPlayed(response.data.gamesPlayed);
                                    setDarkGamesWon(response.data.gamesWon);
                                    setDarkStonesWon(response.data.stoneswon);
                                    console.log(response);               
                            })
                            .catch(err => {
                                let error = err.response;
                                if (error) {
                                    setDarkError(error.status);
                                    //console.log(error.status);
                                }
                            });
                    }

                    if (darkresult === 200 && lightCount + darkCount === 64) {                
                 
                        let updatedarkgamesplayed = darkgamesplayed + 1;

                        let updatedarkstoneswon = darkstoneswon + darkCount;

                        let updatedarkgameswon = 0;

                        if (darkCount > lightCount) {
                            updatedarkgameswon = darkgameswon + 1;

                        } else {
                            updatedarkgameswon = darkgameswon + 0;
                        }

                        /*
                        console.log("darkgamesplayed: " + updatedarkgamesplayed)
                        console.log("darkgameswon: " + updatedarkgameswon)
                        console.log("stoneswon + " + updatedarkstoneswon + " darkCount = " + darkCount);
                        */

                        axios.put(`http://${IP}:8080/api/score/putscore/${id}`,
                        {
                            "stoneswon": updatedarkstoneswon,
                            "gamesPlayed": updatedarkgamesplayed,
                            "gamesWon": updatedarkgameswon
                        },
                        { headers: { "Authorization": `Bearer ${token}` }})
                            .then(response => {
                                let result = response.status;
                                //console.log(response)
                                if (result === 200) {
                                    //setResult(result);                  
                                    //console.log('test')
                                }
                            })
                            .catch(error => {
                                if (error.response) {
                                    //setError(error.response)
                                    console.log(error.response)
                                }
                            });
                        setDarkCounter(1); 
                    }
                }
            }

        uploadDarkScores(lightCount, darkCount);
        },[darkcounter, darkCount, lightCount, darkresult, darkerror, darkgamesplayed, darkgameswon, darkstoneswon, player1NameForTurn])

        useEffect(() => {
            function uploadLightScores(lightCount, darkCount) {
                    const token = JSON.parse(localStorage.getItem('token'));    
                    const id = localStorage.getItem('id');
                    const playerToken = localStorage.getItem('playerToken');
    
                    //console.log(counter)
                    if (playerToken === 'light' && lightcounter === 0) {
    
                        if (lightCount + darkCount === 5) {
    
                            //request to get scores from database for Reversi page
    
                            const token = JSON.parse(localStorage.getItem('token'));
                        
                            axios.get(`http://${IP}:8080/api/score/getscore/${id}`,
                            { headers: { "Authorization": `Bearer ${token}` }})
                                .then(response => {
                                        setLightResult(response.status);
                                        setLightGamesPlayed(response.data.gamesPlayed);
                                        setLightGamesWon(response.data.gamesWon);
                                        setLightStonesWon(response.data.stoneswon);
                                        console.log(response);               
                                })
                                .catch(err => {
                                    let error = err.response;
                                    if (error) {
                                        setLightError(error.status);
                                        //console.log(error.status);
                                    }
                                });
                        }
    
                        if (lightresult === 200 && lightCount + darkCount === 64) {                
   
                            let updatelightgamesplayed = lightgamesplayed + 1;
    
                            let updatelightstoneswon = lightstoneswon + lightCount;

                            let updatelightgameswon = 0;
    
                            if (lightCount > darkCount) {
                                updatelightgameswon = lightgameswon + 1;

                            } else {
                                updatelightgameswon = lightgameswon + 0;
                            }
                            
                            /*
                            console.log("lightgamesplayed: " + updatelightgamesplayed)
                            console.log("lightgameswon: " + updatelightgameswon)
                            console.log("stoneswon: " + updatelightstoneswon + " lightCount = " + lightCount);
                            */

                            axios.put(`http://${IP}:8080/api/score/putscore/${id}`,
                            {
                                "stoneswon": updatelightstoneswon,
                                "gamesPlayed": updatelightgamesplayed,
                                "gamesWon": updatelightgameswon
                            },
                            { headers: { "Authorization": `Bearer ${token}` }})
                                .then(response => {
                                    let result = response.status;
                                    //console.log(response)
                                    if (result === 200) {
                                        //setResult(result);                  
                                        //console.log('test')
                                    }
                                })
                                .catch(error => {
                                    if (error.response) {
                                        //setError(error.response)
                                        console.log(error.response)
                                    }
                                });
                            setLightCounter(1); 
                        }
                    }
                }
    
            uploadLightScores(lightCount, darkCount);
            },[lightcounter, darkCount, lightCount, lightresult, lighterror, lightgamesplayed, lightgameswon, lightstoneswon])

    function renderSquare(key) {
        return (
            <Square
            onClick={() => {

                let changedSquares = [...board];

                //console.log("Key: " + key)
                //console.log(changedSquares);          

                //setActivePlayer();

                setToken();

                //console.log(player1Props, player2Props, currentToken, opponentToken)

                setverticalBoundary(key);
                sethorizontalBoundary(key);
                setUpperDiagonal(key);
                setLowerDiagonal(key);
                setLeftDiagonal(key);
                setRightDiagonal(key);

                //console.log("Horizontal boundary: " + horizontalBoundary)
                //console.log("Vertical boundary: " + verticalBoundary)
                //console.log("Diagonal boundary: " + diagonalBoundary)
                               
                firstField(key, changedSquares, surroundingFields);
                //console.log("firstfield: " + firstfield)
                            
                nextField(key, changedSquares);
                //console.log("nextfield: " + nextfield)

                lastField(key, changedSquares);
                //console.log("lastfield: " + lastfield)

                flipSquares(key, changedSquares);       
                
                socketEmitSquares(changedSquares);               

            }}
            value={board[key]}          
            />
        );
    }

    return (
        <div className="reversi-container">
          <div className="player1-container">
            <div className="firstname-container">
                <h4 className="header"> Name player 1: </h4>
                <p className="text"> {player1Present ? player1NameForScore : "No player"} </p>
                <h4 className="header"> Score: </h4>
                <p className="text"> {darkCount} </p>
            </div>
            <div className="avatar1-container">
                {avatar1Result ? <img className="image" src={`data:image/jpeg;base64,${image1}`} alt='' /> : <img className="image" src={avatar} alt='' /> }
            </div>
          </div>
          <div className="board-container">
           <div className="board">
            <div className="name-turn-text">
              <p className="name-turn-text">
                {player1Active ? player1NameForTurn : player2NameForTurn}
              </p>
            </div>
            <div className="board-row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
                {renderSquare(9)}
                {renderSquare(10)}
                {renderSquare(11)}
                {renderSquare(12)}
                {renderSquare(13)}
                {renderSquare(14)}
                {renderSquare(15)}
                {renderSquare(16)}
                {renderSquare(17)}
                {renderSquare(18)}
                {renderSquare(19)}
                {renderSquare(20)}
                {renderSquare(21)}
                {renderSquare(22)}
                {renderSquare(23)}
                {renderSquare(24)}
                {renderSquare(25)}
                {renderSquare(26)}
                {renderSquare(27)}
                {renderSquare(28)}
                {renderSquare(29)}
                {renderSquare(30)}
                {renderSquare(31)}
                {renderSquare(32)}
                {renderSquare(33)}
                {renderSquare(34)}
                {renderSquare(35)}
                {renderSquare(36)}
                {renderSquare(37)}
                {renderSquare(38)}
                {renderSquare(39)}
                {renderSquare(40)}
                {renderSquare(41)}
                {renderSquare(42)}
                {renderSquare(43)}
                {renderSquare(44)}
                {renderSquare(45)}
                {renderSquare(46)}
                {renderSquare(47)}
                {renderSquare(48)}
                {renderSquare(49)}
                {renderSquare(50)}
                {renderSquare(51)}
                {renderSquare(52)}
                {renderSquare(53)}
                {renderSquare(54)}
                {renderSquare(55)}
                {renderSquare(56)}
                {renderSquare(57)}
                {renderSquare(58)}
                {renderSquare(59)}
                {renderSquare(60)}
                {renderSquare(61)}
                {renderSquare(62)}
                {renderSquare(63)}
                              
            </div>
          </div>
           <button className="reversi-button"
                    onClick={socketEmitPlayerData}
           >
            Click here to start the game!
            </button>
            <p className="call-winner">
                {isWinner ? winnerName + " wins! Press F5 for another game." : ""}
            </p>
        </div>
          <div className="player2-container">
            <div className="secondname-container">
                <h4 className="header"> Name player 2: </h4>
                <p className="text"> {player2Present ? player2NameForScore : "No player"} </p>
                <h4 className="header"> Score: </h4>
                <p className="text"> {lightCount} </p>
            </div>
            <div className="avatar2-container">
                {avatar2Result ? <img className="image" src={`data:image/jpeg;base64,${image2}`} alt='' /> : <img className="image" src={avatar} alt='' /> }
            </div>
          </div>
      </div>
        );
    }

export default Reversi;