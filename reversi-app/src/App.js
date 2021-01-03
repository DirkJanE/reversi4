import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import {
  LoginPage,
  SignupPage,
  ReversiPage,
  ChatPage,
  OptionsPage,
  ScoresPage,
} from './pages';
import './App.css';

function App() {

  return (
   
  <Router>
    <Route exact path="/">
      <LoginPage />
    </Route>
    <Route path="/signup">
      <SignupPage />
    </Route>
    <Route path="/reversi">
      <ReversiPage />
    </Route>
    <Route path="/chat">
      <ChatPage />
    </Route>
    <Route path="/options">
      <OptionsPage />
    </Route>
    <Route path="/scores">
      <ScoresPage />
    </Route>
  </Router>
  );
}

export default App;