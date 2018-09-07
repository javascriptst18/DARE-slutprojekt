import React from 'react';
import { connect } from 'react-redux'; //  for redux
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Dares from './components/dares';
import UserSettings from './components/UserSettings';
import Register from './components/Register';
import Logout from './components/Logout';
import Start from './components/Start';

class App extends Component {
  render() {
    return (
      <div className="App">
        {
          !this.props.user ?
            <Start />
            :
          this.props.user && !this.props.isRegistered ?
            <Register />
            :
            <Router>
              <div className="App">
                <Logout />
                <Link to="/login">Dare</Link>
                <Link to="/dares">My Dares</Link>
                <Link to="/settings">Settings</Link>
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
