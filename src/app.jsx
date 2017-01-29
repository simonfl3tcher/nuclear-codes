// app.jsx
import React              from "react";
import ReactDOM           from "react-dom";
import { browserHistory } from 'react-router';

class App extends React.Component {
  render() {
    return (
      <div>Hello world!</div>
    )
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('app')
);
