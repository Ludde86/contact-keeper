// import useReducer so we get access to state and dispatch -> so we can dispatch to our reducer
// import uuid to generate a random id (for hardcoded data before we deal with our backend)
// import our contact context and contact reducer
// import types
import React, { useReducer } from 'react';
import { v4 as uuid } from 'uuid';
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
				email: 'ludde@email.com',
				phone: '123456',
				type: 'personal'
			},
			{
				id: 2,
				name: 'Gurra',
				email: 'gurra@email.com',
				phone: '234567',
				type: 'personal'
			},
			{
				id: 3,
				name: 'Carro',
				email: 'carro@email.com',
				phone: '345678',
				type: 'professional'
			}
		],
		current: null,
		filtered: null
	};

	// add filtered state as null
	// -> it gonna be a filtered array

	// create filter function
	// -> takes in text to filter
	// -> that text will be dispatched with FILTER_CONTACTS

	// create clear filter function
	// -> sets the array back to null

	// pull out the state and dispatch, from our reducer with useReducer
	// -> state allows us to access anything in the state
	// -> dispatch allows us to dispatch objects to the reducer
	const [ state, dispatch ] = useReducer(contactReducer, initialState);

	// all our actions

	// add contact
	const addContact = (contact) => {
		contact.id = uuid();
		dispatch({ type: ADD_CONTACT, payload: contact });
	};

	// delete contact
	// function takes the event id
	const deleteContact = (id) => {
		// we dispatch the action delete, and with the action we send the data (the event id)
		dispatch({ type: DELETE_CONTACT, payload: id });
	};

	// set current contact
	const setCurrentContact = (contact) => {
		dispatch({ type: SET_CURRENT, payload: contact });
	};

	// clear current contact
	const clearCurrentContact = () => {
		dispatch({ type: CLEAR_CURRENT });
	};

	// update contact
	const updateContact = (contact) => {
		dispatch({ type: UPDATE_CONTACT, payload: contact });
	};

	// filter contacts
	const filterContacts = (text) => {
		dispatch({ FILTER_CONTACTS, payload: text });
	};

	// clear filter
	const clearFilter = () => {
		dispatch({ CLEAR_FILTER });
	};

	// return our provider -> wrap our entire application with this context
	// -> value, anything we want to be able to access from other components, including state and actions
	return (
		<ContactContext.Provider
			value={{
				contacts: state.contacts,
				current: state.current,
				addContact,
				deleteContact,
				setCurrentContact,
				clearCurrentContact,
				updateContact
			}}
		>
			{props.children}
		</ContactContext.Provider>
	);
};

// -> in order to use this we need to wrap our app.js with this contact state component

// export
export default ContactState;
