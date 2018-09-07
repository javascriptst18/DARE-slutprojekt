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