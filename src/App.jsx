import React from 'react';
import { connect } from 'react-redux'; //  for redux
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Dares from './components/dares/dares';
import Register from './components/Register';
import Start from './components/Start';
import UserSettings from './components/UserSettings';
import About from './components/About';
import info from './components/img/info.svg';
import daremaskmenu from './components/img/daremaskmenu.svg';
import logoutimg from './components/img/logoutimg.svg';
import settings from './components/img/settings.svg';
import firebase from 'firebase';
import { logout } from './components/actionCreators/userActions';



class App extends React.Component {

  logoutButton = () => {
    firebase.auth().signOut();
    this.logout({type: 'LOGOUT', value: ''})
  }

  logout = () => { this.props.dispatch(logout()) }

  render() {
    return (
      <div>
        {

          !this.props.user.email ?
            <Start />
            :
          this.props.user.email && !this.props.user.isRegistered ?
            <Register logout={this.logoutButton} />
            :
            <Router>
              <div className="mainContentDiv">

              <div className="menu">
              
                <Link to="/dares" className="menuLink"><img className="menuIcon"src={daremaskmenu} /></Link>
                <Link to="/about" className="menuLink"><img className="menuIcon"src={info} /></Link>
                <Link to="/settings" className="menuLink"><img className="menuIcon"src={settings} /></Link>
                <Link to="/settings" className="menuLink"><img className="menuIcon"src={logoutimg} onClick={this.logoutButton}/></Link>
               
              </div>  
                <Route exact path="/" component={Dares} />
                <Route path="/dares" component={Dares} />
                <Route path="/about" component={About} />
                <Route path="/settings" component={UserSettings} />
                <Route path="/logout" component={UserSettings} />

                
              </div>
            </Router>
        }
      </div>
    );
  }
}

export default connect(state => state)(App);
