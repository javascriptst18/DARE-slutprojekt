import React, { Component } from 'react';
import { connect } from 'react-redux';
import NewDare from './newDareForm';
import Upcoming from './upcomingDare';
import db from '../../firebase';


class Dares extends Component {

    componentDidMount() {
        //let current = db.collection('queue').doc(this.props.user.email).get();
        //this.setState({current: current});
        //firebaselistener
        //check if suspended
    }

    decline = () => {
        this.setState({current: false});
        //suspend user for a week. patch firebase
    }

    accept = (e) => {
        e.preventDefault();

    }

    render() {
       return  <NewDare checkCurrent={this.checkCurrent}/>

    }
}


export default connect(state => state)(Dares);