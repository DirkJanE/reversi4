import React, { useState } from 'react';
import Navigation from '../components/navigation/Navigation';
import Reversi from '../components/reversi/Reversi'
import NotLoggedIn from '../components/notloggedin/NotLoggedIn';
import { getScoreForAuth } from '../components/requests/get';
import { Page } from './style/style';

export const ReversiPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //const [error, setError] = useState();

  getScoreForAuth(setIsLoggedIn);
       
  if (isLoggedIn === true) {
    return (
        <Page>
          <Navigation />
          <Reversi />
        </Page>
    );
  } else {
    return (
        <Page>
          <NotLoggedIn />
        </Page>
  );}
}
