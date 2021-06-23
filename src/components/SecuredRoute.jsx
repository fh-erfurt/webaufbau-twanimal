import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import { authenticationService } from '../services/authenticationService'

export const SecuredRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => {
        const authenticated = authenticationService.isAuthenticated()
        if(authenticated) return <Component {...props} />
        return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    }} />
)