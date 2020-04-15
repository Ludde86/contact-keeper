import React, { useReducer } from 'react';
import authReducer from './authReducer';

const AuthState = (props) => {
	// init state
	// the token -> going to be stored in local storage
	// -> set the default, to access the browser's local storage
	// -> look for an item called token

	// isAuthenticated -> if logged on or not

	// loading -> before we fetch

	// our errors
	const initialState = {
		token: localStorage.get('token'),
		user: null,
		isAuthenticated: null,
		loading: true,
		error: null
	};

	// init reducer -> pass in authReducer and initState -> bring state and dispatch
	const [ state, dispatch ] = useReducer(initialState, authReducer);

	// load user -> checking which user is logged in
	// -> hit that endpoint and get that data

	// register user -> sign the user up -> get a token back

	// login user -> log the user in -> get the token

	// logout -> destroy the token -> clear everything up

	// clear errors - clears errors from the state

	return (
		<AuthContext.Provider
			value={{
				token: state.token,
				user: state.user,
				isAuthenticated: state.isAuthenticated,
				loading: state.loading,
				error: state.error
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};
