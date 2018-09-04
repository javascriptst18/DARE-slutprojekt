import React from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router, Route, Link, Switch,
} from 'react-router-dom';
import UserSettings from './components/UserSettings';
import Home from './components/UserSettings';

const App = () => (
  <Router>
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/UserSettings">Mina inställningar</Link>
        </li>
      </ul>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/UserSettings" component={UserSettings} />
      </Switch>
    </div>
  </Router>
);

export default App;
