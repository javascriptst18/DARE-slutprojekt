import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from '../firebase';

class UserSettings extends Component {
  state = {
    Name: '',
    location: '',
    phoneNuber: 0,
  };

  userAdded = () => {
    firebase.database().ref('/users').on('child_added', (snapshot) => {
      this.setState({
        key: snapshot.key,
        value: snapshot.val().message,
        user: snapshot.val().user,
        timestamp: snapshot.val().timestamp,
      });
    });
  }

  checkForm = (e) => {
    e.preventDefault();
    let name = e.target.name.value;
    let location = e.target.location.value;
    let phonenumber = e.target.phonenumber.value;
    let suspended = false;
    let verification = false;

    let userInfo = {
      name: name,
      location: location,
      phonenumber: phonenumber,
      suspended: suspended,
      verification: verification,
    }
    firebase.database().ref('/users').push(userInfo);
  }

  render() {
    return (
      <form onSubmit={(e) => { this.checkForm(e) }}>
        <label htmlFor="name">
          Namn:
        <input type="text" name="name" id="name" placeholder="Namn" required />
        </label>
        <br />
        <label htmlFor="location">
          Plats:
        <input type="text" name="location" id="location" placeholder="Plats" required />
        </label>
        <br />
        <label htmlFor="phonenumber">
          Telefonnummer:
        <input type="tel" name="phonenumber" id="phonenumber" placeholder="Telefonnummer" required />
        </label>
        <br />
        <input type="submit" name="submit" id="submit" placeholder="Spara" />
      </form>
    );
  }
}



export default connect(state => state)(UserSettings);
