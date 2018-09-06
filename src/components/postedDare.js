import React, { Component } from 'react';
import db, { firebase, provider } from '../firebase';


class TestDare extends Component {

state = {
inQueue: false,
}

componentDidMount() {
    this.checkForQueue(); // Check for pending dares
}

checkForQueue = () => {
    db.collection('queue').doc('kajsamlindholm@gmail.com').get().then(doc => {
    if(!doc.exists) {
     this.setState({ inQueue: false });
     console.log('cant find queue.');
      } else {
        this.setState({ inQueue: true });
          console.log('queue exists');
      }
    
    }
     )}


checkIfQueueExists = () => {

    
db.collection('queue').get().then(doc => {
    if (docSnapshot.exists) {
      usersRef.onSnapshot((doc) => {
        
      });
    } else {
      usersRef.set({...}) // create the document
    }
});






}


export default TestDare;
