import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postDare, postUserMatch, postPendingDare } from '../actionCreators/dareActions';
import db from '../../firebase';


class NewDare extends Component {
    state = {
        location: this.props.userSettings.location, 
        date: '',
        timeStart: '00:00',
        timeEnd: '23:59',
        budget: 0,
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
                  location: myDare.location,
                  level: myDare.level
                };
                console.log(matched);
                // if not matched with activity!! 
                }
            }            
        })
        .then(() => {
            db.collection('queue')
            .doc(matched.id1).delete()
            .then(() => {
                console.log('deleted matched dare from queue')})
        })
        .then(() => {
            if(!matched) this.postUnmatched(myDare) //inte kontrollerat att detta funkar!!!!
            else this.getActivityMatch(matched); //kolla först om vi får aktivitet för att kunna lägga till egenskap activity: bool på userMatch
        })
        .then(() => {
            if (this.props.handleDare.type === 'PENDINGDARE'){
                matched.activity = true;
                this.props.dispatch(postUserMatch(matched));
            }
            else if (matched) {
                matched.activity = false;
                this.props.dispatch(postUserMatch(matched));
            }
        });
      }
    
    getActivityMatch = (userMatch) => {
       this.weekdayFromTime(userMatch.starts);
        let tempArr = [];//will hold activities
       //needs some kind of matching thingy for time as well
        db.collection('activity') 
            .where('level', '==', userMatch.level)
            .where('cost', '<=', userMatch.cost) //parseInt() på det som hämtas på db? eller utgå från att db är rätt formaterad?
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
                        userMatchId: `${userMatch.id1}&${userMatch.id2}`,
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