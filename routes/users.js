// bring in express so that we can use the router
const express = require('express');

// store the router
const router = express.Router();

// bring in user model, so we can use it within our routes
const User = require('../models/User');

// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post('/', (req, res) => {
	// '/' goes to '/api/users' -> this file get forwarded to server.js app.use('/api/users', require('./routes/users'))
	// res.send('Register a user');
	res.send(req.body);
	// req.body = the json data sent to the route (the email, password and the name -> {"name": "Ludvig", "email": "ludvig@mail.com"})
	// -> in order to use request body, we need to add middleware to our server.js

	// error checking
});

// export the route
module.exports = router;
