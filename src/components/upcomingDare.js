import React, { Component } from 'react';
import { connect } from 'react-redux';
import db, { firebase, provider } from '../firebase';



class UpcomingDare extends Component {

state = {
  queue: [],
  budget: []
}

  componentDidMount() {
    // this.getUpcoming();  
    this.getUpcoming2(); // location
    this.getUpcoming3(); // budget
    
  }




// collection fungerar om det är en användare som är sparad i docs.

getUpcoming2 = () => {
  db.collection('queue').get().then(collection => {
    const queue = collection.docs.map(doc => doc.data().location)
    this.setState({ queue })
    console.log(this.state.queue);
  })
}

getUpcoming3 = () => {
  db.collection('queue').get().then(collection => {
    const budget = collection.docs.map(doc => doc.data().budget)
    this.setState({ budget })
    console.log(this.state.budget);
  })
}


// where kan fungera för att få user-specifik info. -->

// getUpcoming = () => {
//   db.collection('queue').get().then((snapshot) => {

//   const queue = snapshot.docs.map(testDoc);
//   console.log(queue);  
//   })
//   function testDoc(doc) {
//     return {...doc.data()};
//   }
//   }


render() {

const fromQueue = this.state.queue.map((queueInfo, index) =>{
  return <p key={index}>Din plats: {queueInfo}</p>
});


return (
    <div className="upcoming-dare">
      <h2>Din utmaning</h2>
      
      { fromQueue }
      { this.state.queue }
      { this.state.budget }
     
     
    </div>
    );

  }
}


export default UpcomingDare;
