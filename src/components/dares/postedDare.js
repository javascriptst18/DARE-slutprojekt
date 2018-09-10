import React, { Component } from 'react';
import { connect } from 'react-redux';
import db, { firebase, provider } from '../firebase';
import UpcomingDare from './upcomingDare';
import NewDare from './newDareForm';


class TestDare extends Component {

state = {
inQueue: false,
};

componentDidMount() {
    this.checkForQueue(); // Check for pending dares
    
}

checkForQueue = () => {
    db.collection('queue').doc(this.props.user.email).get().then(doc => {
    if(doc.exists){
     this.setState({inQueue: true});
     console.log('queue exist');
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
        showThis = <NewDare />

    }

    return (<div>
            { showThis }
            </div>

    );

 }
}


export default  connect(state => state)(TestDare);