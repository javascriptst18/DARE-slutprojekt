import React, { Component } from 'react';
import db, { firebase, provider } from '../firebase';
import UpcomingDare from './upcomingDare';


class TestDare extends Component {

state = {
inQueue: false,
};

componentDidMount() {
    this.checkForQueue(); // Check for pending dares
    
}

checkForQueue = () => {
    db.collection('queue').doc().get().then(doc => {
    if(!doc.exists){
     this.setState({inQueue: true});
     console.log('que exist');
     console.log(this.state.inQueue);
      } else {
        this.setState({inQueue: false});
        console.log('queue dont exist');
        console.log(this.state.inQueue);
      }
    
    }
     )}

render () {

    let showThis;

    if (this.state.inQueue){
        showThis = <UpcomingDare />

    } else {
        showThis = <p>NewDare</p>  // Update NewDare

    }

    return (<div>
            { showThis }
            </div>

    );

 }
}


export default TestDare;
