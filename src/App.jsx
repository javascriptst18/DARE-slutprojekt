import React from 'react';
import { connect } from 'react-redux'; //  for redux
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Dares from './components/dares';
import Register from './components/Register';
import Logout from './components/Logout';
import Start from './components/Start';

class App extends React.Component {
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
                <Route path="/dares" component={Dares} />
              </div>
            </Router>
        }
      </div>
    );
  }
}

export default connect(state => state)(App);
