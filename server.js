// entry point to our backend
// we need ta have some endpoints, that our application can hit
// -> like register an user, login user, get all contacs

// create basic express server (we import express this way, without babel, commonJS in JS, ES6 modules in React)
const express = require('express');

// initialize express
const app = express();

// here we bring in the connection to the database
const connectDB = require('./config/db');

// connect database
connectDB();

// initialize middleware for
// -> use express to accept json data (we can now accept the body data in our request methods)
// now bodyParser is included in express, befoe we need to use bodyParser.urlencoded()
app.use(express.json({ extended: false })); // extended: false -> will be parsed with the querystring library -> query-string library will filter out '?' from the query string.

// add an endpoint for the get request
// -> this takes an arrow function with a request and response object
// -> add a response, for this request (we will be sending a json object as a response)
app.get('/', (req, res) => res.json({ msg: 'Welcome to the ContactKeeper API' }));

// bring in (define) route components
app.use('/api/users', require('./routes/users'));
app.use('/api/contacts', require('./routes/contacts'));
app.use('/api/auth', require('./routes/auth'));

// variable for the port, used for production or for development
const PORT = process.env.PORT || 5000;

// add port to listen on
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
