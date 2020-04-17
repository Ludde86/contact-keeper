import React, { useContext, Fragment, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContactContext from '../../context/contact/contactContext';
import ContactItem from './ContactItem';
import Spinner from '../layout/Spinner';

const Contacts = () => {
	// init our context
	// -> access to state and actions
	const contactContext = useContext(ContactContext);

	// pull out the state to use
	const { contacts, filtered, loading, getContacts } = contactContext;

	useEffect(() => {
		getContacts();
		// eslint-disable-next-line
	}, []);

	if (contacts.length === 0) {
		return <h4>No Contacts</h4>;
	}

	if (filtered !== null && filtered.length === 0) {
		return <h4>No Contacts Found</h4>;
	}

	// map a list for each contact item
	return (
		<Fragment>
			{contacts !== null && !loading ? (
				<TransitionGroup>
					{filtered !== null ? (
						filtered.map((contact) => (
							<CSSTransition key={contact._id} timeout={500} classNames="item">
								<ContactItem contact={contact} />
							</CSSTransition>
						))
					) : (
						contacts.map((contact) => (
							<CSSTransition key={contact._id} timeout={500} classNames="item">
								<ContactItem contact={contact} />
							</CSSTransition>
						))
					)}
				</TransitionGroup>
			) : (
				<Spinner />
			)}
		</Fragment>
	);
};

export default Contacts;
