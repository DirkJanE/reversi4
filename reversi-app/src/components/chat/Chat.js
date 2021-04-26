import React, { useState, useEffect } from 'react';
import io from "socket.io-client";
import ScrollToBottom from 'react-scroll-to-bottom';
import { Box, BoxColumn, BoxRow, Button, Input } from '../style/style.js';
import { MessageRight, MessageLeft } from './style/chatstyle.js';
import { IP } from '../url/url';
import './style/Chat.css';

//initialize endpoint to socket.io server
const ENDPOINT = `http://${IP}:4000`;
let socket = io(ENDPOINT);

export const Chat = () => {
    //initialize usestate variables and setters
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [name, setName] = useState();
    const [peopleInChat, setPeopleInChat] = useState([]);

    useEffect(() => {
      let convertname = localStorage.getItem('name')
      setName(convertname.slice(1, convertname.length - 1));
    }, []);

    //receive name from server
    useEffect(() => {    
      socket.on('join', (name) => {
        //console.log(name)
        name = Object.values(name);
        setPeopleInChat(currentPeople => [...currentPeople, name])
      })
    }, []);

    //receive message from server
    useEffect(() => {    
        socket.on("message", (message) => {
        receivedMessage(message);
        })
    }, []);

    //add received message to message array
    function receivedMessage(message) {
      setMessages(oldMsgs => [...oldMsgs, message]);
    }
  
    //send name and message to server
    function sendMessage(e) {
      e.preventDefault();
      const messageObject = {
        name: name,
        body: message,
      };
      setMessage("");
      socket.emit("message", messageObject);

      //setName(JSON.parse();
      socket.emit('join', name)
    }
 
    //get message from input field
    function handleChange(e) {
      setMessage(e.target.value);
    }

return (
    <BoxColumn style={{height: 320, width: 1000, marginTop: 200}}>
      <BoxRow style={{height: 220, width: 1000, backgroundColor: 'red', borderTopLeftRadius: 10, borderTopRightRadius: 10}}>
        <ScrollToBottom className='message-box'>
        {messages.map((message, index) => {
                message = Object.values(message);
                let messagename = message[0].name;
                let messagebody = message[0].body;
                if (messagename === name) {
                return (
                    <div key={index}>
                        <MessageLeft>
                        {messagename + " says: " + messagebody}
                        </MessageLeft>
                    </div>
                    )}
                    else {
                    return (
                        <div key={index}>
                          <MessageRight>
                            {messagename + " says: " + messagebody}
                          </MessageRight>
                        </div>
                      )
                    }
                })}
        </ScrollToBottom>
          <Box style={{alignItems: 'flex-start', height: 200, width: 180, backgroundColor: 'lightgrey', marginTop: 20, borderRadius: 10}}>
          People in chat:
          <br/>
          {peopleInChat[0]}
          <br/>
          {peopleInChat[1]}
          </Box>
        </BoxRow>
        <BoxRow style={{height: 100, width: 1000, backgroundColor: 'red', borderBottomLeftRadius: 10, borderBottomRightRadius: 10}}>
              <Input style={{height: 55, width: 755, marginLeft: 20}}
                     name="input"
                     placeholder="Say something..."
                     value={message}
                     onChange={handleChange}
              />
              <Button style={{height: 62, width: 180, marginLeft: 20, marginBottom: 3}}
                      name="button"
                      onClick={sendMessage}
                      >
                  Send
              </Button>
        </BoxRow>
      </BoxColumn>
    );
}