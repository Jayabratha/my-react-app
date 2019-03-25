import React from 'react';
import './PlotHighLow.css';

function findHighLow(array) {
    function check(item, index, array) {
        if ((item > array[index - 1] && item > array[index + 1])
            || (item < array[index - 1] && item < array[index + 1])) {
            return true;
        }
    }

    function recursiveFind(array, output, startIndex) {
        var arrayLength, halfLength, fHalf, diff, sHalf, output, lItem, fItem, pItem1, pItem2;

        arrayLength = array.length;
        lItem = array[arrayLength - 1];
        fItem = array[0];

        diff = Math.abs(lItem - fItem);

        if (diff !== arrayLength - 1) {
            halfLength = Math.floor(arrayLength / 2);
            fHalf = array.slice(0, halfLength);
            sHalf = array.slice(halfLength, arrayLength);

            pItem1 = fHalf[halfLength - 1];
            pItem2 = sHalf[0];

            if (check(pItem1, halfLength - 1, array)) {
                output.push(startIndex + (halfLength - 1));
            }

            if (check(pItem2, halfLength, array)) {
                output.push(startIndex + halfLength);
            }

            recursiveFind(fHalf, output, startIndex);
            recursiveFind(sHalf, output, startIndex + halfLength);
        }

        return output;

    }

    return recursiveFind(array, [], 0);

}

console.log(findHighLow([1, 2, 3, 4, 3, 2, 1, 2, 3, 2, 1, 1]));

export class PlotHighLow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
            outIndex: [],
            showOutput: false
        }
        this.handleUpdate = this.handleUpdate.bind(this);
        this.findIndex = this.findIndex.bind(this);
    }

    handleUpdate(event) {
        this.setState({ inputValue: event.target.value });
    }

    findIndex() {
        const arrayString = this.state.inputValue;
        const array = arrayString.split(',').map((value) => parseInt(value, 10));

        this.setState({
            outIndex: findHighLow(array).sort((a, b) => a - b),
            showOutput: true
        })
    }

    render() {
        const indexes = this.state.inputValue.split(',').map((value, index) => {
            const className = this.state.outIndex.indexOf(index) >= 0 ? "index marker" : "index";
            return (
                <div className={className} key={index}>{value}</div>
            )
        })
        return (
            <div className="high-low">
                <div className="start-input">
                    <input className="grid-length" placeholder="Enter List like (1, 2, 3)" type="string" value={this.state.inputValue} onChange={this.handleUpdate} ></input>
                    <button className="solid" onClick={this.findIndex}>Find Highs Lows</button>
                    {this.state.showOutput && (<div className="output">Output: {this.state.outIndex.length > 0 ? indexes : 'No Highs or Lows found'}</div>)}
                </div>
            </div>
        )
    }



}