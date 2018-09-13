import React from 'react';
import { connect } from 'react-redux'; //  for redux
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Dares from './components/dares/dares';
import Register from './components/Register';
import Logout from './components/Logout';
import Start from './components/Start';
import UserSettings from './components/UserSettings';
import About from './components/About';
import info from './components/img/info.svg';
import daremaskmenu from './components/img/daremaskmenu.svg';
import logout from './components/img/logout.svg';
import settings from './components/img/settings.svg';



class App extends React.Component {
  render() {
    return (
      <div>
        {

          !this.props.user.email ?
            <Start />
            :
          this.props.user.email && !this.props.user.isRegistered ?
            <Register />
            :
            <Router>
              <div className="mainContentDiv">

              <div className="menu">
                <Link to="/about" className="menuLink"><img className="menuIcon"src={daremaskmenu} /></Link>
                <Link to="/dares" className="menuLink"><img className="menuIcon"src={info} /></Link>
                <Link to="/settings" className="menuLink"><img className="menuIcon"src={settings} /></Link>
                <Link to="/settings" className="menuLink"><img className="menuIcon"src={logout} /></Link>
               
              </div>  

                <Route path="/dares" component={Dares} />
                <Route path="/about" component={About} />
                <Route path="/settings" component={UserSettings} />

                <Logout />
              </div>
            </Router>
        }
      </div>
    );
  }
}

export default connect(state => state)(App);
