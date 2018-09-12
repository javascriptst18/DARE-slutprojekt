import React, { Component } from 'react';
import { connect } from 'react-redux';
import NewDare from './newDareForm';
import Upcoming from './upcomingDare';
import db from '../firebase';
import Test from './modal';
import Mapbox from './Mapbox';
import { suspendUser } from '../UserFunctions';



class Dares extends Component {

    componentDidMount() {
        //let current = db.collection('queue').doc(this.props.user.email).get();
        //this.setState({current: current});
        //firebaselistener
        //check if suspended
    }

    decline = () => {
        this.setState({ current: false });
        //suspend user for a week. patch firebase
        suspendUser(this.state.user.email);
    }

    accept = (e) => {
        e.preventDefault();
        
    }

    render() {
        if (!this.props.handleDare.current) {
            return (
                <NewDare checkCurrent={this.checkCurrent} />

            )
        } else if (this.props.handleDare.current) {
            return (
                <div>
                    <Upcoming />
                    <Mapbox />
                </div>
            );
        }
    }
}


export default connect(state => state)(Dares);
