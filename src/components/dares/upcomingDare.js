import React, { Component } from 'react';
import { connect } from 'react-redux';
import db from '../../firebase';


class UpcomingDare extends Component {

  
removeDare = () => {
  db.collection('queue').doc(this.props.user.email).delete() 
}



render() {
 
return (
  <div>
    <h3>{this.props.userSettings.name}, du har skickat följande:</h3>
    <ul>
    <li>datum: {this.props.dareStatus.dare.date}</li>
      <li>tid: {this.props.dareStatus.dare.timeStart} - {this.props.dareStatus.dare.timeEnd}</li>
      <li>nivå: {this.props.dareStatus.dare.level}</li>
      <li>budget: {this.props.dareStatus.dare.budget}</li>
    </ul>
    <p>Nu löser vi resten!</p>
  </div>
    );

  }
}


export default  connect(state => state)(UpcomingDare);
