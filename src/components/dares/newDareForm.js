import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postDare, postUserMatch } from '../actionCreators/dareActions';
import db from '../../firebase';


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
            const start = this.stringsToDate(this.state.date, this.state.timeStart);
            const end = this.stringsToDate(this.state.date, this.state.timeEnd); 
            this.setState({ start: start, end: end, [e.target.id]: e.target.value });
        }
        else this.setState({[e.target.id]: e.target.value});
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.getUserMatch(this.state, this.props.user.email);
     //  this.postUnmatched(this.state);
     //  this.setState({}); //tömmer ej fälten som den ska
    }
    
    getUserMatch = (myDare, email) => {
        let matched;
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
            for (let i = 0; i < tempArr.length; i++) {
            if (!matched && myDare.start < tempArr[i].end && tempArr[i].id !== email) {
                console.log('tiden funkar!!')
                const budget = Math.min(tempArr[i].budget, myDare.budget);
                const timeStart = Math.max(tempArr[i].start, myDare.start);
                const timeEnd = Math.min(tempArr[i].end, myDare.end);
                 matched = {
                  date: myDare.date,
                  id1: tempArr[i].id,
                  id2: email,
                  cost: budget,
                  starts: timeStart,
                  ends: timeEnd,
                };
                console.log(matched);
                // if not matched with activity!! this.props.dispatch(postUserMatch(matched));
                db.collection('queue')
                    .doc(matched.id1).delete()
                    .then(() => {console.log('deleted matched dare from queue')})
                }
            }
            if(!matched) this.postUnmatched(myDare) //inte kontrollerat att detta funkar!!!!
            
        })
      }
    
    
    
    postUnmatched = (unmatched) => {
        const dare = postDare(unmatched, this.props.user.email);
        this.props.dispatch(dare);
    };

    stringsToDate = (date, time) => {
        const fullstring = `${date}T${time}:00+01:00`;
        return date = new Date(fullstring).getTime();
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