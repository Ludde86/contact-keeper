import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

// inside of our props, we need to destructure, to take in a component
// -> set that to Component
// -> anything that is passed in = ...rest
// this is a standard way to create a private route in react
const PrivateRoute = ({ component: Component, ...rest }) => {
	const authContext = useContext(AuthContext);
	const { isAuthenticated } = authContext;
	return (
		<Route {...rest} render={(props) => (!isAuthenticated ? <Redirect to="/login" /> : <Component {...props} />)} />
	);
};

export default PrivateRoute;

// whenever we want a route that requires a valid user, we want to use a private Route
