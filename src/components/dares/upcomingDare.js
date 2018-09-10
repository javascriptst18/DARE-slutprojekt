import React, { Component } from 'react';
import { connect } from 'react-redux';
import db, { firebase, provider } from '../../firebase';


class UpcomingDare extends Component {


state = {
  testQueue: []
}

  componentDidMount() { 
    this.getTheQueue();

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

removeDare = () => {

  db.collection('queue').doc(this.props.user.email).delete() 

}



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
        <button onClick={this.removeDare}> Ta bort PD </button>
      </div>
    });

return (
    <div className="upcoming-dare">
<<<<<<< HEAD:src/components/dares/upcomingDare.js
=======
        {/* <h2>Din utmaning</h2>
        <p> Din plats: { this.state.location } </p>
        <p> Din budget: { this.state.budget } </p>
        <p> Din level: { this.state.level } </p>
        <p> Vilka mer uppgifter ska vi ha? </p> */}
>>>>>>> upcoming-dare:src/components/upcomingDare.js
        {/* <p> Din budget: { for (let item of this.state.testQueue) {item.budget}} </p> */}
        <p> { listQueue } </p>
    </div>
    );

  }
}


export default  connect(state => state)(UpcomingDare);
