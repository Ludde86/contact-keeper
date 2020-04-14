import React, { useState, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';

// add and update contacts
const ContactForm = ({ current }) => {
	// bring in context, to call the methods and actions
	const contactContext = useContext(ContactContext);

	// useState since this is a form, we do need some component level state for each fields (name, email etc)
	const [ contact, setContact ] = useState({
		name: '',
		email: '',
		phone: '',
		type: 'personal'
	});

	// pull these values of state (contact)
	const { name, email, phone, type } = contact;
	const { addContact } = contactContext;

	const onSubmit = (e) => {
		e.preventDefault();
		addContact(contact);
		setContact({
			name: '',
			email: '',
			phone: '',
			type: 'personal'
		});
	};

	// fill in form based if there's anything in this current value
	// - we want this to run as soon as the form is created (mounted)
	// -> if the contactContext or current value is changed
	useEffect(
		() => {
			if (current !== null) {
				setContact(current);
			} else {
				setContact({
					name: '',
					email: '',
					phone: '',
					type: 'personal'
				});
			}
		},
		[ contactContext, current ]
	);

	return (
		<form onSubmit={onSubmit}>
			<h2>Add Contact</h2>
			<input
				type="text"
				name="name"
				placeholder="Name"
				value={name}
				onChange={(e) => setContact({ ...contact, [e.target.name]: e.target.value })}
			/>
			<input
				type="text"
				name="email"
				placeholder="Email"
				value={email}
				onChange={(e) => setContact({ ...contact, [e.target.name]: e.target.value })}
			/>
			<input
				type="text"
				name="phone"
				placeholder="Phone"
				value={phone}
				onChange={(e) => setContact({ ...contact, [e.target.name]: e.target.value })}
			/>
			<h5>
				<input
					type="radio"
					name="type"
					value="personal"
					checked={type === 'personal'}
					onChange={(e) => setContact({ ...contact, [e.target.name]: e.target.value })}
				/>Personal
				<input
					type="radio"
					name="type"
					value="professional"
					checked={type === 'professional'}
					onChange={(e) => setContact({ ...contact, [e.target.name]: e.target.value })}
				/>Professional
			</h5>
			<div>
				<input type="submit" value="Add Contact" className="btn" />
			</div>
		</form>
	);
};

export default ContactForm;
