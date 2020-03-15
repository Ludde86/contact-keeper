const express = require('express');
const router = express.Router();

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
router.get('/', (req, res) => {
	res.send('Log in user');
});

module.exports = router;
