import React, { Component } from 'react';
import { connect } from 'react-redux'; //for redux
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Link to="/login">Dare</Link> 
        </div>
        <Switch>
          <Route path="/login" component={login}/>
        </Switch>
      </Router>
    );
  }
}

export default connect(state => state)(App);
