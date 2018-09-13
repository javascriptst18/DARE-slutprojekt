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
        <h2>{this.props.userSettings.name}, din Dare info:</h2>
        {this.props.dareStatus.dare ?
          <ul className="mainContentDivList">
            <li><span className="listRubrik">Datum: </span><span className="listText">{this.props.dareStatus.dare.date}</span></li>
            <li><span className="listRubrik">Tid: </span><span className="listText">{this.props.dareStatus.dare.timeStart} - {this.props.dareStatus.dare.timeEnd}</span></li>
            <li><span className="listRubrik">Nivå: </span><span className="listText">{this.props.dareStatus.dare.level}</span></li>
            <li><span className="listRubrik">Budget: </span><span className="listText">{this.props.dareStatus.dare.budget}</span></li>
          </ul>
          : null}
        <p>Nu hittar vi en Dare för dig!</p>
      </div>
    );

  }
}


export default connect(state => state)(QueueDare);
