import React, { Component } from 'react';
import { connect } from 'react-redux';
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
              <Logout />
        }
      </div>
    );
  }
}

export default connect(state => state)(App);
