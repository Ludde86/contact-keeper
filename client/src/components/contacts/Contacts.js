import React, { useContext, Fragment } from 'react';
import ContactContext from '../../context/contact/contactContext';
import ContactItem from './ContactItem';

const Contacts = () => {
	// init our context
	// -> access to state and actions
	const contactContext = useContext(ContactContext);

	// pull out the state to use
	const { contacts } = contactContext;

	// map a list for each contact item
	return <Fragment>{contacts.map((contact) => <ContactItem key={contact.id} contact={contact} />)}</Fragment>;
};

export default Contacts;
