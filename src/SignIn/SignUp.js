import React, { useState } from 'react';
import { Form, Input, Icon, Button } from 'antd';
import * as firebase from 'firebase/app';

import './SignIn.css';

export function SignUp(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    function showSignIn() {
        props.toggleSignInUp();
    }

    function handleSignUp(e) {
        e.preventDefault();
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div>
            <h1>Sign Up</h1>
            <Form onSubmit={handleSignUp} className="login-form">
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
                        autoComplete="new-password"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password" />
                </Form.Item>
                <Form.Item>
                    <Input.Password size="large"
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        value={confirmPassword}
                        autoComplete="new-password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm password" />
                </Form.Item>
                <Form.Item>
                    <Button size="large" type="primary" htmlType="submit" style={{ width: '100%', margin: '25px 0' }}>Sign Up</Button>
                </Form.Item>
            </Form>
            <div className="divider-wrapper">
                <div className="divider"></div>
                <div className="or">OR</div>
                <div className="divider"></div>
            </div>
            <Button size="large" type="secondary" onClick={showSignIn} style={{ width: '100%', margin: '50px 0' }}>Sign In</Button>
        </div>

    )
}