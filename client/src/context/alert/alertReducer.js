import { SET_ALERT, REMOVE_ALERT } from '../types';

const alertReducer = (state, action) => {
	switch (action.type) {
		case SET_ALERT:
			return {
				...state,
				alerts: action.patload
			};
		case REMOVE_ALERT:
			return {
				...state,
				alerts: []
			};
		default:
			return state;
	}
};

export default alertReducer;
