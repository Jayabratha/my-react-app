import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export function ProtectedRoute({ component: Component, auth, ...rest }) {
    return (
        <Route {...rest} render={(props) => {
            return auth
                ? <Component/>
                : <Redirect to="/" />
        }} ></Route>
    )

}