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
	// res.send('Register a user');
	res.send(req.body);

	// error checking
});

// export the route
module.exports = router;
