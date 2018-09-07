import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { checkIfUserExists, logout } from './actionCreators/userActions';

class Logout extends Component {

  logout = () => { this.props.dispatch(logout()) }
  checkUser = (user) => { this.props.dispatch(checkIfUserExists(user)) }

  logoutButton = () => {
    firebase.auth().signOut();
    this.logout({type: 'LOGOUT', value: null})
    this.checkUser('logout');
  }

  render() {
    return (
      <div>
        <h2>Logout</h2>
        <button onClick={this.logoutButton}> Logout </button>
      </div >
    );
  }
}

export default connect(state => state)(Logout);
