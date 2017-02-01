// CSS/Assets
import './Login.scss';

// JS
import React from 'react';
import Webcam from 'webcamjs';
import * as play from 'audio-play';
import { Link, hashHistory } from 'react-router'

import AWSUtil from '../../utils/awsUtil.js'

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
  componentDidMount() {
    Webcam.set({
      width: 800,
      height: 450
    });
    Webcam.attach('#webcam');
    pollySpeak("Please present your face!");
  }
  render() {
    return (
      <div>
        <audio id="audio"></audio>
        <div id="webcam"></div>
        <button className='btn' onClick={this.validate}>
          Validate
        </button>
      </div>
    )
  }
  validate() {
    Webcam.snap((data_uri) => {
      let buf = new Buffer(data_uri.replace(/^data:image\/\w+;base64,/, ""),'base64');
      Promise.resolve(
        AWSUtil.compareFaces(buf)
      ).then((data) => {
        if(data){
          pollySpeak('Validation passed. Welcome Mr President.');
          Webcam.reset();
          hashHistory.push('/code');
        } else {
          pollySpeak('Validation failed.');
        }
      }).catch((err) => {
        pollySpeak('Validation failed. I was unable to compare your face.');
      });
    });
  }
}

export default Login;
