import React, { Component } from 'react';
import { connect } from 'react-redux';
import Logout from './Logout';
import db from '../firebase';
import { checkIfUserExists } from './actionCreators/userActions';

class Register extends Component {
  checkUser = (user) => { this.props.dispatch(checkIfUserExists(user)) }

  componentDidMount() {

  }

  addUserSettings = (user) => {
    db.collection('users').doc(this.props.user).set(user).then((response) => {
      this.checkUser(this.props.user);
    })
  }

  checkForm = (e) => {
    e.preventDefault();
    let user = {
      name: e.target.name.value,
      location: e.target.location.value,
      phonenumber: e.target.phonenumber.value,
      verified: e.target.verify.checked,
      suspended: false,
    }
    this.addUserSettings(user);

  }

  render() {
    return (
      <div>
        <h2>Register</h2>
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
          <input type="checkbox" id="verify" name="verify" value="verify" required />
          <label htmlFor="verify">Jag är över 18</label>
          <br />
          <input type="submit" name="submit" id="submit" placeholder="Spara" />
        </form>
        <Logout />
      </div>
    );
  }
}

export default connect(state => state)(Register);
