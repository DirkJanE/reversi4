import React from 'react';
import { Logo, Nav, NavBar, Ordered, Space, Unordered, Link } from './style/style.js';

//navigation bar that is used when user is logged in
const Navigation = () => {
    return (
        <Nav>
            <NavBar>
                <Logo>Reversi</Logo> 
                <Space></Space>
                    <Unordered>
                        <Ordered> <Link href="/reversi">Reversi</Link></Ordered>
                        <Ordered> <Link href="/chat">Chat</Link></Ordered>
                        <Ordered> <Link href="/options">Options</Link></Ordered>
                        <Ordered> <Link href="/scores">Scores</Link></Ordered>
                    </Unordered>
            </NavBar>
        </Nav>
    );
}

export default Navigation;