import React, { useReducer } from 'react';
import { REGISTER_SUCCESS, REGISTER_FAIL, CLEAR_ERRORS } from '../types';
import axios from 'axios';
import authReducer from './authReducer';
import AuthContext from '../auth/authContext';

const AuthState = (props) => {
	// init state
	// the token -> going to be stored in local storage
	// -> set the default, to access the browser's local storage
	// -> look for an item called token

	// isAuthenticated -> if logged on or not

	// loading -> before we fetch

	// our errors
	const initialState = {
		token: localStorage.getItem('token'),
		user: null,
		isAuthenticated: null,
		loading: true,
		error: null
	};

	// init reducer -> pass in authReducer and initState -> bring state and dispatch
	const [ state, dispatch ] = useReducer(authReducer, initialState);

	// load user

	// register user
	// -> pass in the data from register form
	const registerUser = async (formData) => {
		// with axios we create a config object
		// -> when making a post request (sending data), we need that "content type header" of application json
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};
		try {
			// in package.json we set proxy http://localhost:5000, so we dont have to enter that for every request
			// -> the request url (-> user.js route) -> our form data (formData) -> the config
			const res = await axios.post('/api/users', formData, config);
			// -> if it goes ok -> dispatch REGISTER_SUCCESS with the payload (the token we get as a response)
			dispatch({
				type: REGISTER_SUCCESS,
				payload: res.data
			});
		} catch (error) {
			// if error -> dispatch REGISTER_FAIL
			// -> payload, the error response we get from user.js route
			dispatch({
				type: REGISTER_FAIL,
				payload: error.response.data.msg
			});
		}
	};

	// login user

	// logout

	// clear errors
	const clearErrors = () => {
		dispatch({
			type: CLEAR_ERRORS
		});
	};

	return (
		<AuthContext.Provider
			value={{
				token: state.token,
				user: state.user,
				isAuthenticated: state.isAuthenticated,
				loading: state.loading,
				error: state.error,
				registerUser
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthState;
