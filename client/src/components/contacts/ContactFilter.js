import React, { useContext, useRef, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactFilter = () => {
	const contactContext = useContext(ContactContext);

	// useRef -> a way to reference an DOM object
	// we-re not going to create a state for our filter input, we use a ref
	// in our form we add a ref attribute in input

	// init ref value (nothing by default)
	const text = useRef('');

	const { filtered, filterContacts, clearFilter } = contactContext;

	// useEffect
	// -> if the filter is null, the value should be empty
	useEffect(() => {
		if (filtered === null) {
			text.current.value = '';
		}
	});

	// in onChange we get the ref value of the current input
	const onFilterContacts = (e) => {
		if (text.current.value !== '') {
			filterContacts(e.target.value);
		} else {
			clearFilter();
		}
	};

	return (
		<form>
			<input ref={text} type="text" placeholder="Search Contacts..." onChange={onFilterContacts} />
			<button className="btn btn-light btn-block">Search Contacts</button>
		</form>
	);
};

export default ContactFilter;
