import React, { useState, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';

// add and update contacts
const ContactForm = () => {
	// bring in context, to call the methods and actions
	const contactContext = useContext(ContactContext);

	const { addContact, clearCurrentContact, updateContact, current } = contactContext;

	// useState since this is a form, we do need some component level state for each fields (name, email etc)
	const [ contact, setContact ] = useState({
		name: '',
		email: '',
		phone: '',
		type: 'personal'
	});

	// pull these values of state (contact)
	const { name, email, phone, type } = contact;

	// fill in form based if there's anything in this current state value
	// - we want this to run as soon as the form is created (mounted)
	// -> if the contactContext or current value is changed (ex when pressing edit button)
	// -> current state get updated, and the form values will show the contact we want to edit
	useEffect(
		() => {
			if (current) {
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

	const onSubmit = (e) => {
		e.preventDefault();
		if (!current) {
			addContact(contact);
		} else {
			updateContact(contact);
			clearCurrentContact();
		}

		setContact({
			name: '',
			email: '',
			phone: '',
			type: 'personal'
		});
	};

	const clearAll = () => {
		clearCurrentContact();
	};

	return (
		<form onSubmit={onSubmit}>
			<h2 className={current ? 'text-dark' : 'text-primary'}>{current ? 'Edit Contact' : 'Add Contact'}</h2>
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
				<input
					type="submit"
					value={current ? 'Update Contact' : 'Add Contact'}
					className={current ? 'btn btn-dark btn-block' : 'btn btn-primary btn-block'}
				/>
				{current && (
					<button className="btn btn-light btn-block" onClick={clearAll}>
						Back to Add Contact
					</button>
				)}
			</div>
		</form>
	);
};

export default ContactForm;
