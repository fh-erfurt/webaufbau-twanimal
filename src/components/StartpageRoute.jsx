import React from 'react';
import { Route } from 'react-router-dom';
import { authenticationService } from '../services/authenticationService';
import Startpage from '../routes/Startpage';

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
