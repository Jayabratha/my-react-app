import React from 'react';
import './Game.css';

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
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

// class Board extends React.Component {

//     renderSquare(i, j) {
//         const count = i * j;
//         return <Square key={count} value={this.props.squares[count]} onClick={() => this.props.onClick(count)} />
//     }

//     render() {
//         const rows = [];
//         for (let i = 1; i <= this.props.gridLength; i++) {
//             const squares = [];
//             for (let j = 1; j <= this.props.gridLength; j++) {
//                 squares.push(this.renderSquare(i, j));
//             }
//             rows.push(
//                 <div className="board-row" key={'row' + i} >
//                 {squares}
//                 </div>
//             )
//         }
//         return (
//             <div>
//                 <div className="board" style={{width : 100 * this.props.gridLength}}>
//                     {rows}
//                 </div>
//             </div>
//         )
//     }
// }

class Board extends React.Component {
    renderSquare(i) {
      return (
        <Square
          value={this.props.squares[i]}
          onClick={() => this.props.onClick(i)}
        />
      );
    }
  
    render() {
      return (
        <div className="board">
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  

export class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null)
            }],
            stepNumber: 0,
            inputValue: 3,
            gridLength: 0,
            xIsNext: true
        }
        this.handleUpdate = this.handleUpdate.bind(this);
        this.setGridLength = this.setGridLength.bind(this);
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        console.log(i);
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
        this.setState({ inputValue: event.target.value });
    }

    setGridLength() {
        this.setState({
            gridLength: this.state.inputValue,
            history: [{
                squares: Array(Math.pow(this.state.gridLength, 2)).fill(null)
            }]
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

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
                            </div>
                        </div>
                    ) : (
                            <div className="start-input">
                                <input className="grid-length" placeholder="Enter Grid length" type="number" readOnly value={this.state.inputValue} ></input>
                                <button className="solid start-game" onClick={this.setGridLength}>Start Game</button>
                            </div>
                        )
                }
            </div>
        )
    }
}