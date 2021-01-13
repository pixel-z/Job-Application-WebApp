const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	// Applicant or Recruiter
	usertype: {
		type: String,
		required: true
	}
});

module.exports = User = mongoose.model("user", UserSchema);
