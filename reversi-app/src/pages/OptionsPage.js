import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Navigation from '../components/navigation/Navigation';
import Options from '../components/options/Options';
import { getImage } from '../components/requests/get';
import NotLoggedIn from '../components/notloggedin/NotLoggedIn';
import './Style.css';

function OptionsPage() {
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
    <div className='page-container-no-background'>
      <Navigation />
      <Options />
     </div>
  )
  } else {
    return (
      <div className='page-container-not-logged-in'>
        <NotLoggedIn />
      </div>
        );
    }
}

ReactDOM.render(<OptionsPage />, document.getElementById('root'))

export default OptionsPage;
