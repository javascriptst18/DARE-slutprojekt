import React, { Component } from 'react';
import { connect } from 'react-redux';
import db from '../../firebase';
import Mapbox from '../Mapbox';


class PendingDare extends Component {
  state = {
    d: 0,
    h: 1,
    m: 0,
    s: 0,
    interval: 0,
    start: ''
  }


  componentDidMount() {
    this.setTimer();
  }
  // Update the count down every 1 second

  displayActivityStart = () => {
    let date = new Date(this.props.userMatch.starts);

  }

  setTimer = () => {
    setInterval(this.timer, 1000);
  };

  timer = () => {

    let now = new Date().getTime();
    let goal = this.props.dareStatus.userMatch.starts;
    let diff = goal - now;
    let secondsLeft = Math.floor((diff) / 1000);

    //displayed time
    let days = Math.floor(secondsLeft / 86400);//60 seconds* 60 minutes * 24 hours = 86400
    let hours = Math.floor((secondsLeft - (days * 86400)) / 3600); //60s * 60m = 3600
    let minutes = Math.floor((secondsLeft - (days * 86400) - hours * 3600) / 60);
    let seconds = secondsLeft - (days * 86400) - hours * 3600 - minutes * 60;

    let timeLeft = {
      d: days,
      h: hours,
      m: minutes,
      s: seconds,
      interval: diff,
    };

    this.setState(timeLeft)
  }

  render() {
    let timeLeft = this.state;

    //check in possible between 20 minutes before and 10 minutes after activity starts
    if (this.state.d === 0 && this.state.h === 1 && this.state.m <= 20 && this.state.m >= -10) {
      return <p>incheckning</p>
    }
    //Access to info on activity 10 minutes before start
    else if (this.state.d === 0 && this.state.interval > 0) {
      return (
        <div>
          <p> visa karta, aktivitetsinfo, ej check in</p>
          <Mapbox />
        </div>
      )
    }
    //if user fails to check in within 10 minutes, they're suspended
    else if (this.state.interval > 0) {
      //kör blockeringsfunktion
      return <p>Du är blockerad!</p>
    }
    else {
      return (
        <div>
          <h2> Om {timeLeft.d}d:{timeLeft.h}h:{timeLeft.m}m:{timeLeft.s}s får du veta vad du och din utmanare ska göra!</h2>
          <p>Vi har matchat er mot något som stämmer in på: </p>
          <ul>
            <li>när: {this.state.start} </li>
            <li>nivå: {this.props.dareStatus.userMatch.level}</li>
            <li>budget: {this.props.dareStatus.userMatch.cost}</li>
          </ul>
          <Mapbox />
        </div>
      );
    }
  }
}


export default connect(state => state)(PendingDare);
