import React, { Component } from 'react';
import { connect } from 'react-redux';
import NewDare from './newDareForm';
import UpcomingDare from './upcomingDare';
import db from '../../firebase';
import { inQueue } from '../actionCreators/dareActions';


class Dares extends Component {

    componentDidMount() {
        this.checkDaresDb();
    }

    checkDaresDb = () => {
        let current = {};
        db.collection('queue').doc(this.props.user.email).get()
        .then((documentSnapshot) => {
           if (documentSnapshot.exists) {
           current = documentSnapshot.data;
           console.log(current);
           this.props.dispatch(inQueue());
           return current;
           }
            else console.log('ingen dare i queue just nu')
            } );
        db.collection('userMatch').where('id1', '==', this.props.user.email).where('activity', '==', false).get()
        .then((documentSnapshot) => {
            if (documentSnapshot.exists) {
            return current = documentSnapshot.data;
            }
             else console.log('ingen dareMatch1 just nu')
             } );
        db.collection('userMatch').where('id2', '==', this.props.user.email).where('activity', '==', false).get()
        .then((documentSnapshot) => {
            if (documentSnapshot.exists) {
                return current = documentSnapshot.data;
            }
             else console.log('ingen dareMatch2 just nu')
            });
        
    }

    decline = () => {
        this.setState({current: false});
        //suspend user for a week. patch firebase
    }

    accept = (e) => {
        e.preventDefault();

    }

    render() {
        if(!this.props.handleDare.current){
            return(
                <NewDare checkCurrent={this.checkCurrent}/>
            )
        } else if (this.props.handleDare.current) {
            return <UpcomingDare />
        }
    }
}


export default connect(state => state)(Dares);