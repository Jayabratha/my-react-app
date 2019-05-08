import React, { useState } from 'react';
import { Form, Input, Button, Icon } from 'antd';
import './Profile.css';

import * as firebase from 'firebase/app';

export function Profile(props) {
    const [displayName, setDisplayName] = useState(props.user.displayName);
    const [email, setEmail] = useState(props.user.email);
    const [phoneNumber, setPhoneNumber] = useState(props.user.phoneNumber);
    const [saveInProgress, setSaveInProgress] = useState(false);
    const [emailVerified, setEmailVerified] = useState(false);

    function updateProfile(e) {
        e.preventDefault();
        setSaveInProgress(true);
        var user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: displayName
        }).then(function (res) {
            // Update successful.
            props.profileUpdated({
                'displayName': displayName
            })
            setSaveInProgress(false);
        }).catch(function (error) {
            // An error happened.
            console.log("Error", error);
            setSaveInProgress(false);
        });
    }

    function verifyEmail() {
        var user = firebase.auth().currentUser;

        user.sendEmailVerification().then(function () {
            // Email sent.
            setEmailVerified(true);
        }).catch(function (error) {
            // An error happened.
        });
    }

    return (
        <div className="profile-page">
            <h1>Welcome!</h1>
            <h2>Your Profile Information</h2>
            <Form onSubmit={updateProfile} className="profile-form">
                <Form.Item label="Full name">
                    <Input type="text" size="large"
                        placeholder="Enter full name"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}></Input>
                </Form.Item>
                <Form.Item label="Email">
                    <Input type="email" size="large"
                        disabled
                        placeholder="Enter valid email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}></Input>
                    {!emailVerified
                        ? <Button type="primary" className="verify-button" onClick={verifyEmail}>Verify</Button>
                        : <Icon type="check-circle" className="verified-icon" theme="twoTone" twoToneColor="#52c41a" />
                    }
                </Form.Item>
                <Form.Item label="Phone">
                    <Input type="tel" size="large"
                        placeholder="Enter phone number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}></Input>
                </Form.Item>
                <Form.Item>
                    <Button size="large" type="primary" htmlType="submit" loading={saveInProgress} style={{ margin: '25px 0', minWidth: '100px' }}>Save</Button>
                </Form.Item>
            </Form>
        </div>
    )
}