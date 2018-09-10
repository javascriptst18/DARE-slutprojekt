import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postDare } from '../actionCreators/dareActions';
import db from '../../firebase';
import { stringsToDate, matchDares } from './matchingFunctions';

class NewDare extends Component {
    state = {
        location: 'Stockholm', 
        date: '2019-01-01',
        timeStart: '01:00',
        timeEnd: '23:59',
        budget: 500,
        level: 2, //needs some kind of explanation in UI
        start: 1546297200000,
        end: 1546380000000,
    }

    onChange = (e) => {
        e.preventDefault();

        //reformat dates to ms from 1970-01-01
        if (e.target.id === 'timeStart' || e.target.id === 'timeEnd') {
            const start = stringsToDate(this.state.date, this.state.timeStart);
            const end = stringsToDate(this.state.date, this.state.timeEnd); 
            this.setState({ start: start, end: end, [e.target.id]: e.target.value });
        }
        else this.setState({[e.target.id]: e.target.value});
    }

    onSubmit = (e) => {
        e.preventDefault();
        matchDares(this.state);
     //  this.postUnmatched(this.state);
     //  this.setState({}); //tömmer ej fälten som den ska
    }

    postUnmatched = (unmatched) => {
        const dare = postDare(unmatched, this.props.user.email);
        this.props.dispatch(dare);
    };

    render() {
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