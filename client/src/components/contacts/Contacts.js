import React, { useContext, Fragment } from 'react';
import ContactContext from '../../context/contact/contactContext';

const Contacts = () => {
	// init our context
	// -> access to state and actions
	const contactContext = useContext(ContactContext);

	// pull out the state to use
	const { contacts } = contactContext;

	// map a list for each contact item
	return <Fragment>{contacts.map((contact) => <h3>{contact.name}</h3>)}</Fragment>;
};

export default Contacts;
