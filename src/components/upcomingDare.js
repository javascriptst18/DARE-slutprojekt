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
    this.getTheQueue();
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

getTheQueue = () => {
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

const list = this.state.testQueue.map((item, index) => {
  return <div key={index} className="">
  <h2>Min pending Dare:</h2>
    <p>Min registrerade Level: {item.level}</p>
    <p>Min registrerade Budget: {item.budget}</p>
    <p>Min registrerade Location: {item.location}</p>
    <p>Min registrerade Tid: {item.timeStart} till kl: {item.timeEnd}</p>
  </div>
})

return (
    <div className="upcoming-dare">
        {/* <p> Din budget: { for (let item of this.state.testQueue) {item.budget}} </p> */}
        <p> { list } </p>
    </div>
    );

  }
}


export default UpcomingDare;
