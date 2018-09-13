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
    start: '',
    matchedUserName: '',
    matchedUserPhoneNumber: 0,
  }


  componentDidMount() {
    this.setTimer();
    this.getMatchedUser();
  }
  // Update the count down every 1 second

  getMatchedUser = () => {
    let matchedUserEmail = '';
    if (this.props.dareStatus.userMatch.id1 === this.props.user.email) {
      matchedUserEmail = this.props.dareStatus.userMatch.id2;
    }
    else {
      matchedUserEmail = this.props.dareStatus.userMatch.id1;
    }
    return db.collection('users').doc(matchedUserEmail).get()
      .then((response) => {
        console.log(response.data())
        this.setState({
          matchedUserName: response.data().name,
          matchedUserPhoneNumber: response.data().phonenumber,
        })
      })
  }

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
    console.log(this.state.d, ' ', this.state.h, ' ', this.state.m, ' ', this.state.m)
    //check in possible between 20 minutes before and 10 minutes after activity starts
    if (this.state.d === 0 && this.state.h === 0 && this.state.m <= 20 && this.state.m >= 0) {
      return (<div>
        <p>Incheckning, 20 minuter innan till 10 minuter efter och användare kan checka in</p>
        <p>Du ska träffa: {this.state.matchedUserName}</p>
        <p>Telefonnummer: {this.state.matchedUserPhoneNumber}</p>
        <Mapbox />
        {
          this.props.user.userInCheckInDistance ?
          <button enabled>Checka in</button>
          :
          <button disabled>Checka in</button>
        }
      </div>)
    }
    //Access to info on activity 10 minutes before start
    else if (this.state.d === 0 && this.state.interval > 0) {
      return (
        <div>
          <p> Din aktivitet börjar om {timeLeft.h}h:{timeLeft.m}m:{timeLeft.s}</p>
          <p>Du kan checka in 20 minuter innan aktiviten startar</p>
          <p>Vad: {this.props.activityInfo.activity}</p>
          <p>Beräknad kostnad: {this.props.activityInfo.cost} kr</p>
          <p>Uppskattad tid: {this.props.activityInfo.duration} minuter</p>
          <Mapbox />
          <button disabled>Checka in</button>
        </div>
      )
    }
    //if user fails to check in within 10 minutes, they're suspended
    else if (this.state.interval < 0) {
      //kör blockeringsfunktion
      return <p>Du är blockerad!</p>
    }
    else {
      return (
        <div>
          <h2> Om {(timeLeft.d - 1)}d:{timeLeft.h}h:{timeLeft.m}m:{timeLeft.s}s får du veta vad du och din utmanare ska göra!</h2>

        </div>
      );
    }
  }
}


export default connect(state => state)(PendingDare);
