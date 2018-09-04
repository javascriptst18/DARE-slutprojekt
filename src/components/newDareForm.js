import React, { Component } from 'react';
import { connect } from 'react-redux';

class NewDare extends Component {
    state = {
        place: '',
        radius:0,
        date: 0,
        budget: 0,
        level: 2, //needs some kind of explanation in UI
    }

    onChange = (e) => {
        e.preventDefault();
        this.setState({[e.target.id]: e.target.value});
    }

    render() {
        return(
            <form> 
                <label htmlFor="level">Chicken or DAREDevil? 
                    <input 
                    type="range" 
                    min="1" 
                    max="3" 
                    value={this.state.daredevil} 
                    className="slider" 
                    id="level"
                    onChange={this.onChange}
                /> 
                </label>
                <label htmlFor="place">Plats
                    <input 
                    type="text"
                    value={this.state.place}
                    onChange={this.onChange}/>
                </label>
                <label htmlFor="">Jag vill ha en aktivitet inom 
                    <input 
                    type="number"
                    id="radius"
                    value={this.state.radius}
                    onChange={this.onChange}/>
                km
                </label>
            
            </form>
        )
    }
}

export default connect(state => state)(NewDare);