import React, { useContext, Fragment } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
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
		return <h4>No Contacts Found</h4>;
	}

	// map a list for each contact item
	return (
		<Fragment>
			<TransitionGroup>
				{filtered !== null ? (
					filtered.map((contact) => (
						<CSSTransition key={contact.id} timeout={500} classNames="item">
							<ContactItem contact={contact} />
						</CSSTransition>
					))
				) : (
					contacts.map((contact) => (
						<CSSTransition key={contact.id} timeout={500} classNames="item">
							<ContactItem contact={contact} />
						</CSSTransition>
					))
				)}
			</TransitionGroup>
		</Fragment>
	);
};

export default Contacts;
