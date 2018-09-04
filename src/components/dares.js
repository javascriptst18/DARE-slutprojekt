import React, { Component } from 'react';
import { connect } from 'react-redux';
import NewDare from './newDareForm';
import Upcoming from './upcomingDare';

class Dares extends Component {
    state = {
        current:false,
    }

    componentDidMount() {
        //firebaselistener
        //check if suspended
    }

    decline = () => {
        this.setState({current: false});
        //suspend user for a week. patch firebase
    }

    accept = () => {
        this.setState({current: true})
    }

    render() {
        if(!this.state.current){
            return(
                <NewDare />
            )
        } else if (this.state.current) {
            return <Upcoming />
        }
    }
}

export default connect(state => state)(Dares);