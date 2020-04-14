// import useReducer so we get access to state and dispatch -> so we can dispatch to our reducer
// import uuid to generate a random id (for hardcoded data before we deal with our backend)
// import our contact context and contact reducer
// import types
import React, { useReducer } from 'react';
import uuid from 'uuid';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
	ADD_CONTACT,
	DELETE_CONTACT,
	SET_CURRENT,
	CLEAR_CURRENT,
	UPDATE_CONTACT,
	FILTER_CONTACTS,
	CLEAR_FILTER
} from '../types';

// create hardcoded initial state
const ContactState = (props) => {
	const initialState = {
		contacts: [
			{
				id: 1,
				name: 'Ludde',
				amail: 'ludde@email.com',
				phone: '123456',
				type: 'personal'
			},
			{
				id: 2,
				name: 'Gurra',
				amail: 'gurra@email.com',
				phone: '234567',
				type: 'personal'
			},
			{
				id: 3,
				name: 'Carro',
				amail: 'carro@email.com',
				phone: '345678',
				type: 'professional'
			}
		]
	};
	// pull out the state and dispatch, from our reducer with useReducer
	// -> state allows us to access anything in the state
	// -> dispatch allows us to dispatch objects to the reducer
	const [ state, dispatch ] = useReducer(contactReducer, initialState);

	// all our actions

	// add contact

	// delete contact

	// set current contact

	// clear current contact

	// update contact

	// filter contacts

	// clear filter

	// return our provider -> wrap our entire application with this context
	// -> value, anything we want to be able to access from other components, including state and actions
	return (
		<ContactContext.Provider
			value={{
				contacts: state.contacts // state we brought in from the useReducer()
			}}
		>
			{props.children}
		</ContactContext.Provider>
	);
};

// -> in order to use this we need to wrap our app.js with this contact state component

// export
export default ContactState;
