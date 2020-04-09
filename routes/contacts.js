// here we gonna have four routes
// -> the CRUD methods

const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const Contact = require('../models/Contact');
const auth = require('../middleware/auth');

// @route   GET api/contacts
// @desc    Get all users contacts
// @access  Private
router.get('/', auth, async (req, res) => {
	// res.send('Get all contacts');

	// -> in try/catch pull from database with the find method
	// -> we will use the user field (in contacts) to get all users (contacts)
	// -> this user field have an object id, so use this
	// -> whit the auth middleware we have access to that request.user object
	// -> find where user matches the request, and sort by date (-1 = most recent)
	try {
		const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 });

		// return this array in json format
		res.json(contacts);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server Error');
	}
});

// @route   POST api/contacts
// @desc    Add new contact
// @access  Private
router.post('/', [ auth, [ check('name', 'Name is required').not().isEmpty() ] ], async (req, res) => {
	// res.send('Add new contact');

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	// pull out data from the body
	const { name, email, phone, type } = req.body;

	// create a new contact instance
	// -> user we get from the user request id (from the auth middleware)
	try {
		const newContact = new Contact({
			name,
			email,
			phone,
			type,
			user: req.user.id
		});

		// add to cantact -> put to database
		const contact = await newContact.save();

		// return contact to client
		res.json(contact);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server Error');
	}
});

// @route   PUT api/contacts
// @desc    Update contact
// @access  Private
router.put('/:id', auth, async (req, res) => {
	// res.send('Update contact');

	const { name, email, phone, type } = req.body;

	// build contact object, based on the fields that are submitted
	let contactFields = {};

	// check to see if these are submitted -> id add to contactField
	if (name) contactFields.name = name;
	if (email) contactFields.email = email;
	if (phone) contactFields.phone = phone;
	if (type) contactFields.type = type;

	try {
		let contact = await Contact.findById(req.params.id);
		if (!contact) {
			return res.status(404).json({ msg: 'Contact not found' });
		}

		// make sure user owns contact
		// -> compare user from the token
		// -> contact.user is not a string -> toString()
		if (contact.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'Not authorized' });
		}

		// update contact -> from contact model -> find by id and update -> pass the id that will be updated
		// $set: contactFields -> set the contac fields that we descibed above
		// new: true -> if this contact doesn't exist then create it
		contact = await Contact.findByIdAndUpdate(req.params.id, { $set: contactFields }, { new: true });

		// send back to client the updated contact
		res.json(contact);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server Error');
	}
});

// @route   DELETE api/contacts
// @desc    Delete contact
// @access  Private
router.delete('/:id', auth, async (req, res) => {
	// res.send('Delete contact');

	try {
		// find contact by id (the contact id)
		let contact = await Contact.findById(req.params.id);

		// if the contact not found -> return error status and message
		if (!contact) {
			return res.status(404).json({ msg: 'Contact not found' });
		}

		// make sure the user owns the contact -> return error status and message
		if (contact.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'Not authorized' });
		}

		// remove the contact (the contact id)
		await Contact.findByIdAndRemove(req.params.id);

		// return a message in jason format
		res.json({ msg: 'Contact removed' });
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
