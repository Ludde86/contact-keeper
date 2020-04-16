import { useReducer } from 'react';
import AlertContext from './alertContext';
import alertReducer from './alertReducer';
import { v4 as uuid } from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from '../types';

const AlertState = (props) => {
	// use array as the state
	// -> object have a message and a type
	const initialState = [];

	const [ state, dispatch ] = useReducer(initialState, alertReducer);

	// set alert
	// -> generate a random id
	// -> dispatch -> payload will have a msg, type and id
	// the alert will remove in a timeout
	const setAlert = (msg, type, timeout = 5000) => {
		const id = v4();
		dispatch({
			type: SET_ALERT,
			payload: { msg, type, id }
		});
		setTimeout(() => {
			dispatch({ type: REMOVE_ALERT, payload: id });
		}, timeout);
	};

	return (
		<AlertContext.Provider
			value={{
				alerts: state,
				setAlert
			}}
		>
			{props.children}
		</AlertContext.Provider>
	);
};

export default AlertState;
