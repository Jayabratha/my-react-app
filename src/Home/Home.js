import React, {Component} from 'react';
import './Home.css';
import { Link } from "react-router-dom";
import { Button } from 'antd';

export class Home extends Component {
    render() {
        return (
            <div className="welcome-page">
                <h1 className="welcome-msg">Thinking in <span className="react">React</span></h1>
                <Link to="/demos"><Button type="primary" size="large">Explore Demos</Button></Link>
            </div>
        )
    }
}