// pull in the contacts from the state
// -> map through them

// create a list and output a contact item for each one
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ContactContext from '../../context/contact/contactContext';

// bring in the contacts state
const ContactItem = ({ contact }) => {
	const contactContext = useContext(ContactContext);

	const { id, name, email, phone, type } = contact;

	// delete contact
	const onDelete = () => {
		// pass this event id (onClick is an event handler)
		contactContext.deleteContact(id);
	};

	// link up our context

	// call delete method

	// send it through the reducer

	return (
		<div className="card bg-light">
			<h3 className="text-primary text-left">
				{name}{' '}
				<span
					style={{ float: 'right' }}
					className={'badge ' + (type === 'professional' ? 'badge-success' : 'badge-primary')}
				>
					{type.charAt(0).toUpperCase() + type.slice(1)}
				</span>
			</h3>
			<ul className="list">
				{email && (
					<li>
						<i className="fas fa-envelope-open" /> {email}
					</li>
				)}
				{phone && (
					<li>
						<i className="fas fa-phone" /> {phone}
					</li>
				)}
			</ul>
			<p>
				<button className="btn btn-dark btn-sm">Edit</button>
				<button className="btn btn-danger btn-sm" onClick={onDelete}>
					Delete
				</button>
			</p>
		</div>
	);
};

ContactItem.propTypes = {
	contact: PropTypes.object.isRequired
};

export default ContactItem;
