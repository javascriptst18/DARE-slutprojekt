import React, { Component } from 'react';
import { connect } from 'react-redux'; //for redux
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Dares from './components/dares';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Link to="/login">Dare</Link> 
          <Dares />
        </div>
        
      </Router>
    );
  }
}

export default connect(state => state)(App);

/**<Switch>
          <Route path="/login" />
        </Switch> */