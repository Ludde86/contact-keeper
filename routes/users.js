// bring in express so that we can use the router
const express = require('express');

// store the router
const router = express.Router();

// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post('/', (req, res) => {
	res.send('Register a user');
});

// export the route
module.exports = router;
