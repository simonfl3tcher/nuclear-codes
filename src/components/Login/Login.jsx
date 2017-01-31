// CSS/Assets
import './Login.scss';

// JS
import React from 'react';
import Webcam from 'webcamjs';
import * as play from 'audio-play';
import { Link, hashHistory } from 'react-router'

import AWSUtil from '../../utils/aws.jsx'

function pollySpeak(string) {
  let audioElement = document.getElementById('audio');
  Promise.resolve(AWSUtil.getPollyMP3Url(string)).then(function(url) {
    audioElement.src = url;
    setTimeout(function() {
     audioElement.play();
    }, 500);
  }).catch(function(error) {
    console.log("Polly Error!");
    console.log(error);
  });
}

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
        <button onClick={this.validate}>
          Validate
        </button>
      </div>
    )
  }
  validate() {
    Webcam.snap((data_uri) => {
      let buf = new Buffer(data_uri.replace(/^data:image\/\w+;base64,/, ""),'base64');
      Promise.resolve(AWSUtil.compareFaces(buf)).then((data) => {
        if(data){
          pollySpeak('Validation passed. Welcome Mr President.');
          hashHistory.push('/code');
        } else {
          pollySpeak('Validation failed.');
        }
      }).catch((err) => {
        pollySpeak('Validation failed.');
      });
    });
  }
}

export default Login;
