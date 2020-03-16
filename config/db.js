// this will use mangoose to connect to our database
const mongoose = require('mongoose');

// bring in config -> we need access to that global variable
const config = require('config');

// initialize a variable and grab the mango uri (global variable)
const db = config.get('mongoURI');

// mangoos returns promises
const connectDB = () => {
	mongoose
		.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
		.then(() => console.log('MangoDB connected'))
		.catch((err) => {
			console.log(err.message);
			process.exit(1); // 1 -> exit with failure
		});
};

module.exports = connectDB;
