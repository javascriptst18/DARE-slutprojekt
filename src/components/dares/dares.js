import React, { Component } from 'react';
import { connect } from 'react-redux';
import NewDare from './newDareForm';
import UpcomingDare from './upcomingDare';


class Dares extends Component {

    componentDidMount() {
    
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