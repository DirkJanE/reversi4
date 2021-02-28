import React, { useState, useEffect } from 'react';
import io from "socket.io-client";
import ScrollToBottom from 'react-scroll-to-bottom';
import './Chat.css';

//initialize endpoint to socket.io server
const ENDPOINT = 'http://192.168.1.218:4000';
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
    <div className="chat-container">
      <div className="messageandname-box">
        <ScrollToBottom className="message-box">
        {messages.map((message, index) => {
                message = Object.values(message);
                let messagename = message[0].name;
                let messagebody = message[0].body;
                if (messagename === name) {
                return (
                    <div key={index}>
                        <p className="message-left">
                        {messagename + " says: " + messagebody}
                        </p>
                    </div>
                    )}
                    else {
                    return (
                        <div key={index}>
                          <p className="message-right">
                            {messagename + " says: " + messagebody}
                          </p>
                        </div>
                      )
                    }
                })}
        </ScrollToBottom>
          <div className="name-box">
          People in chat:
          <br/>
          {peopleInChat[0]}
          <br/>
          {peopleInChat[1]}
          </div>
        </div>
        <div>
          <div className="inputandbutton-container">
              <input className="message-input"
                      name="input"
                      placeholder="Say something..."
                      value={message}
                      onChange={handleChange}
              />
              <button className="send-button"
                      name="button"
                      onClick={sendMessage}
                      
                      >
                  Send
              </button>
          </div>
        </div>
      </div>
    );
}