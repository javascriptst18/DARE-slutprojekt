import React, { Component } from 'react';
import { connect } from 'react-redux';
import db from '../../firebase';


class UserMatchedDare extends Component {

render() {
 
return (
  <div>
    <h3>{this.props.userSettings.name}, du och din utmanare ska göra något som matchar: </h3>
    <ul>
    <li>datum: {this.props.dareStatus.userMatch.date}</li>
      <li>tid: {this.props.dareStatus.userMatch.timeStart} - {this.props.dareStatus.userMatch.timeEnd}</li>
      <li>nivå: {this.props.dareStatus.userMatch.level}</li>
      <li>budget: {this.props.dareStatus.userMatch.cost}</li>
    </ul>
    <p>Nu löser vi resten!</p>
  </div>
    );
  }
}


export default  connect(state => state)(UserMatchedDare);
