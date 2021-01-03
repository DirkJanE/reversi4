import React from 'react';
import ReactDOM from 'react-dom';
import Title from '../components/titles/Title';
import Signup from '../components/signup/Signup';
import '../pages/Style.css';

class SignupPage extends React.Component {
  render() {
      return (
        <div className="page-container-no-background">
          <Title />
          <Signup />        
        </div>
      );
  } 
}

ReactDOM.render(<SignupPage />, document.getElementById('root'))

export default SignupPage;
