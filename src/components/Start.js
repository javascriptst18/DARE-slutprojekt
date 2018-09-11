import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { provider } from '../firebase';
import { checkIfUserExists, login } from './actionCreators/userActions';

class Start extends Component {
  //checkUser = (user) => { checkIfUserExists(user) }
  //login = (user) => { this.props.dispatch(login(user)) }

  componentDidMount() {
    this.auth();
  }

  auth = () => {
    firebase.auth()
      .onAuthStateChanged(user => {
        if (user) {
          this.props.dispatch(checkIfUserExists(user));
        }
      })
  }

  loginButton = () => {
    firebase.auth()
      .signInWithPopup(provider)
  }

  render() {
    return (
      <div>
        <h2>Start</h2>
        <button onClick={this.loginButton}> Login </button>
      </div>
    );
  }
}

export default connect(state => state)(Start);
