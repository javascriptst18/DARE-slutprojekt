import React, { Component } from 'react';
import { connect } from 'react-redux';
import db from '../../firebase';
import Mapbox from '../Mapbox';
import suspendUser from '../../UserFunctions';

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
    checkedin: false,
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

    this.setState({
      d: timeLeft.d,
      h: timeLeft.h,
      m: timeLeft.m,
      s: timeLeft.s,
      interval: timeLeft.interval
    })
  }

  onCheckIn = (e) => {
    e.preventDefault();
    this.setState({checkedin: true});
  }

  render() {
    let timeLeft = this.state;
    
    //check in possible between 20 minutes before and 10 minutes after activity starts
    if (this.state.d === 0 && this.state.h === 0 && this.state.m <= 20 && this.state.m >= 0) {
      return (<div>
        <h2> Dags att checka in!</h2>
        <p>Du har {timeLeft.m}m:{timeLeft.s} på dig innan aktiviteten börjar.</p>        
        <p>Du ska träffa: {this.state.matchedUserName}</p>
        <p>Telefonnummer: {this.state.matchedUserPhoneNumber}</p>
        <Mapbox />
        {
          this.props.user.userInCheckInDistance ?
          <button enabled onClick={this.onCheckIn} >Checka in</button>
          :
          <button disabled>Checka in</button>
        }
      </div>)
    }
    //Access to info on activity 10 minutes before start
    else if (this.state.d === 0 && this.state.interval > 0) {
      return (
        <div>
          <h2> Din aktivitet börjar om {timeLeft.h}h:{timeLeft.m}m:{timeLeft.s}</h2>
          <p>Du kan checka in 20 minuter innan aktiviteten startar</p>
          <p>Vad: {this.props.activityInfo.activity}</p>
          <p>Beräknad kostnad: {this.props.activityInfo.cost} kr</p>
          <p>Uppskattad tid: {this.props.activityInfo.duration} minuter</p>
          <Mapbox />
          <button disabled>Checka in</button>
        </div>
      )
    }
    //if user fails to check in on time, they're suspended
    else if (this.state.interval < 0 && !this.state.checkedin) {
      suspendUser(this.props.user.email);
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
