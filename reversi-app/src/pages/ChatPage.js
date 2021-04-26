import React, {useState} from 'react';
import { Chat } from '../components/chat/Chat';
import Navigation from '../components/navigation/Navigation';
import { getScoreForAuth } from '../components/requests/get';
import NotLoggedIn from '../components/notloggedin/NotLoggedIn';
import { Page } from './style/style.js';

export const ChatPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //const [error, setError] = useState();

  getScoreForAuth(setIsLoggedIn);

    if (isLoggedIn === true) {
      return (
          <Page>
            <Navigation />
            <Chat />
          </Page>
      );
    } else {
      return (
          <Page>
            <NotLoggedIn />
          </Page>
    );}
  }