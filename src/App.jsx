import React from 'react';
import { connect } from 'react-redux'; //  for redux
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Dares from './components/dares/dares';
import Register from './components/Register';
import Logout from './components/Logout';
import Start from './components/Start';
import UserSettings from './components/UserSettings';
import TestDare from './components/dares/postedDare';
import UpcomingDare from './components/dares/upcomingDare';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        {
          !this.props.user.email
            ? <Start />
            : this.props.user.email && !this.props.user.isRegistered
            ? <Register />
            : <Router>
              <div className="App">
                <Logout />
                <Link to="/login">Dare</Link>
                <Link to="/dares">Mina Dares</Link>
                <Link to="/settings">Inställningar</Link>
                <Route path="/dares" component={Dares} />
                <Route path="/settings" component={UserSettings} />
              </div>
            </Router>
        }
      </div>
    );
  }
}

export default connect(state => state)(App);
