// JS
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory, Link }  from 'react-router'

// Components
import Code  from './components/Code/Code.jsx';
import Login from './components/Login/Login.jsx';

// App Component
class App extends React.Component {
  render() {
    return (
      <div>{this.props.children}</div>
    )
  }
}

// Routes for app
const Routes = (
  <Route path="/" component={App} >
    <IndexRoute component={Login} />
    <Route path="/code" component={Code} />
  </Route>
)

// Render
ReactDOM.render(
  <Router history={hashHistory} routes={Routes} />,
  document.getElementById('app')
);
