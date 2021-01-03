import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import { Chat } from '../components/chat/Chat';
import Navigation from '../components/navigation/Navigation';
import { getImage } from '../components/requests/get';
import NotLoggedIn from '../components/notloggedin/NotLoggedIn';
import './Style.css';

function ChatPage () {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [result, setResult] = useState();
  const [error, setError] = useState();

  useEffect (() => {
    getImage(setResult, setError);
    if (result === 200) {
      setIsLoggedIn(true);
    }
    if (error === 500) {
      setIsLoggedIn(true);
    }
},[result, error])

    if (isLoggedIn === true) {
      return (
          <div className = "page-container-no-background">
            <Navigation />
            <Chat />
          </div>
      );
    } else {
      return (
        <div className='page-container-not-logged-in'>
        <NotLoggedIn />
      </div>
    );}
  }

ReactDOM.render(<ChatPage />, document.getElementById('root'))

export default ChatPage;