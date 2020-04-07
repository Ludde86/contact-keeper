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
router.post('/', (req, res) => {
	res.send('Add new contact');
});

// @route   PUT api/contacts
// @desc    Update contact
// @access  Private
router.put('/:id', (req, res) => {
	res.send('Update contact');
});

// @route   DELETE api/contacts
// @desc    Delete contact
// @access  Private
router.delete('/:id', (req, res) => {
	res.send('Delete contact');
});

module.exports = router;
