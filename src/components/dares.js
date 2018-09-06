import React, { Component } from 'react';
import { connect } from 'react-redux';
import NewDare from './newDareForm';
import Upcoming from './upcomingDare';

class Dares extends Component {
<<<<<<< HEAD
    state = {
        current:true,
    }
=======
>>>>>>> ade733dd2f7061a240e96bee80e2fbacdd1dab4b

    componentDidMount() {
        //db.collection
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
        if(!this.props.handleDare.current){
            return(
                <NewDare checkCurrent={this.checkCurrent}/>
            )
        } else if (this.props.handleDare.current) {
            return <Upcoming />
        }
    }
}


export default connect(state => state)(Dares);