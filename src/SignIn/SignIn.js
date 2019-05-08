import React, { useState } from 'react';
import { Form, Input, Icon, Button, Alert } from 'antd';
import * as firebase from 'firebase/app';

import './SignIn.css';

export function SignIn(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signInProgress, setSignInProgress] = useState(false);
    const [showLoginError, setShowLoginError] = useState(false);

    function showSignUp() {
        props.toggleSignInUp()
    }

    function handleSignIn(e) {
        e.preventDefault();
        setSignInProgress(true);
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(function (response) {
                console.log(response);
                setSignInProgress(false);
            })
            .catch(function (error) {
                console.log(error);
                setShowLoginError(true);
                setSignInProgress(false);
            });
    }

    return (
        <div>
            <h1>Sign In</h1>
            <Form onSubmit={handleSignIn} className="login-form">
                <Form.Item>
                    <Input size="large"
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        value={email}
                        autoComplete="username"
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email id" />
                </Form.Item>
                <Form.Item>
                    <Input.Password size="large"
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        value={password}
                        autoComplete="current-password"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password" />
                </Form.Item>
                {showLoginError && <Alert
                    message="Sign In Failed!"
                    description="Incorrect Email or Password"
                    type="error"
                    closable
                    afterClose={() => setShowLoginError(false)}
                />}
                <Form.Item>
                    <Button size="large" type="primary" htmlType="submit" loading={signInProgress} style={{ width: '100%', margin: '25px 0' }}>Sign In</Button>
                </Form.Item>
            </Form>
            <div className="divider-wrapper">
                <div className="divider"></div>
                <div className="or">OR</div>
                <div className="divider"></div>
            </div>
            <Button size="large" type="secondary" onClick={showSignUp} style={{ width: '100%', margin: '50px 0' }}>Sign Up</Button>
        </div>

    )
}