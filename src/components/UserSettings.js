import React, { Component } from 'react';
import { connect } from 'react-redux';
import Logout from './Logout';
import db from '../firebase';
import { checkIfUserExists } from './actionCreators/userActions';
import Mapbox from './Mapbox';

class Register extends Component {

  componentDidMount() {
    //Sätt fält här
  }

  updateUserSettings = (user) => {
    db.collection("users").doc(this.props.user).update({
      name: user.name,
      location: user.location,
      phonenumber: user.phonenumber,
  })
  .then(
    this.props.dispatch(checkIfUserExists(this.props.user))
  )

  }

  checkForm = (e) => {
    e.preventDefault();
    let user = {
      name: e.target.name.value,
      location: e.target.location.value,
      phonenumber: e.target.phonenumber.value,
      suspended: false,
    }
    this.updateUserSettings(user);

  }

  render() {
    return (
      <div>
        <h2>Mina inställningar</h2>
        <form onSubmit={(e) => { this.checkForm(e) }}>
          <label htmlFor="name">
            Namn:
        <input defaultValue={this.props.userSettings.name} type="text" name="name" id="name" placeholder="Namn" required />
          </label>
          <br />
          <label htmlFor="location">
            Plats:
        <input defaultValue={this.props.userSettings.location} type="text" name="location" id="location" placeholder="Plats" required />
          </label>
          <br />
          <label htmlFor="phonenumber">
            Telefonnummer:
        <input defaultValue={this.props.userSettings.phonenumber} type="tel" name="phonenumber" id="phonenumber" placeholder="Telefonnummer" required />
          </label>
          <br />
          <input type="submit" name="submit" id="submit" value="Uppdatera" />
        </form>
        <Logout />
        <Mapbox />
      </div>
    );
  }
}

export default connect(state => state)(Register);
