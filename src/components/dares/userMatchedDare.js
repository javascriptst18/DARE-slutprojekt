import React, { Component } from 'react';
import { connect } from 'react-redux';
import db from '../../firebase';


class UserMatchedDare extends Component {

//needs time formatting in componentdidmount

render() {
 
return (
  <div>
    <h2>{this.props.userSettings.name}, du och din utmanare ska göra något som matchar: </h2>
    <ul>
    <p>datum: {this.props.dareStatus.userMatch.date}</p>
      <p>nivå: {this.props.dareStatus.userMatch.level}</p>
      <p>budget: {this.props.dareStatus.userMatch.cost}</p>
    </ul>
    <p>Nu löser vi resten!</p>
  </div>
    );
  }
}


export default  connect(state => state)(UserMatchedDare);
