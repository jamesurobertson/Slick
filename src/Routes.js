import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const ProtectedRoute = ({ component: Component, path, currentUserId, exact }) => {
	return (
		<Route
			path={path}
			exact={exact}
			render={(props) => (currentUserId ? <Component {...props} /> : <Redirect to='/register' />)}
		/>
	);
};

export const AuthRoute = ({ component: Component, path, currentUserId, exact }) => {
	return (
		<Route
			path={path}
			exact={exact}
			render={(props) => (currentUserId ? <Redirect to='/' /> : <Component {...props} />)}
		/>
	);
};
