import React, { Component } from 'react';
import { connect } from 'react-redux';
import NewDare from './newDareForm';
import QueueDare from './queueDare';
import UserMatchedDare from './userMatchedDare';
import PendingDare from './pendingDare';
import db from '../../firebase';
import { inQueue, userMatched, noDare } from '../actionCreators/dareActions';
import {
    QUEUE, USERMATCH, MATCHEDPENDING, MATCHEDACCEPTED, STATUSFAILED,
  } from '../constants';


class Dares extends Component {

    componentDidMount() {
        this.checkDB();
    }

    checkDB = () => {
        let current;
        this.checkQueueDb(current);
        this.checkMatchDb('userMatch', 'id1', current);
        this.checkMatchDb('userMatch', 'id2', current);
        if (!current) this.props.dispatch(noDare());
    }

    checkQueueDb = (current) => {
        db.collection('queue').doc(this.props.user.email)
        .get()
        .then(response => {
            if (response.exists){
            current = response.data();
            console.log(current);
             this.props.dispatch(inQueue(current))
            } 
        })
    }

    checkMatchDb = (collection, id, current) => {
        let tempArr = [];
        db.collection(collection).where(id, '==', this.props.user.email)
        .get()
        .then(result => { 
            result.forEach((doc) => {
                let newData = doc.data();
                newData.id = doc.id;
                tempArr.push(newData);
                console.log(tempArr);
                current = tempArr[0];
                }) 
        })
        .then(() => {
            if (current){
            console.log(current);
             this.props.dispatch(userMatched(current))
            }
        });
    }

//!this.props.dareStatus.type real condition for newdare
    render() {
        if(true){
            return(
                <NewDare checkCurrent={this.checkCurrent}/>
            )
        } else if (this.props.dareStatus.type === QUEUE) {
            return <QueueDare />
        } else if (this.props.dareStatus.type === USERMATCH) {
            return <UserMatchedDare />
        } else if (this.props.dareStatus.type === MATCHEDPENDING) {
            return <PendingDare />
        }
        else return <h2>Oooops, nåt gick fel.</h2>
    }
}

export default connect(state => state)(Dares);
