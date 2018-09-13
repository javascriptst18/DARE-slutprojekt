import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { provider } from '../firebase';
import { checkIfUserExists, login } from './actionCreators/userActions';
import Slider from './swipe';
import removeSuspension from '../UserFunctions';

class Start extends Component {
  //checkUser = (user) => { checkIfUserExists(user) }
  //login = (user) => { this.props.dispatch(login(user)) }

  componentDidMount() {
    this.auth();
    if (this.props.userSettings.suspended){
       removeSuspension(this.props.user.email, this.props.userSettings.suspensionEnds)}
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
        <Slider />
        <div className="mainContentDiv">
          <button onClick={this.loginButton} className="buttonStandard"> Logga in </button>
        </div>
      </div>
    );
  }
}

export default connect(state => state)(Start);
