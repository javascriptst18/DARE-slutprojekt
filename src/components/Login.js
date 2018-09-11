import React, { Component } from 'react';
import  { firebase, provider } from '../firebase';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actionCreators';



class LogIn extends Component {

    state = {
        user: '',
    }

    componentDidMount() {
        this.auth();
    }

    auth = () => {
        firebase.auth()
            .onAuthStateChanged(user => {

                if (user) {
                    this.setState({ user: user });
                    this.props.dispatch({ type: 'LOGIN', value: user });
                } else {
                    this.setState({ user: '' });
                }
            })
    }

    login = () => {
        console.log("log in")
        firebase.auth()
            .signInWithPopup(provider)
    }

    logout = () => {
        firebase.auth().signOut();
    }

    render() {
        return (
            <div>
                <button onClick={this.login} className="buttonStandard"> Login </button>
                
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        LogIn: user => dispatch(LogIn(user))
    }
}


export default connect(state => state)(LogIn);
