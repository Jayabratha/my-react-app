import React, { Component } from 'react';
import { Link } from "react-router-dom";

import logo from './logo.svg';
import { Home } from './Home/Home';
import { Demos } from './Demos/Demos';
import { Profile } from './Profile/Profile';
import { ProtectedRoute } from './ProtectedRoute/ProtectedRoute';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import { Avatar, Menu, Dropdown } from 'antd';
import { Modal } from './Modal/Modal';
import { SignIn } from './SignIn/SignIn';
import * as firebase from 'firebase/app';
import "firebase/auth";
import './App.css';
import { SignUp } from './SignIn/SignUp';

const firebaseConfig = {
  apiKey: "AIzaSyCdBg_iSfGNRz_gZuAkLsT1FV0voVLMRxU",
  authDomain: "my-react-app-251b8.firebaseapp.com",
  databaseURL: "https://my-react-app-251b8.firebaseio.com",
  projectId: "my-react-app-251b8",
  storageBucket: "my-react-app-251b8.appspot.com",
  messagingSenderId: "372007547904"
};

firebase.initializeApp(firebaseConfig);

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      auth: false,
      showSignInUp: false,
      showSignIn: true
    }

    firebase.auth().onAuthStateChanged((user) => {
      let auth = false;
      if (user) {
        // User is signed in.
        console.log(user);
        auth = true;
      } else {
        auth = false;
      }
      console.log(auth);
      this.setState({
        auth: auth
      });
    });
  }

  signIn = () => {
    this.toggleSignInModal();
  }

  logoutUser = () => {
    console.log('Sign Out');
    firebase.auth().signOut();
  }

  toggleSignInModal = () => {
    this.setState({
      showSignInUp: !this.state.showSignInUp
    })
  }

  toggleSignInSignUp = () => {
    this.setState({
      showSignIn: !this.state.showSignIn
    })
  }

  signInSuccess = () => {

  }

  render() {
    const menu = (
      <Menu>
        <Menu.Item key="0"><Link to="/profile">Profile</Link></Menu.Item>
        <Menu.Divider />
        <Menu.Item key="3" onClick={this.logoutUser}>Sign out</Menu.Item>
      </Menu>
    );

    return (
      <div className="App">
        <Router>
          <header className="App-header">
            <div>
              <img src={logo} className="App-logo" alt="logo" />
              <nav>
                <ul>
                  <li>
                    <NavLink exact activeClassName="selected" to="/">Home</NavLink>
                  </li>
                  <li>
                    <NavLink activeClassName="selected" to="/demos">Demos</NavLink>
                  </li>
                </ul>
              </nav>
            </div>
            <div>
              {!this.state.auth ?
                <button className="sign-in" onClick={this.signIn}>
                  <span className="sign-in-text" >Sign in</span>
                </button>
                :
                <div class="user-name">Welcome</div>
              }
              <Dropdown overlay={menu} trigger={['click']} disabled={!this.state.auth}>
                <Avatar icon="user" />
              </Dropdown>
            </div>
          </header>
          <main>
            <Route path="/" exact component={Home} />
            <ProtectedRoute auth={this.state.auth} path="/demos" component={Demos} />
            <ProtectedRoute auth={this.state.auth} path="/profile" component={Profile} />
            <div className="background-logo-wrapper"><img src={logo} className="background-logo" alt="logo" /></div>
          </main>
        </Router>
        <div className="login-modal">
          {!this.state.auth &&
            <Modal show={this.state.showSignInUp} closeModal={this.toggleSignInModal} >
              {
                this.state.showSignIn ? (
                  <SignIn toggleSignInUp={this.toggleSignInSignUp} signInSuccess={this.signInSuccess} />
                ) : (
                    <SignUp toggleSignInUp={this.toggleSignInSignUp} />
                  )
              }
            </Modal>}
        </div>
      </div>
    );
  }
}

export default App;
