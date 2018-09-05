import React, { Component } from 'react';
import { connect } from 'react-redux';
import db, { firebase, provider } from '../firebase';



class UpcomingDare extends Component {


  componentDidMount() {
    this.getUpcoming();  
    this.getUpcoming2();
    this.getUpcoming3();
  }

// behöver man (user)?
  getUpcoming3 = () => {
  db.collection('queue').get().then((response) => {
    let res = '';
    if (response.exists) {
      if (!('name' in response.data())) {
        res = 'empty user';
      } else {
        res = response.data();
      }
    }
    else {
      res = 'user doesnt exist';
    }
    return res;
  })
    .catch((error) => {
      console.log(error);
    });
}

// exempel:
getUpcoming2 = () => {
db.collection('queue').where('location', '==', 'Hel').get().then((snapshot) => {
  snapshot.docs.forEach(doc => {
    console.log(doc);
  })
})
}

getUpcoming = () => {
  db.collection('queue').get().then((snapshot) => {

  const queue = snapshot.docs.map(testDoc);
  console.log(queue);  
  })
  function testDoc(doc) {
    return {...doc.data()};
  }
  }

  render(){

     
return (
    <div className="upcoming-dare">
      <h2>Din utmaning</h2>
      <p>{}</p>
      <p>{}</p>   
    </div>
    );

  }
}


export default UpcomingDare;
