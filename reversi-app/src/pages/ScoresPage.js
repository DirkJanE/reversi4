import React, { useState }  from 'react';
import Navigation from '../components/navigation/Navigation';
import Score from '../components/scores/Score';
import { getScoreForAuth } from '../components/requests/get';
import NotLoggedIn from '../components/notloggedin/NotLoggedIn';
import { Page } from './style/style';

export const ScoresPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //const [error, setError] = useState();

  getScoreForAuth(setIsLoggedIn);

  if (isLoggedIn === true) {
    return (
        <Page>
          <Navigation />
          <Score />
        </Page>
    );
  } else {
    return (
        <Page>
          <NotLoggedIn />
        </Page>
  );}
}