import React from 'react';
import { connect } from 'react-redux'; //  for redux
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Dares from './components/dares';
import LogIn from './components/Login';
import UserSettings from './components/UserSettings';

function App() {
  return (
    <Router>
      <div className="App">
        <LogIn />
        <Link to="/login">Dare</Link>
        <Link to="/dares">My Dares</Link>
        <Link to="/settings">Settings</Link>
        <Route path="/dares" component={Dares} />
        <Route path="/settings" component={UserSettings} />
      </div>
    </Router>
  );
}

export default connect(state => state)(App);

/** import switch too from react-router
 * <Switch>
          <Route path="/login" />
        </Switch> */
