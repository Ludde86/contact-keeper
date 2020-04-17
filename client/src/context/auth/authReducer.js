import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from '../types';

export default (state, action) => {
	switch (action.type) {
		case REGISTER_SUCCESS:
		case LOGIN_SUCCESS:
			// before return, put the token that we get back inside of local storage
			localStorage.setItem('token', action.payload.token);
			return {
				...state, // current state
				...action.payload, // put the token in state
				isAuthenticated: true,
				loading: false
			};
		case REGISTER_FAIL:
		case AUTH_ERROR:
		case LOGIN_FAIL:
		case LOGOUT:
			// remove the token from local storage
			localStorage.removeItem('token');
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: false,
				user: null,
				error: action.payload // put the error message in state
			};
		case USER_LOADED:
			return {
				...state,
				isAuthenticated: true,
				loading: false,
				user: action.payload
			};

		default:
			return state;
	}
};
