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
    db.collection('users').doc(this.props.user.email).set(user).then((response) => {
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
      <div className="mainContentDiv">
        <div className="menu">Skapa ditt användarkonto</div>
        <h2>Mina uppgifter</h2>
        <div className="mainContentDivInput">
        <form onSubmit={(e) => { this.checkForm(e) }}>


          <label htmlFor="name">
          <span className="inputFieldText">Namn:</span><br />
        <input type="text" name="name" id="name" placeholder="Namn" required className="input"/>
          </label>
          <br />
          <label htmlFor="location">
          <span className="inputFieldText">Plats:</span><br />
        <input type="text" name="location" id="location" placeholder="Plats" required className="input"/>
          </label>
          <br />
          <label htmlFor="phonenumber">
          <span className="inputFieldText">Telefonnummer:</span><br />
        <input type="tel" name="phonenumber" id="phonenumber" placeholder="Telefonnummer" required className="input"/>
          </label>

          <span className="inputFieldText">Ålder:</span><br />
          <label htmlFor="verify" className="container">
          <input type="checkbox" id="verify" name="verify" value="verify" required /> <span class="checkmark"></span>
          <span className="inputFieldText">Jag är äldre än 18 år.</span><br /></label>

        
          <br />
          <input type="submit" name="submit" id="submit" placeholder="Spara" className="buttonStandardBlack"/>
        </form>
        </div>
        <div className="mainContentDiv">
        <Logout />
        </div>
      </div>
    );
  }
}

export default connect(state => state)(Register);
