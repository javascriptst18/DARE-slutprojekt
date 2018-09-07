import React, { Component } from 'react';
import { connect } from 'react-redux';
import db, { firebase, provider } from '../firebase';


class UpcomingDare extends Component {


state = {
  location: [],
  budget: [],
  level: [],
  testQueue: [],
}

  componentDidMount() { 
    this.getUpcomingLocation(); // location
    this.getUpcomingBudget(); // budget
    this.getUpcomingLevel(); // level
    this.getTheQueue();

  }


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
  this.setState({testQueue: tempArr});
  console.log(this.state.testQueue);
})
}


// removePending = () => {
//   db.collection('queue').doc(this.props.user).delete().then(() => {
//     console.log(this.props.user);
//   })

// }


render() {

// const fromQueue = this.state.queue.map((queueInfo, index) =>{
// return <p key={index}>Din plats: {queueInfo}</p>
// });


// följande är orginalet -->

// const list = this.state.testQueue.map((item, index) => {
//   return <div key={index} className="">
//       <h2>Min pending Dare:</h2>
//       <p>Min registrerade Level: {item.level}</p>
//       <p>Min registrerade Budget: {item.budget}</p>
//       <p>Min registrerade Location: {item.location}</p>
//       <p>Min registrerade Tid: {item.timeStart} till kl: {item.timeEnd}</p>
//       <button onClick={this.removePending}> Remove pending Dare </button>
//     </div>
//   });

  const listQueue = this.state.testQueue.map(item => {
    return <div key={item.key} className="">
        <h2>Min pending Dare:</h2>
        <p>Min registrerade Level: {item.level}</p>
        <p>Min registrerade Budget: {item.budget}</p>
        <p>Min registrerade Location: {item.location}</p>
        <p>Min registrerade Tid: {item.timeStart} till kl: {item.timeEnd}</p>
        <button onClick={()=> db.collection('queue').doc(item.id).delete()}>Ta bort pending Dare</button>
      </div>
    });

return (
    <div className="upcoming-dare">
        <h2>Din utmaning</h2>
        <p> Din plats: { this.state.location } </p>
        <p> Din budget: { this.state.budget } </p>
        <p> Din level: { this.state.level } </p>
        <p> Vilka mer uppgifter ska vi ha? </p>
        {/* <p> Din budget: { for (let item of this.state.testQueue) {item.budget}} </p> */}
        <p> { listQueue } </p>
    </div>
    );

  }
}


export default  connect(state => state)(UpcomingDare);
