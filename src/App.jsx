import React, { Component } from 'react';
import { connect } from 'react-redux'; // for redux
import {
  BrowserRouter as Router, Route, Link, Switch,
} from 'react-router-dom';
import LogIn from './components/Login';

class App extends Component {
  render() {
    return (
      <div>
        <LogIn />
      </div>
    );
  }
}

export default connect(state => state)(App);

{ /* <Switch>
  <Route path="/login" component={login}/>
</Switch> */ }
