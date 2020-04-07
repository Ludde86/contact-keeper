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
router.get('/', (req, res) => {
	res.send('Get all contacts');
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
