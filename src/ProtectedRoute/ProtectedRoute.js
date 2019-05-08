import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export function ProtectedRoute({ component: Component, comProps, auth, ...rest }) {
    return (
        <Route {...rest} render={(props) => {
            return auth
                ? <Component {...comProps}/>
                : <Redirect to="/" />
        }} ></Route>
    )

}