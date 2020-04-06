const express = require('express');
const router = express.Router();

const config = require('config');

// bring in bcrypt for hash password
const bcrypt = require('bcryptjs');

// bring in json web token
const jwt = require('jsonwebtoken');

// bring in express validator -> so we can use the chaeck function for validation
const { check, validationResult } = require('express-validator');

// bring in user model, so we can use it within our routes
const User = require('../models/User');

// here we gonna have two routes
// -> get the logged in user
// -> log in the user (and get a token)

// @route   GET api/auth
// @desc    Get logged in user
// @access  Private
router.get('/', (req, res) => {
	res.send('Get logged in user');
});

// @route   POST api/auth
// @desc    Auth user & get token
// @access  Public
router.post(
	'/',
	[ check('email', 'Please enter a valid email').isEmail(), check('password', 'Password is required').exists() ],
	async (req, res) => {
		// res.send('Log in user');

		// error checking
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			// return the errors as an array in json format
			return res.status(400).json({ errors: errors.array() });
		}

		const { email, password } = req.body;

		try {
			// see if the user exists, with mongoose findOne
			let user = await User.findOne({ email });

			// if no user with that email -> return with status code and an error message
			if (!user) {
				return res.status(400).json({ msg: 'Invalid Credentials' });
			}

			// if there is a user -> check the password using the bcrypt compare method
			// this compares the text password (created by the user), and the hashed password (from the user we found)
			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch) {
				return res.status(400).json({ msg: 'Invalid Credentials' });
			}

			// if isMatch -> send the token

			// create payload with id -> we get the user's id from findOne method
			const payload = {
				user: {
					id: user.id
				}
			};

			// sign token
			jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 360000 }, (error, token) => {
				if (error) throw error;
				res.json({ token });
			});
		} catch (error) {
			console.error(error);
			res.status(500).send('Server Error');
		}
	}
);

module.exports = router;
