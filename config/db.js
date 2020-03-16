// this will use mangoose to connect to our database
const mongoose = require('mongoose');

// bring in config -> we need access to that global variable
const config = require('config');

// initialize a variable and grap the mango uri
const db = config.get('mongoURI');
