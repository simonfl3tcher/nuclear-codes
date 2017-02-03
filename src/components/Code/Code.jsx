// CSS/Assets
import './Code.scss';
import bomb from './nuclear-bomb.png';

// JS
import React from 'react';
import ReactInterval from 'react-interval';
import Webcam from 'webcamjs';
import { Link, hashHistory } from 'react-router'

function generateRandomNumber() {
  var num = Math.floor(Math.random()*90000) + 10000000;
  return num.toString()
}

// Component
class Code extends React.Component {
  constructor(props) {
    super(props);
    Webcam.reset();
    this.state = {
      codes: this.generateSecretCode()
    };
  }
  generateSecretCode() {
    return Array.apply(
      null,
      Array(4)).map(() => { return generateRandomNumber() }
    );
  }
  render() {
    return (
      <div>
        <div className='centered'>
          <img src={bomb} className='bomb' alt='bomb' />
          <div className='code'>
            <div className='codesWrapper'>
              { this.state.codes.map((code, i) => <div key={i}>{code}</div>) }

              <ReactInterval timeout={5000} enabled={true}
                callback={ () => {
                  this.setState({ code: this.generateSecretCode() }) 
                } } />
            </div>
          </div>
          <small>
            <Link to={'/'}>Logout</Link>
          </small>
        </div>
      </div>
    )
  }
  logout() {
    hashHistory.push('/login');
  }
}

export default Code;
