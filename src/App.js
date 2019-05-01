import React, { Component } from 'react';
import logo from './logo.svg';
import { Home } from './Home/Home';
import { Demos } from './Demos/Demos';
import { ProtectedRoute } from './ProtectedRoute/ProtectedRoute';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import { Avatar } from 'antd';
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
      modalContent: SignIn({
        testing: this.toggleSignInSignUp
      })
    }
  }

  showSignUp = true;

  toggleSignInModal = () => {
    this.setState({
      showSignInUp: !this.state.showSignInUp
    })
  }

  toggleSignInSignUp = () => {
    this.showSignUp = !this.showSignUp;
    const modalContent = this.showSignUp ? SignUp({testing: this.toggleSignInSignUp}) : SignIn({testing: this.toggleSignInSignUp});
    this.setState({
      modalContent: modalContent
    })
  }

  render() {
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
            <button className="sign-in" onClick={this.toggleSignInModal}>
              <span className="sign-in-text">Sign In</span>
              <Avatar icon="user" />
            </button>
          </header>
          <main>
            <Route path="/" exact component={Home} />
            <ProtectedRoute auth={this.state.auth} path="/demos" component={Demos} />
            <div className="background-logo-wrapper"><img src={logo} className="background-logo" alt="logo" /></div>
          </main>
        </Router>
        <div className="login-modal">
          <Modal show={this.state.showSignInUp} closeModal={this.toggleSignInModal} >
            {this.state.modalContent}
          </Modal>
        </div>
      </div>
    );
  }
}

export default App;
