import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postDare } from '../actionCreators';

class NewDare extends Component {
    state = {
        place: '', //håller bara en bokstav åt gången
        radius:0,
        date: '',
        timeStart: '',
        timeEnd: '',
        duration: 0,
        budget: 0,
        level: 2, //needs some kind of explanation in UI
    }

    onChange = (e) => {
        e.preventDefault();
        this.setState({[e.target.id]: e.target.value});
    }

    onSubmit = (e) => {
        e.preventDefault();
        const dare = this.state;
        this.props.dispatch(postDare(dare));
    }


    render() {
        return(
            <form onSubmit={this.onSubmit}> 
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
                <label htmlFor="place">
                    Plats
                    <input 
                    type="text"
                    value={this.state.place}
                    onChange={this.onChange}/>
                </label>
                <label htmlFor="">
                    Jag vill ha en aktivitet inom 
                    <input 
                    type="number"
                    id="radius"
                    value={this.state.radius}
                    onChange={this.onChange}/>
                    km
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