import React, { Component } from 'react';
import { connect } from 'react-redux'; //for redux
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Dares from './components/dares';
import LogIn from './components/Login';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <LogIn />
          <Link to="/login">Dare</Link> 
          <Link to="/dares">My Dares</Link>
          <Route path="/dares" component={Dares} />
        </div> 
      </Router>
    );
  }
}

export default connect(state => state)(App);

/**<Switch>
          <Route path="/login" />
        </Switch> */

