// bring in types
import {
	ADD_CONTACT,
	DELETE_CONTACT,
	SET_CURRENT,
	CLEAR_CURRENT,
	UPDATE_CONTACT,
	FILTER_CONTACTS,
	CLEAR_FILTER
} from '../types';

// create our reducer function
// -> reducer takes in state and action
export default (state, action) => {
	switch (action.type) {
		case ADD_CONTACT:
			return {
				...state, // extend this state ->
				contacts: [ ...state.contacts, action.payload ] // -> and update with this new state
			};
		// if delete
		// the current state = ...state = contact array (that will be updated)
		// the updated state = new filtered contact array, the contacts that not match the event id will create a new contact array (without this event contact)
		case DELETE_CONTACT:
			return {
				...state,
				contacts: state.contacts.filter((contact) => contact.id !== action.payload)
			};
		case SET_CURRENT:
			return {
				...state,
				current: action.payload
			};
		case CLEAR_CURRENT:
			return {
				...state,
				current: null
			};
		case UPDATE_CONTACT:
			return {
				...state,
				contacts: state.contacts.map((contact) => (contact.id === action.payload.id ? action.payload : contact))
			};
		case FILTER_CONTACTS:
			return {
				...state,
				filtered: state.contacts.filter((contact) => {
					const regex = new RegExp(`${action.payload}`, 'gi');
					return contact.name.match(regex);
				})
			};
		case CLEAR_FILTER:
			return {
				...state,
				filtered: null
			};
		default:
			return state;
	}
};
