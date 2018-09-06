import React, { Component } from 'react';
import  { firebase, provider } from '../firebase';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actionCreators';
<<<<<<< HEAD

=======
>>>>>>> ade733dd2f7061a240e96bee80e2fbacdd1dab4b

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
                <button onClick={this.login}> Login </button>
                <button onClick={this.logout}> Logout </button>
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
