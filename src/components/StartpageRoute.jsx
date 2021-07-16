import React from 'react';
import { Route } from 'react-router-dom';
import { authenticationService } from '../services/authenticationService';
import Startpage from '../routes/Startpage';

/**
 * Route, welche entsprechend des aktuellen Login-Status einen Nutzer entweder zur
 * Home-Timeline weiter leitet oder zur Startseite mit Login/Registrierung.
 */
export const StartpageRoute = ({ component: Component, ...rest }) => (
	<Route
		{...rest}
		render={(props) => {
			const authenticated = authenticationService.isAuthenticated();
			if (authenticated) return <Component {...props} />;
			return <Startpage />;
		}}
	/>
);
