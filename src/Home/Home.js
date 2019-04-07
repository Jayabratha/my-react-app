import React, {Component} from 'react';
import './Home.css';
import { Link } from "react-router-dom";

export class Home extends Component {
    render() {
        return (
            <div className="welcome-page">
                <h1 className="welcome-msg">Thinking in <span className="react">React</span></h1>
                <Link to="/demos"><button className="solid">Explore Demos</button></Link>
            </div>
        )
    }
}