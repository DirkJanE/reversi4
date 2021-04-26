const IP = '192.168.1.218';
const express = require('express');
const http = require('http');
const app = express();
const httpServer = http.createServer(app);
const io = require("socket.io")(httpServer, {
    cors: {
      origin: [`http://${IP}:3000`, "origin-list"],
      methods: ["GET", "POST"],
      allowedHeaders: ["Access-Control-Allow-Origin"],
      credentials: true
    }
  });
const PORT = process.env.port || 4000;
const routers = require('./router');
app.use(routers);
httpServer.listen(PORT, () => console.log(`Server started on port ${PORT}`));

let playerNames = [];
let playerId1;
let playerSocketId1;
let playerName1;
let playerId2;
let playerSocketId2;
let playerName2;

io.on('connection', (socket) => {
    
    socket.on('join', (name) => {   
        io.emit('join', {name})
        //console.log(name)
    })

    //for chat. Receive and emit messages.
    socket.on('message', (message) => {
        io.emit( 'message' , {message} )
        //console.log(message);
    })

    //for Reversi. Receive and emit squares.
    socket.on('changedSquares', (changedSquares) => {
        io.emit( 'changedSquares' , {changedSquares} )
        //console.log(changedSquares);
    })
    
    //for Reversi. Receive playerdata and emit name and token if it's unique
    socket.on('playerData', (playerData) => {
        if (playerNames.length === 2) {
            playerNames = [];
            //console.log('empty')
        }
        
        if (playerNames.length === 1 && playerSocketId1 !== playerData.socketid) {
            playerSocketId2 = playerData.socketid;
            playerId2 = playerData.id;
            playerName2 = playerData.name;
            playerNames.push(playerData.name);
            io.emit('playerNames1', playerName1);
            io.emit('playerNames2', playerName2);
            io.emit('playerId1', playerId1);
            io.emit('playerId2', playerId2);   
            //console.log('playerName2 added')
        }

        if (playerNames.length === 0 && playerSocketId2 !== playerData.socketid) {
            playerSocketId1 = playerData.socketid;
            playerId1 = playerData.id;
            playerName1 = playerData.name;
            playerNames.push(playerData.name);
            io.emit('playerNames1', playerName1);
            io.emit('playerId1', playerId1);          
            //console.log('playerName1 added')
            }

        })
});