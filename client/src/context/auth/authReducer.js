import { REGISTER_SUCCESS, REGISTER_FAIL } from '../types';

export default (state, action) => {
	switch (action.type) {
		case REGISTER_SUCCESS:
			// before return, put the token that we get back inside of local storage
			localStorage.setItem('token', action.payload.token);
			return {
				...state, // current state
				...action.payload, // put the token in state
				isAuthenticated: true,
				loading: false
			};
		case REGISTER_FAIL:
			// remove the token from local storage
			localStorage.removeItem('token');
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: true,
				user: null,
				error: action.payload // put the error message in state
			};
		default:
			return state;
	}
};
