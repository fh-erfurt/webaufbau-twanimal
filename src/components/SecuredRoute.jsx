import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { authenticationService } from '../services/authenticationService';

/**
 * Gesicherte Route, welche nur aufgerufen werden darf, wenn man angemeldet ist.
 * Sollte man nicht angemeldet sein, so wird man zum Login weitergeleitet.
 */
export const SecuredRoute = ({ component: Component, ...rest }) => (
	<Route
		{...rest}
		render={(props) => {
			const authenticated = authenticationService.isAuthenticated();
			if (authenticated) return <Component {...props} />;
			return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />;
		}}
	/>
);
