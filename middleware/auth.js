// middleware is just a function that has access to request and response cycle (object)
// -> everytime we hit an endpoint we can fire off this middleware
// -> we want to check if there's a token in the header

// bring in jwt to verify the token
const jwt = require('jsonwebtoken');

// bring in config to get access to the token secret
const config = require('config');

// create middleware function we want to export, with req, res and next
// -> when we have a middleware function we want to call next, which move on to the next piece of middleware
module.exports = function(req, res, next) {
	// get token from header
	// with the request object we can access the header -> send the token to the key (key of the token inside the header)
	const token = req.header('x-auth-token');

	// -> we grab the token
	// -> check if there is a token (401 = unauthorized)
	if (!token) {
		return res.status(401).json({ msg: 'No token, authorization denied' });
	}

	// if a token -> we need to verify it
	try {
		const decoded = jwt.verify(token, config.get('jwtSecret'));

		// once verified the object (the payload) is gonna be put into decoded

		// bring the user -> assign the user with the decoded token
		req.user = decoded.user;

		// call next() to move on
		next();
	} catch (error) {
		res.status(401).json({ msg: 'Token is not valid' });
	}
};
