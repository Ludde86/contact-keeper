// bring in express so that we can use the router
const express = require('express');

// store the router
const router = express.Router();

// bring in bcrypt for hash password
const bcrypt = require('bcryptjs');

// bring in express validator -> so we can use the chaeck function for validation
const { check, validationResult } = require('express-validator');

// bring in user model, so we can use it within our routes
const User = require('../models/User');

// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post(
	'/',
	[
		check('name', 'Name is required').not().isEmpty(),
		check('email', 'Please include a valid email').isEmail(),
		check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
	],
	async (req, res) => {
		// '/' goes to '/api/users' -> this file get forwarded to server.js app.use('/api/users', require('./routes/users'))
		// res.send('Register a user');
		// res.send(req.body);
		// req.body = the json data sent to the route (the email, password and the name -> {"name": "Ludvig", "email": "ludvig@mail.com"})
		// -> in order to use request body, we need to add middleware to our server.js

		// bring in the requested validation errors
		const errors = validationResult(req);

		// error checking
		// return status for result if there are errors -> as an array
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		// register user

		// request body should have the name, email and password -> pull those out
		const { name, email, password } = req.body;

		// check if the username already exists
		// find user with mongoose method findOne -> if exists send error
		try {
			let user = await User.findOne({ email });
			if (user) {
				return res.status(400).json({ msg: 'User already exists' });
			}

			// if the user doestn exist -> create an instance of that user
			user = new User({
				name,
				email,
				password
			});

			// encrypt (bcrypt -> hash) the password for the user
			// genSalt -> security for the password
			const salt = await bcrypt.genSalt(10);

			// set the encrypted password for the user
			user.password = await bcrypt.hash(password, salt);

			// save the user in the database
			await user.save();

			// send message if user is saved
			res.send('User saved');
		} catch (error) {
			console.error(error.message);
			res.status(500).send('Server error');
		}
	}
);

// export the route
module.exports = router;
