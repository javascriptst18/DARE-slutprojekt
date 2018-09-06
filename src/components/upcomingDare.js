import React, { Component } from 'react';
import { connect } from 'react-redux';
import db, { firebase, provider } from '../firebase';



class UpcomingDare extends Component {

state = {
  location: [],
  budget: [],
  level: [],
  testQueue: []
}

  componentDidMount() { 
    this.getUpcomingLocation(); // location
    this.getUpcomingBudget(); // budget
    this.getUpcomingLevel(); // level
    this.getTheQ();
    
  }

// collection fungerar om det är en användare som är sparad i docs.

getUpcomingLocation = () => {
  db.collection('queue').get().then(collection => {
    const location = collection.docs.map(doc => doc.data().location)
    this.setState({ location })
    console.log(this.state.location);
  })
}

getUpcomingBudget = () => {
  db.collection('queue').get().then(collection => {
    const budget = collection.docs.map(doc => doc.data().budget)
    this.setState({ budget })
    console.log(this.state.budget);
  })
}

getUpcomingLevel = () => {
  db.collection('queue').get().then(collection => {
    const level = collection.docs.map(doc => doc.data().level)
    this.setState({ level })
    console.log(this.state.level);
  })
}

getTheQ = () => {
const tempArr = [];
db.collection('queue').onSnapshot(querySnapshot => {
  querySnapshot.forEach(doc => {
    let newData = doc.data()
    newData.id = doc.id;
    tempArr.push(newData);
  });
  this.setState({testQueue: tempArr}); // använda för mappa igenom och skriva ut?
  console.log(this.state.testQueue);
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

// const fromQueue = this.state.queue.map((queueInfo, index) =>{
// return <p key={index}>Din plats: {queueInfo}</p>
// });


return (
    <div className="upcoming-dare">
      <h2>Din utmaning</h2>
      <p> Din plats: { this.state.location } </p>
      <p> Din budget: { this.state.budget } </p>
      <p> Din level: { this.state.level } </p>
      <p> Vilka mer uppgifter ska vi ha? </p>
      {/* <p> Din budget: { for (let item of this.state.testQueue) {item.budget}} </p> */}

    </div>
    );

  }
}


export default UpcomingDare;
