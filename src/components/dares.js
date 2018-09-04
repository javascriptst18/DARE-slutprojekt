import React, { Component } from 'react';
import { connect } from 'react-redux';
import NewDare from "./newDareForm";

class Dares extends Component {
    state = {
        current:false
    }

    componentDidMount() {
        //firebaselyssnare
    }

    render() {
        if(!this.state.current){
            return(
                <NewDare />
            )
        } else if (this.state.current) {
            return <h2>display upcoming dare</h2>
        }
    }
}

export default connect(state => state)(Dares);