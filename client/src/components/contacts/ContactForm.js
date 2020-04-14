import React, { useState, useContext } from 'react';
import ContactContext from '../../context/contact/contactContext';

// add and update contacts
const ContactForm = () => {
	const contactContext = useContext(ContactContext);
	// bring in context, to call the methods and actions

	// useState since this is a form, we do need some component level state for each fields (name, email etc)
	const [ contact, setContact ] = useState({
		name: '',
		email: '',
		phone: '',
		type: 'personal'
	});

	// pull these values of state (contact)
	const { name, email, phone, type } = contact;

	const onSubmit = (e) => {
		e.preventDefault();
		contactContext.addContact(contact);
		setContact({
			name: '',
			email: '',
			phone: '',
			type: 'personal'
		});
	};

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
