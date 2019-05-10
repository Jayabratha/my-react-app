import React, { Component } from 'react';
import { Game } from '../Game/Game';
import { PlotHighLow } from '../PlotHighLow/PlotHighLow';

export default class Demos extends Component {
    componentWillMount() {
        console.log("Component will mount");
    }
    componentDidMount() {
        console.log("Demos Mounted");
    }
    componentWillUnmount() {
        console.log("Demos to be unmounted");
    }
    render() {
        return (
            <div className="demos">
                <h1>Demos</h1>
                <div className="demo-wrapper">
                    <h3>Find Highs and Low: ZestMoney Exercise</h3>
                    <PlotHighLow />
                </div>
                <div className="demo-wrapper">
                    <h3>Tic Tac Toe: A simple game from React tutorial</h3>
                    <Game />
                </div>
            </div>
        )
    }
}