import React, { Component } from 'react';
import { connect } from 'react-redux';
import NewDare from './newDareForm';
import QueueDare from './queueDare';
import db from '../../firebase';
import { inQueue, userMatched, activity, noActivity } from '../actionCreators/dareActions';


class Dares extends Component {

    componentDidMount() {
        this.checkDB();
    }

    checkDB = () => {
        let current;
        this.checkQueueDb(current);
        this.checkMatchDb('userMatch', 'id1', this.props.user.email);
        this.checkMatchDb('userMatch', 'id2', this.props.user.email);
        if (!current) this.props.dispatch(noActivity());
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

    checkMatchDb = (collection, id) => {
        db.collection(collection).where(id, '==', this.props.user.email)
        .get()
        .then(response => {
            if (response.exists){
            let myDare = response.data();
            myDare.id = response.id;
             this.props.dispatch(userMatched(myDare))
            } else console.log('blööööööööh')
        })
    }

    render() {
        if(!this.props.dareStatus.type){
            return(
                <NewDare checkCurrent={this.checkCurrent}/>
            )
        } else if (this.props.dareStatus.type === 'QUEUE') {
            return <QueueDare />
        } else if (typeof this.props.dareStatus.type === 'MATCHED-PENDING') {
            return <div> There's an activity coming up </div>
        }
        else return <div>WHAAAAAT no sorry something went wrong</div>
    }
}


export default connect(state => state)(Dares);