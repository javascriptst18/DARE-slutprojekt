import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postDare } from '../actionCreators';
import db from '../firebase';

class NewDare extends Component {
    state = {
        location: '', 
        date: '',
        timeStart: '',
        timeEnd: '',
        budget: 0,
        level: 2, //needs some kind of explanation in UI
    }

    onChange = (e) => {
        e.preventDefault();
        this.setState({[e.target.id]: e.target.value});
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.matchDares();
        this.setState({}); //tömmer ej fälten som den ska
    }

    matchDares = () => {
        const myDare = this.state;
        let matched = {};
       // reads dare queue from db and searches for a match
        db.collection('queue').get()
        .then((queueSnapshot) =>  {
            queueSnapshot.forEach((unmatched) => {
                this.compareDares(myDare, unmatched, matched);
            })
        })
        .then((matched) => {
            if (matched === {} || !matched) {
                this.postUnmatched(myDare);
            }
            else this.matchDareActivity(matched);
        });
     }    
    
    matchDareActivity = (userDareMatch) => {
        let finalVersion = {};
        db.collection('activity').get()
        .then((activitySnapshot) =>  {
            activitySnapshot.forEach((activity) => {
                this.compareDareActivity(userDareMatch, activity, finalVersion);
            });
        });
    }

    postUnmatched = (unmatched) => {
        const dare = postDare(unmatched, this.props.user.email);
        this.props.dispatch(dare);
    }

    //this is not what the objects look like, just a sketch of matching procedure 
    compareDares = (myDare, dare, matched) => {
        if (dare.date === myDare.date
            && dare.location === myDare.location
            && dare.level === myDare.level
            && dare.timeStart < myDare.timeEnd 
            && myDare.timeStart < dare.timeEnd
            && matched === {} ) {
                const budget = Math.min(dare.budget, myDare.budget);
                const timeStart = Math.max(dare.timeStart, myDare.timeStart);
                const timeEnd = Math.min(dare.timeEnd, myDare.timeEnd);
                return matched = {
                    id1: dare.id, 
                    id2: myDare.id, 
                    cost: budget,
                    starts: timeStart,
                    ends: timeEnd
                };
            }
        else return matched;
    }

    render() {
        return(
            <form onSubmit={this.onSubmit}> 
                <h2>I dare you, {this.props.user.displayName}</h2>
                <label htmlFor="level">
                    Chicken or DAREDevil? 
                    <input 
                    type="range" 
                    list="tickmarks"
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