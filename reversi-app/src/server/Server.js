const express = require('express');
const http = require('http');
const app = express();
const httpServer = http.createServer(app);
const io = require("socket.io")(httpServer, {
    cors: {
      origin: ["http://192.168.1.218:3000", "origin-list"],
      methods: ["GET", "POST"],
      allowedHeaders: ["Access-Control-Allow-Origin"],
      credentials: true
    }
  });
const PORT = process.env.port || 4000;
const routers = require('./router');
app.use(routers);
httpServer.listen(PORT, () => console.log(`Server started on port ${PORT}`));

let idtocheck;
let playerNames = [];

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
    
    //for Reversi. Receive playerdata and emit name if it's unique
    socket.on('playerData', (playerData) => {
        let id = playerData.id;
        let name = playerData.name;
        //console.log(id, name)

        if (playerNames.length === 0) {
            idtocheck = id;
            playerNames[0] = name;
        } else {
            if (idtocheck !== id) {
                playerNames[1] = name;
                io.emit( 'playerNames1' , [playerNames[0]] )
                io.emit( 'playerNames2' , [playerNames[1]] )
                playerNames = [];
            }
        }
    })
});    
