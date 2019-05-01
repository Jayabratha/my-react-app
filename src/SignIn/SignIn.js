import React from 'react';
import { Form, Input, Icon, Button } from 'antd';
import './SignIn.css';

function handleSubmit() {

}

export function SignIn(props) {

    function showSignUp() {
        props.testing()
    }

    return (
        <div>
            <h1>Sign In</h1>
            <Form onSubmit={handleSubmit} className="login-form">
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
                    <Button size="large" type="primary" style={{ width: '100%', margin: '25px 0' }}>Sign In</Button>
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