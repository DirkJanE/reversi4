import React from 'react';
import Title from '../components/titles/Title';
import Login from '../components/login/Login';
import { Page } from './style/style.js';

export const LoginPage = () => {
      return (
        <Page>
          <Title />
          <Login />        
        </Page>
      );
    } 
