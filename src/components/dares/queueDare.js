import React, { Component } from 'react';
import { connect } from 'react-redux';
import db from '../../firebase';


class QueueDare extends Component {


  removeDare = () => {
    db.collection('queue').doc(this.props.user.email).delete()
  }

  render() {

    return (
      <div>
        <h2>{this.props.userSettings.name}, du har skickat följande:</h2>
        {this.props.dareStatus.dare ?
          <ul>
            <li>datum: {this.props.dareStatus.dare.date}</li>
            <li>tid: {this.props.dareStatus.dare.timeStart} - {this.props.dareStatus.dare.timeEnd}</li>
            <li>nivå: {this.props.dareStatus.dare.level}</li>
            <li>budget: {this.props.dareStatus.dare.budget}</li>
          </ul>
          : null}
        <p>Nu löser vi resten!</p>
      </div>
    );

  }
}


export default connect(state => state)(QueueDare);
