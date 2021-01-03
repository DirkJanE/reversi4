import React from 'react';
import ReactDOM from 'react-dom';
import Title from '../components/titles/Title';
import Login from '../components/login/Login';
import './Style.css';

class LoginPage extends React.Component {
  render() {
      return (
        <div className="page-container-no-background">
          <Title />
          <Login />        
        </div>
      );
  } 
}

ReactDOM.render(<LoginPage />, document.getElementById('root'))

export default LoginPage;
