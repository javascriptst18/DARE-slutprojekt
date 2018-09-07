import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postDare } from './actionCreators/dareActions';
import db from '../firebase';

class NewDare extends Component {
    state = {
        location: 'Stockholm', 
        date: '2019-01-01',
        timeStart: '01:00',
        timeEnd: '23:59',
        budget: 500,
        level: 2, //needs some kind of explanation in UI
        start: 0,
        end: 0,
    }

    onChange = (e) => {
        e.preventDefault();
        this.setState({[e.target.id]: e.target.value});
    }

    onSubmit = (e) => {
        e.preventDefault();
        //reformat dates to ms from 1970-01-01
        const start = this.stringsToDate(this.state.date, this.state.timeStart);
        const end = this.stringsToDate(this.state.date, this.state.timeEnd);
        console.log(this.state);
        this.setState({start: start, end: end} );
        console.log('start: ' +start + ' end: ' + end);
        console.log(this.state);
        this.setState({location: 'vadsomhelst'});
        console.log(this.state);
        //this.matchDares();
     //   this.setState({}); //tömmer ej fälten som den ska
    }

    matchDares = () => {
        const myDare = this.state;
        let matched = {};
        const tempArr = [];
        db.collection('queue').onSnapshot(querySnapshot => {
          querySnapshot.forEach(doc => {
            let newData = doc.data()
            newData.id = doc.id;
            tempArr.push(newData);
            this.compareDares(myDare, tempArr, matched)
          }) })
        // compares myDare with fetched queue
       
     }
     //Johannes funktion för att hämta kö
     getTheQueue = () => {
        const tempArr = [];
        db.collection('queue').onSnapshot(querySnapshot => {
          querySnapshot.forEach(doc => {
            let newData = doc.data()
            newData.id = doc.id;
            tempArr.push(newData);
          });
          this.setState({testQueue: tempArr}); // använda för mappa igenom och skriva ut?
          console.log(this.state.testQueue);
        })
     }
   
    compareDares = (myDare, dare, matched) => {

        console.log('meeeeeeeeeeeeeeeeeeeeeeeeeee')
        dare.timeStart = this.stringsToDate(dare.date, dare.timeStart);
        dare.timeEnd = this.stringsToDate(dare.date, dare.timeEnd);
            if ( dare.date === myDare.date 
            /* && dare.location === myDare.location
            && dare.level == myDare.level //don't care about format for now
            && dare.timeStart < myDare.timeEnd 
            && myDare.timeStart < dare.timeEnd*/
        ) {     console.log('muuuuuuuuuuuuuuuuuuuuuuuuuuu')
                const budget = Math.min(dare.budget, myDare.budget);
                const timeStart = Math.max(dare.timeStart, myDare.timeStart);
                const timeEnd = Math.min(dare.timeEnd, myDare.timeEnd);
                //returns user match, not connected to activity yet
                return matched = {
                    date: dare.date,
                    id1: dare.id, 
                    id2: myDare.id, 
                    cost: budget,
                    starts: timeStart,
                    ends: timeEnd
                };
            }
            else {
                console.log(matched + ' wooohooooooooooooo');
                return matched;
            }
    }

    stringsToDate = (date, time) => {
        const fullstring = date + 'T' + time + ':00+01:00';
        return date = new Date(fullstring).getTime();
    }

    postUnmatched = (unmatched) => {
        const dare = postDare(unmatched, this.props.user);
        this.props.dispatch(dare);
    }

    matchDareActivity = (userDareMatch) => {
        let finalVersion = {};
        db.collection('activity').get()
        .then((activitySnapshot) =>  {
            activitySnapshot.forEach((activity) => {
                this.compareDareActivity(userDareMatch, activity, finalVersion);
            });
        })
        
    }

    compareDareActivity = (userDareMatch, activity, finalVersion) => {
        if( finalVersion === {}
        && userDareMatch.cost < activity.cost
        && userDareMatch.location === activity.location
        && activity.open < userDareMatch.starts
        && userDareMatch.ends < activity.close
        //&& rätt veckodag öppet
        ) {
            return finalVersion = {
                accepted: false,
                declined: false,
                activity: activity.id,
                starts: userDareMatch.starts,
                ends: userDareMatch.ends,
            };
        } else return finalVersion;
    }

    render() {
        console.log(this.state.start);
        return(
            <form onSubmit={this.onSubmit}> 
                <h2>I dare you, {this.props.user.displayName}!</h2>
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
                    onChange={this.onChange} />
                </label>
                <label htmlFor="timeStart"> 
                    Starttid
                    <input 
                    type="time" 
                    id="timeStart"
                    onChange={this.onChange} />
                </label>
                <label htmlFor="timeEnd"> 
                    Sluttid
                    <input 
                    type="time" 
                    id="timeEnd"
                    onChange={this.onChange} /> 
                </label>
                <label htmlFor="budget">
                    Max budget
                    <input 
                    type="number"
                    id="budget"
                    onChange={this.onChange} />
                </label>
                <input
                    type="submit"
                    value="Skicka in" />
            </form>
        )
    }
}

export default connect(state => state)(NewDare);