import React, { useState } from 'react';
import { Form, Input, Icon, Button } from 'antd';
import * as firebase from 'firebase/app';
import './SignIn.css';

export function SignUp(props) {

    function showSignIn() {
        props.testing();
    }

    function handleSignUp(email, password) {
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
            // var errorCode = error.code;
            // var errorMessage = error.message;
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
                        placeholder="Enter email id" />
                </Form.Item>
                <Form.Item>
                    <Input.Password size="large"
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Enter password" />
                </Form.Item>
                <Form.Item>
                    <Input.Password size="large"
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Confirm password" />
                </Form.Item>
                <Form.Item>
                    <Button size="large" type="primary" style={{ width: '100%', margin: '25px 0' }} onClick={handleSignUp}>Sign Up</Button>
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