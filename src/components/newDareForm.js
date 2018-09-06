import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postDare } from '../actionCreators';

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
        
        this.setState({}); //tömmer ej fälten som den ska
    }

    postUnmatched = (unmatched) => {
        const dare = postDare(unmatched, this.props.user.email);
        this.props.dispatch(dare);
    }

    // Remember to activate

    // matchDares = (lastPosted) => {
    //     db.collection('queue').get()
    //     .then((queueSnapshot) => {

    //         this.compareDares(lastPosted, queueSnapshot);

    //         queueSnapshot.forEach((unmatched) => {
    //             // doc.data() is never undefined for query doc snapshots
    //             console.log(unmatched.id, " => ", unmatched.data());
    //         });
    //     })
    // }

    //this is not what the objects look like, just a sketch of 
    // compareDares = (dare) => {
    //     const myDare = this.state;
    //         if (dare.date === myDare.date
    //             && dare.location === myDare.location
    //             && dare.level === myDare.level
    //             && dare.timeStart < myDare.timeEnd 
    //             && myDare.timeStart < dare.timeEnd) {
    //                 const budget = Math.min(dare.budget, myDare.budget);
    //                 const timeStart = Math.max(dare.timeStart, myDare.timeStart);
    //                 const timeEnd = Math.min(dare.timeEnd, myDare.timeEnd);
    //                 const matched = {
    //                     id1: dare.id, 
    //                     id2: myDare.id, 
    //                     cost: budget,
    //                     starts: timeStart,
    //                     ends: timeEnd} ;
    //                 return matched;
    //             } else if ( queue.length === 0 ) {
    //                 this.postUnmatched(myDare);
    //             }
    //             else {
    //                 queue.pop(dare);
    //             }
    // }

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