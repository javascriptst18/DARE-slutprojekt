import React, { Component } from 'react';
import { connect } from 'react-redux';
import NewDare from './newDareForm';
import UpcomingDare from './upcomingDare';


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
<<<<<<< HEAD:src/components/dares/dares.js
       return  <NewDare checkCurrent={this.checkCurrent}/>

=======
        if(!this.props.handleDare.current){
            return(
                <NewDare checkCurrent={this.checkCurrent}/>
            )
        } else if (this.props.handleDare.current) {
            return <UpcomingDare />
        }
>>>>>>> upcoming-dare:src/components/dares.js
    }
}


export default connect(state => state)(Dares);