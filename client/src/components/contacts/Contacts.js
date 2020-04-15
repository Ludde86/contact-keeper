import React, { useContext, Fragment } from 'react';
import ContactContext from '../../context/contact/contactContext';
import ContactItem from './ContactItem';

const Contacts = () => {
	// init our context
	// -> access to state and actions
	const contactContext = useContext(ContactContext);

	// pull out the state to use
	const { contacts, filtered } = contactContext;

	if (!contacts) {
		return <h4>No Contacts</h4>;
	}

	if (filtered !== null && filtered.length === 0) {
		return <h4>No Contacts</h4>;
	}

	// map a list for each contact item
	return (
		<Fragment>
			{filtered !== null ? (
				filtered.map((contact) => <ContactItem key={contact.id} contact={contact} />)
			) : (
				contacts.map((contact) => <ContactItem key={contact.id} contact={contact} />)
			)}
		</Fragment>
	);
};

export default Contacts;
