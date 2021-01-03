import React from 'react';
import ReactDOM from 'react-dom';
import './Title.css';

class Title extends React.Component {
  render() {
      return (
        <div>
          <h1 className="title">
            Reversi
          </h1>
        </div>
      );
    } 
}

ReactDOM.render(<Title />, document.getElementById('root'))

export default Title;