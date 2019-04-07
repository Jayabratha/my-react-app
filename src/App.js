import React, { Component } from 'react';
import logo from './logo.svg';
import { Home } from './Home/Home';
import { Demos } from './Demos/Demos';
import { ProtectedRoute } from './ProtectedRoute/ProtectedRoute';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      auth: true
    }
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
          </header>
          <main>
            <Route path="/" exact component={Home} />
            <ProtectedRoute auth={this.state.auth} path="/demos" component={Demos} />
            <div className="background-logo-wrapper"><img src={logo} className="background-logo" alt="logo" /></div>
          </main>
        </Router>
      </div>
    );
  }
}

export default App;
