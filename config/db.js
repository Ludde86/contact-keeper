// this will use mangoose to connect to our database
const mongoose = require('mongoose');

// get rid of the deprecated console warning
mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);

// bring in config from package.json -> we need access to the global variables
const config = require('config');

// initialize a variable and grab the mango uri (global variable)
const db = config.get('mongoURI');

// * mangoos returns promises *
// const connectDB = () => {
// 	mongoose
// 		.connect(db)
// 		.then(() => console.log('MangoDB connected'))
// 		.catch((err) => {
// 			console.log(err.message);
// 			process.exit(1); // 1 -> exit with failure
// 		});
// };

// * sync await *
// function to connect to database
// try to use mongoose and connect to the db URI -> wait for promises -> console log the connection
// catch if error -> console log error -> exit process
const connectDB = async () => {
	try {
		await mongoose.connect(db);
		console.log('MangoDB Connected...');
	} catch (error) {
		console.error(error.message);
		process.exit(1); // 1 -> exit with failure
	}
};

module.exports = connectDB;
