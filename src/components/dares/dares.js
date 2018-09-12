import React, { Component } from 'react';
import { connect } from 'react-redux';
import NewDare from './newDareForm';
import QueueDare from './queueDare';
import UserMatchedDare from './userMatchedDare';
import db from '../../firebase';
import { inQueue, userMatched, noDare } from '../actionCreators/dareActions';
import {
    NODARE, QUEUE, USERMATCH, MATCHEDPENDING, MATCHEDACCEPTED, STATUSFAILED,
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


    render() {
        if(!this.props.dareStatus.type){
            return(
                <NewDare checkCurrent={this.checkCurrent}/>
            )
        } else if (this.props.dareStatus.type === QUEUE) {
            return <QueueDare />
        } else if (this.props.dareStatus.type === USERMATCH) {
            return <UserMatchedDare />
        }
        else return <div>WHAAAAAT no sorry something went wrong</div>
    }
}

export default connect(state => state)(Dares);
