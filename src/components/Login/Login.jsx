// CSS/Assets
import './Login.scss';

// JS
import React from 'react';
import Webcam from 'webcamjs';
import * as play from 'audio-play';
import { Link, hashHistory } from 'react-router'

import AWSUtil from '../../utils/awsUtil.js'
import Hourglass from '../Hourglass/Hourglass.jsx'
import Button from '../Button/Button.jsx'

function pollySpeak(string) {
  let audioElement = document.getElementById('audio');

  Promise.resolve(AWSUtil.getPollyMP3Url(string)).
    then((url) => {
      audioElement.src = url;
      setTimeout(() => {
       audioElement.play();
      }, 500);
    }).catch((error) => {
      console.log("Something went wrong with playing the Polly file.");
    });
}

// Component
class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      validating: false
    };
    this.validate = this.validate.bind(this);
  }
  componentDidMount() {
    Webcam.set({
      width: 800,
      height: 450
    });
    Webcam.attach('#webcam');
    pollySpeak("Please present your face!");
  }
  render() {
    let component = null;
    if(this.state.validating) {
      component = <Hourglass />;
    } else {
      component = <Button clickHandler={this.validate} text="Validate" />;
    }

    return (
      <div>
        <audio id="audio"></audio>
        <div id="webcam"></div>
        { component }
      </div>
    )
  }
  validate() {
    Webcam.snap((data_uri) => {
      this.setState({ validating: true });
      let buf = new Buffer(data_uri.replace(/^data:image\/\w+;base64,/, ""),'base64');
      Promise.resolve(
        AWSUtil.compareFaces(buf)
      ).then((data) => {
        this.setState({ validating: false });
        if(data){
          pollySpeak('Validation passed. Welcome Mr President.');
          Webcam.reset();
          hashHistory.push('/code');
        } else {
          console.log(this.state);
          pollySpeak('Validation failed.');
        }
      }).catch((err) => {
        this.setState({ validating: false });
        pollySpeak('Validation failed. I was unable to compare your face.');
      });
    })
  }
}

export default Login;
