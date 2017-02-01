// CSS/Assets
import './Code.scss';
import bomb from './nuclear-bomb.png';

// JS
import React from 'react';
import ReactInterval from 'react-interval';
import Webcam from 'webcamjs';

// Component
class Code extends React.Component {
  constructor(props) {
    super(props);
    Webcam.reset();
    this.state = {
      code: this.generateSecretCode()
    };
  }
  generateSecretCode() {
    var num = Math.floor(Math.random()*90000) + 100000;
    return num.toString().match(/.{1,3}/g).join(' ');
  }
  render() {
    return (
      <div>
        <div className="centered">
          <img src={bomb} className="bomb" alt="bomb" />
          <div className="code">
            { this.state.code }
            <ReactInterval timeout={5000} enabled={true}
              callback={ () => this.setState({ code: this.generateSecretCode() }) } />
          </div>
        </div>
      </div>
    )
  }
}

export default Code;
