import React from 'react';
import Title from '../components/titles/Title';
import { Signup } from '../components/signup/Signup';
import { Page } from './style/style.js';

export const SignupPage = () => {
  return (
        <Page>
          <Title />
          <Signup />        
        </Page>
      );
  }

