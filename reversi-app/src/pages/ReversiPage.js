import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import Navigation from '../components/navigation/Navigation';
import Reversi from '../components/reversi/Reversi'
import NotLoggedIn from '../components/notloggedin/NotLoggedIn';
import { getImage } from '../components/requests/get';
import './Style.css';
//import background from './70821.jpeg'; 

function ReversiPage () {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //const [backgroundUrl, setBackgroundUrl] = useState();
  const [result, setResult] = useState();
  const [error, setError] = useState();


  useEffect (() => {
      getImage(setResult, setError);
      //console.log(result)
      
      if (result === 200) {
        setIsLoggedIn(true);
      }
      if (error === 500) {
        setIsLoggedIn(true);
      }
  },[result, error])
       
 if (isLoggedIn === true) {
    return (
      <div className="page-container-no-background"           
      >
        <Navigation />
        <Reversi />
      </div>
    );
    } else {
  
      return (
        <div className='page-container-not-logged-in'>
          <NotLoggedIn />
        </div>
    );}
  }

ReactDOM.render(<ReversiPage />, document.getElementById('root'))

export default ReversiPage;
