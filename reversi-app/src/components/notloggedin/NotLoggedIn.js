import React from 'react';
import { Text } from '../style/style.js';

//page to show when user is not logged in
const NotLoggedIn = () => {
    return (
            <Text style={{marginTop: 400, color: 'white', fontSize: 30}}> You are not logged in! </Text>
    );
}

export default NotLoggedIn;