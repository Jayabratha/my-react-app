import React from 'react';
import './Game.css';

function setWiningLines(gridLength) {
    const lines = [], dia1 = [], dia2 = [];

    for (let i = 0; i < gridLength; i++) {
        let rows = [], cols = [];
        for (let j = 0; j < gridLength; j++) {
            rows.push(i * gridLength + j);
            j === 0 ? cols.push(i) : cols.push(cols[j - 1] + gridLength);
        }
        lines.push(rows);
        lines.push(cols);
        dia1.push((i * gridLength) + i);
        dia2.push((i * gridLength + (gridLength - (i + 1))));
    }

    lines.push(dia1);
    lines.push(dia2);

    console.log(lines);

    return lines;
}

function calculateWinner(squares, lines) {
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        let lineLength = lines[i].length;
        for (let j = 1; j < lineLength; j++) {
            if (squares[line[j]] !== squares[line[j - 1]]) {
                break;
            } else if (j === lineLength - 1) {
                return squares[line[j]];
            }
        }
    }
    return null;
}

function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    )
}

class Board extends React.Component {

    renderSquare(i, j, gridLength) {
        const count = (i * gridLength) + j;
        return <Square key={count} value={this.props.squares[count]} onClick={() => this.props.onClick(count)} />
    }

    render() {
        const rows = [];
        for (let i = 0; i < this.props.gridLength; i++) {
            const squares = [];
            for (let j = 0; j < this.props.gridLength; j++) {
                squares.push(this.renderSquare(i, j, this.props.gridLength));
            }
            rows.push(
                <div className="board-row" key={'row' + i} >
                {squares}
                </div>
            )
        }
        return (
            <div>
                <div className="board" style={{width : 100 * this.props.gridLength}}>
                    {rows}
                </div>
            </div>
        )
    }
}
  

export class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: []
            }],
            stepNumber: 0,
            inputValue: '',
            gridLength: 0,
            xIsNext: true,
            winingLines: []
        }
        this.handleUpdate = this.handleUpdate.bind(this);
        this.setGridLength = this.setGridLength.bind(this);
        this.reset = this.reset.bind(this);
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares, this.state.winingLines) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            inputValue: 0,
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        })
    }

    handleUpdate(event) {
        this.setState({ 
            inputValue: event.target.value
         });
    }

    setGridLength() {
        const inputValue = parseInt(this.state.inputValue, 10);
        this.setState({
            gridLength: inputValue,
            history: [{
                squares: Array(Math.pow(inputValue, 2)).fill(null)
            }],
            winingLines: setWiningLines(inputValue)
        });
    }

    reset() {
        this.setState({
            inputValue: '',
            gridLength: 0,
            stepNumber: 0,
            xIsNext: true,
            winingLines: []
        }); 
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares, this.state.winingLines);

        const moves = history.map((squares, move) => {
            const desc = move ? "Go to move " + move : "Go to Start Game";
            return (
                <button key={move} className="step" onClick={() => this.jumpTo(move)}>{desc}</button>
            )
        });

        return (
            <div className="tic-tac-toe-game">
                {
                    this.state.gridLength ? (
                        <div className="game-wrapper">
                            <div className="game-board">
                                <Board gridLength={this.state.gridLength} squares={current.squares} onClick={(i) => this.handleClick(i)} />
                                <div className="next-step">
                                    {winner ? 'Winner: ' + winner : 'Next Player: ' + (this.state.xIsNext ? 'X' : 'O')}
                                </div>
                            </div>
                            <div className="time-travel">
                                {moves}
                                <button className="step" onClick={this.reset}>Reset</button>
                            </div>
                        </div>
                    ) : (
                            <div className="start-input">
                                <input className="grid-length" placeholder="Enter Grid length" type="number" value={this.state.inputValue} onChange={this.handleUpdate}></input>
                                <button className="solid start-game" onClick={this.setGridLength}>Start Game</button>
                            </div>
                        )
                }
            </div>
        )
    }
}