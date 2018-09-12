import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { provider } from '../firebase';
import { checkIfUserExists, login } from './actionCreators/userActions';
import Slider from './swipe';

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
          //this.props.dispatch(checkIfUserExists(user.email)).then(this.props.dispatch(login(user)))
          this.props.dispatch(checkIfUserExists(user));
          //this.props.dispatch(login(user))
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
        <Slider />
        <div className="mainContentDiv">
          <button onClick={this.loginButton} className="buttonStandard"> Logga in </button>
        </div>
      </div>
    );
  }
}

export default connect(state => state)(Start);
