import React, { Component } from 'react';
import { connect } from 'react-redux';
import db from '../firebase';
import { checkIfUserExists } from './actionCreators/userActions';
import Mapbox from './Mapbox';

class Register extends Component {

  componentDidMount() {
    //Sätt fält här
  }

  updateUserSettings = (user) => {
    db.collection("users").doc(this.props.user.email).update({
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

      <div className="mainContentDivInput">
        <form onSubmit={(e) => { this.checkForm(e) }}>
          <label htmlFor="name">
          <span className="inputFieldText">Namn:</span><br />
        <input defaultValue={this.props.userSettings.name} type="text" name="name" id="name" placeholder="Namn" required className="input"/>
          </label>
          <br />
          <label htmlFor="location">
          <span className="inputFieldText">Plats:</span><br />
        <input defaultValue={this.props.userSettings.location} type="text" name="location" id="location" placeholder="Plats" required  className="input"/>
          </label>
          <br />
          <label htmlFor="phonenumber">
           <span className="inputFieldText">Telefonnummer:</span><br />
        <input defaultValue={this.props.userSettings.phonenumber} type="tel" name="phonenumber" id="phonenumber" placeholder="Telefonnummer" required className="input"/>
          </label>
          <br />
          <input type="submit" name="submit" id="submit" value="Uppdatera" className="buttonStandardBlack"/>
        </form>

        </div>
      </div>
    );
  }
}

export default connect(state => state)(Register);
