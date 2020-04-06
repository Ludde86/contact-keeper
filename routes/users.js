// bring in express so that we can use the router
const express = require('express');

// store the router
const router = express.Router();

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
	(req, res) => {
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

		// send message if there is no errors
		res.send('passed');
	}
);

// export the route
module.exports = router;
