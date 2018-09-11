import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postDare, postUserMatch, postPendingDare, inQueue } from '../actionCreators/dareActions';
import db from '../../firebase';


class NewDare extends Component {
    state = {
        location: this.props.userSettings.location, 
        date: '2019-01-01',
        timeStart: '00:00',
        timeEnd: '23:59',
        budget: 1000,
        level: 2, //needs some kind of explanation in UI
        start: 0,
        end: 0,
    }

    onChange = (e) => {
        e.preventDefault();

        //reformat dates to ms from 1970-01-01
        if (e.target.id === 'timeStart' || e.target.id === 'timeEnd') {
            const start = this.stringsToDate(this.state.date, this.state.timeStart);
            const end = this.stringsToDate(this.state.date, this.state.timeEnd); 
            this.setState({ start: start, end: end, [e.target.id]: e.target.value });
        }
        else if (e.target.id === 'budget' || e.target.id === 'level'){
            this.setState({[e.target.id]: parseInt(e.target.value)})  
        }
        else this.setState({[e.target.id]: e.target.value});
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.getUserMatch(this.state, this.props.user.email);
        this.setState({}); //tömmer ej fälten som den ska
    }
    
    getUserMatch = (myDare, email) => {
        let matched = {};
        const tempArr = [];
        db.collection('queue')
          .where('date', '==', myDare.date)
          .where('location', '==', myDare.location)
          .where('level', '==', myDare.level)
          .where('start', '<', myDare.end)
          .onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              let newData = doc.data();
              newData.id = doc.id;
              tempArr.push(newData);
            });    
              this.createUserMatch(tempArr, myDare, email, matched)
              this.postMatchResult(myDare, matched)       
        })
    }

    createUserMatch = (dareArray, myDare, email, matched) => {
        for (let i = 0; i < dareArray.length; i++) {
            if (matched === {} && myDare.start < dareArray[i].end) {
                console.log(dareArray)
                const budget = Math.min(dareArray[i].budget, myDare.budget);
                const timeStart = Math.max(dareArray[i].start, myDare.start);
                const timeEnd = Math.min(dareArray[i].end, myDare.end);
                matched = {
                date: myDare.date,
                id1: dareArray[i].id,
                id2: email,
                cost: budget,
                starts: timeStart,
                ends: timeEnd,
                location: myDare.location,
                level: myDare.level
                };
                console.log(matched);
            }
        }
        return matched;
    }

    postMatchResult = (myDare, matched) => {
        if (matched.id1) {
            console.log(matched);
            db.collection('queue').doc(matched.id1).delete(); //matched.id1 är undefined
            this.props.dispatch(postUserMatch(matched))
            .then((response) => {
                console.log(response);
                this.getActivityMatch(matched, this.props.handleDare.userMatchId);
            })
        }
        else {
            this.postUnmatched(myDare); 
            this.props.dispatch(inQueue());
            console.log('skickar in')
        }
    }
    getActivityMatch = (userMatch, id) => {
       this.weekdayFromTime(userMatch.starts);
        let tempArr = [];//will hold activities
       //needs some kind of matching thingy for time as well
        db.collection('activity') 
            .where('level', '==', userMatch.level)
            .where('cost', '<=', userMatch.cost) 
            .where('city', '==', userMatch.location.toLowerCase())
            .onSnapshot((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                  let newData = doc.data();
                  newData.id = doc.id;
                  tempArr.push(newData);
                });
            
                //given the activities above, random choice of activity
                if(tempArr.length > 0){
                    const i = Math.floor(Math.random()*tempArr.length);
                    let randomActivity = tempArr[i];
                    const activityMatch = {
                        activityId: randomActivity.id,
                        userMatchId: id,
                        accepted: false,
                        declined: false
                    };
                    console.log(activityMatch);
                    this.props.dispatch(postPendingDare(activityMatch));
                } else {
                    console.log('no activities found')}
            });
    }

    postUnmatched = (unmatched) => {
        const dare = postDare(unmatched, this.props.user.email);
        this.props.dispatch(dare);
    };

    stringsToDate = (date, time) => {
        const fullstring = `${date}T${time}:00+01:00`;
        return date = new Date(fullstring).getTime();
      };
    
    weekdayFromTime = (time) => {
        let date = new Date(time).getDay();
        let day = '';
        switch (date) {
            case 0:
                return day = 'sunday';
            case 1:
                return day = 'monday';
            case 2:
                return day = 'tuesday';
            case 3:
                return day = 'wednesday';
            case 4:
                return day = 'thursday';
            case 5:
                return day = 'friday';
            case 6:
                return day = 'saturday';
            default: return null;
        };
    }

    render() {
        
        return(
            <form onSubmit={this.onSubmit}> 
                <h2>I dare you, {this.props.userSettings.name}!</h2>
                <label htmlFor="level">
                    Chicken or DAREDevil? 
                    <input 
                    type="range" 
                    min="1" 
                    max="3" 
                    value={this.state.daredevil} 
                    className="slider" 
                    id="level"
                    onChange={this.onChange} />
                </label>
                <label htmlFor="location">
                    Plats
                    <input 
                    type="text"
                    value={this.state.location}
                    onChange={this.onChange}
                    id="location"/>
                </label>
                <label htmlFor="date"> 
                    Datum
                    <input 
                    type="date" 
                    id="date"
                    value={this.state.date}
                    onChange={this.onChange} />
                </label>
                <label htmlFor="timeStart"> 
                    Starttid
                    <input 
                    type="time" 
                    id="timeStart"
                    onChange={this.onChange}
                    value={this.state.timeStart} />
                </label>
                <label htmlFor="timeEnd"> 
                    Sluttid
                    <input 
                    type="time" 
                    id="timeEnd"
                    onChange={this.onChange}
                    value={this.state.timeEnd} /> 
                </label>
                <label htmlFor="budget">
                    Max budget
                    <input 
                    type="number"
                    id="budget"
                    step="100"
                    onChange={this.onChange}
                    value={this.state.budget} />
                </label>
                <input
                    type="submit"
                    value="Skicka in" />
            </form>
        )
    }
}

export default connect(state => state)(NewDare);