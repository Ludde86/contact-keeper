// import useReducer so we get access to state and dispatch -> so we can dispatch to our reducer
// import uuid to generate a random id (for hardcoded data before we deal with our backend)
// import our contact context and contact reducer
// import types
import React, { useReducer } from 'react';
import axios from 'axios';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
	ADD_CONTACT,
	DELETE_CONTACT,
	GET_CONTACTS,
	CLEAR_CONTACTS,
	SET_CURRENT,
	CLEAR_CURRENT,
	UPDATE_CONTACT,
	FILTER_CONTACTS,
	CLEAR_FILTER,
	CONTACT_ERROR
} from '../types';

// create hardcoded initial state
const ContactState = (props) => {
	const initialState = {
		contacts: null,
		current: null,
		filtered: null,
		error: null
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

	// add contact
	const addContact = async (contact) => {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};
		try {
			const res = await axios.post('/api/contacts', contact, config);
			dispatch({ type: ADD_CONTACT, payload: res.data });
		} catch (error) {
			dispatch({
				type: CONTACT_ERROR,
				payload: error.response.data.msg
			});
		}
	};

	// get contacts
	const getContacts = async () => {
		try {
			const res = await axios.get('/api/contacts');
			dispatch({
				type: GET_CONTACTS,
				payload: res.data
			});
		} catch (error) {
			dispatch({
				type: CONTACT_ERROR,
				payload: error.response.data.msg
			});
		}
	};

	// clear contacts
	const clearContacts = () => {
		dispatch({
			type: CLEAR_CONTACTS
		});
	};

	// delete contact
	// function takes the event id
	const deleteContact = async (id) => {
		// we dispatch the action delete, and with the action we send the data (the event id)
		try {
			await axios.delete(`/api/contacts/${id}`);
			dispatch({ type: DELETE_CONTACT, payload: id });
		} catch (error) {
			dispatch({
				type: CONTACT_ERROR,
				payload: error.response.data.msg
			});
		}
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
		dispatch({ type: FILTER_CONTACTS, payload: text });
	};

	// clear filter
	const clearFilter = () => {
		dispatch({ type: CLEAR_FILTER });
	};

	// return our provider -> wrap our entire application with this context
	// -> value, anything we want to be able to access from other components, including state and actions
	return (
		<ContactContext.Provider
			value={{
				contacts: state.contacts,
				current: state.current,
				filtered: state.filtered,
				error: state.error,
				addContact,
				getContacts,
				clearContacts,
				deleteContact,
				setCurrentContact,
				clearCurrentContact,
				updateContact,
				filterContacts,
				clearFilter
			}}
		>
			{props.children}
		</ContactContext.Provider>
	);
};

// -> in order to use this we need to wrap our app.js with this contact state component

// export
export default ContactState;
