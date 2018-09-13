import React, { Component } from 'react';
import { connect } from 'react-redux';
import db from '../../firebase';


class QueueDare extends Component {

  
removeDare = () => {
  db.collection('queue').doc(this.props.user.email).delete() 
}

render() {
 
return (
  <div className="mainContentDiv">
    <h3>{this.props.userSettings.name}, du har skickat följande:</h3>
    <div className="mainContentDivList">
    <ul className="lists">
    <li><span className="listRubrik">Nivå av Dare:</span><span className="listText">{this.props.dareStatus.dare.level}</span></li>
    <li><span className="listRubrik">Datum:</span> <span className="listText">{this.props.dareStatus.dare.date}</span></li>
      <li><span className="listRubrik">Tid:</span> <span className="listText">{this.props.dareStatus.dare.timeStart} - {this.props.dareStatus.dare.timeEnd}</span></li>
      <li><span className="listRubrik">Budget:</span> <span className="listText">{this.props.dareStatus.dare.budget} kr</span></li>
    </ul>
    </div>
    <p>Nu hittar vi en Dare för dig!</p>
  </div>
    );

  }
}


export default  connect(state => state)(QueueDare);
