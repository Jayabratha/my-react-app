import React, { Component } from 'react';
import logo from './logo.svg';
import { Game } from './Game/Game';
import './App.css';
import { PlotHighLow } from './PlotHighLow/PlotHighLow';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <main>
          <div className="welcome-page">
            <h1 className="welcome-msg">Thinking in <span className="react">React</span></h1>
            <h2>Demos</h2>
            <div className="demo-wrapper">
              <h3>Find Highs and Low: ZestMoney Exercise</h3>
              <PlotHighLow />
            </div>
            <div className="demo-wrapper">
              <h3>Tic Tac Toe: A simple game from React tutorial</h3>
              <Game />
            </div>
            <div className="background-logo-wrapper"><img src={logo} className="background-logo" alt="logo" /></div>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
