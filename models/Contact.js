// bring in mongoose
const mongoose = require('mongoose');

// create object schema for contact with mongoose schema method
const ContactSchema = mongoose.Schema({
	// create relationship between contacts and users -> each user has it's own set of contacts
	// -> user gonna be a part of this schema
	// -> type: an entity with mongo (the document) db has an obect id -> use this type
	// -> refer to a specific collection -> users
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'users'
	},

	// add fields for this schema
	// -> user, name, email, phone, type, date
	// -> type: string, default 'personal'
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	phone: {
		type: String
	},
	type: {
		type: String,
		default: 'personal'
	}
});

// export module -> this mongoose model -> model name and model schema
module.exports = mongoose.model('contact', ContactSchema);
