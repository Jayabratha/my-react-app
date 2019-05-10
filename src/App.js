import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import { Avatar, Menu, Dropdown } from 'antd';

import { Home } from './Home/Home';
import { Profile } from './Profile/Profile';
import { ProtectedRoute } from './ProtectedRoute/ProtectedRoute';
import { Modal } from './Modal/Modal';
import { SignIn } from './SignIn/SignIn';
import { SignUp } from './SignIn/SignUp';

import Loadable from 'react-loadable';
import Loader from './Loader/Loader';

import * as firebase from 'firebase/app';
import "firebase/auth";

import logo from './logo.svg';
import './App.css';

const firebaseConfig = {
  apiKey: "AIzaSyCdBg_iSfGNRz_gZuAkLsT1FV0voVLMRxU",
  authDomain: "my-react-app-251b8.firebaseapp.com",
  databaseURL: "https://my-react-app-251b8.firebaseio.com",
  projectId: "my-react-app-251b8",
  storageBucket: "my-react-app-251b8.appspot.com",
  messagingSenderId: "372007547904"
};

const AsyncDemo = Loadable({
  loader: () => import("./Demos/Demos"),
  loading: Loader
});

firebase.initializeApp(firebaseConfig);

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      auth: false,
      showSignInUp: false,
      showSignIn: true,
      user: null,
      showMenu: false
    }

    firebase.auth().onAuthStateChanged((user) => {
      this.setState({
        auth: user ? true : false,
        user: user ? user : null
      });
    });

    console.log(firebase.auth());
  }

  logoutUser = () => {
    firebase.auth().signOut();
  }

  toggleMenu = () => {
    this.setState({
      showMenu: !this.state.showMenu
    })
  }

  toggleSignInModal = (e, close) => {
    console.log("test", close);
    this.setState({
      showSignInUp: close ? false : !this.state.showSignInUp,
      showSignIn: true
    });
  }

  toggleSignInSignUp = () => {
    this.setState({
      showSignIn: !this.state.showSignIn
    })
  }

  signInSuccess = () => {
    this.setState({
      showSignInUp: false
    });
  }

  handleProfileUpdate = (update) => {
    this.setState({
      user: { ...this.state.user, update }
    })
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
            <div className="logo-nav">
              <div className={(this.state.showMenu ? 'close ' : '') + 'menu-icon'} onClick={this.toggleMenu}>
              </div>
              <img src={logo} className="App-logo" alt="logo" />
              <nav className={this.state.showMenu ? 'show' : ''}>
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
                <button className="sign-in" onClick={this.toggleSignInModal}>
                  <span className="sign-in-text" >Sign in</span>
                  <Avatar icon="user" />
                </button>
                :
                <Dropdown overlay={menu} trigger={['click']} disabled={!this.state.auth}>
                  <div className="sign-in">
                    <div>{this.state.user.displayName}</div>
                    <Avatar icon="user" />
                  </div>
                </Dropdown>
              }
            </div>
          </header>
          <main>
            <div className="background-logo-wrapper"><img src={logo} className="background-logo" alt="logo" /></div>
            <Route path="/" exact component={Home} />
            <ProtectedRoute auth={this.state.auth} path="/demos"
              component={AsyncDemo} />
            <ProtectedRoute auth={this.state.auth} path="/profile"
              component={Profile} comProps={{
                user: this.state.user,
                profileUpdated: (update) => this.handleProfileUpdate(update)
              }} />
          </main>
        </Router>
        <div className="login-modal">
          {!this.state.auth &&
            <Modal show={this.state.showSignInUp} closeModal={(e) => this.toggleSignInModal(e, true)} >
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
