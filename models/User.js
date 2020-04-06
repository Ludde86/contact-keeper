// inside a model we create a schema
// -> we will be using this in our users routes

// bring in mangoose
const mongoose = require('mongoose');

// create user schema
// -> with mongoose.Schema()
// -> mongoose.Schema() takes in an object with properties (what we want the user to have)
const userSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now // default value
	}
});

// export this model -> we want to pass in the component and the schema we created
module.exports = mongoose.model('user', userSchema);
