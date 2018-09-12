import React, { Component } from 'react';
import { connect } from 'react-redux';
import db from '../../firebase';
import Mapbox from '../Mapbox';


class PendingDare extends Component {

componentDidMount() {
  this.setTimer();
}
// Update the count down every 1 second
setTimer = () => {

  let now = new Date().getTime();
  let goal = this.props.dareStatus.userMatch.starts;
  let secondsLeft = Math.floor((goal-now)/1000);

  //displayed time
  let days = Math.floor(secondsLeft/86400);//60 seconds* 60 minutes * 24 hours = 86400
  let hours = Math.floor((secondsLeft - (days*86400))/3600); //60s * 60m = 3600
  let minutes = Math.floor((secondsLeft - (days*86400) - hours*3600)/60);
  let seconds = secondsLeft - (days*86400) - hours*3600 - minutes*60;

  let timeLeft = {
    d: days,
    h: hours,
    m: minutes,
    s: seconds,
  };

  return timeLeft;
}



render() {
  let timeLeft = this.setTimer();
return (
  <div>
    <h2> Om {timeLeft.d}d:{timeLeft.h}h:{timeLeft.m}m:{timeLeft.s}s får du veta vad du och din utmanare ska göra!</h2>
    <Mapbox />
  </div>
    );
  }
}


export default  connect(state => state)(PendingDare);
