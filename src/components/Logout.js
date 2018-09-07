import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { logout } from './actionCreators/userActions';

class Logout extends Component {

  logout = () => { this.props.dispatch(logout()) }

  logoutButton = () => {
    firebase.auth().signOut();
    this.logout({type: 'LOGOUT', value: null})
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
