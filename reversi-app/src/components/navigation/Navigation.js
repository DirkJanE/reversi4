import React from 'react';
import './Navigation.css';

//navigation bar that is used when user is logged in
const Navigation = () => {
    return (
        <header className='navigation'>
            <nav className='navbar'>
                <div className='logo'><a href="/">Reversi</a></div> 
                <div className='space'></div>
                <div className='links'>
                    <ul>
                        <li> <a href="/reversi">Reversi</a></li>
                        <li> <a href="/chat">Chat</a></li>
                        <li> <a href="/options">Options</a></li>
                        <li> <a href="/scores">Scores</a></li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}

export default Navigation;