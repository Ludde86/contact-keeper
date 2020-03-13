// entry point to our backend

// create basic express server
const express = require('express');

// initialize express
const app = express();

// add an endpoint for the get request
// -> this takes an arrow function with a request and response object
// -> add a response, for this request (we will be sending a json object as a response)
app.get('/', (req, res) => res.json({ msg: 'Welcome to the ContactKeeper API' }));

// variable for the port, used for production or for development
const PORT = process.env.PORT || 5000;

// add port to listen on
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
