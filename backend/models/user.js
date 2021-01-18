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
	},
	education: [
		{
			institute:{
				type: String,
				required: true
			},
			startyear: {
				type: Number,
				required: true
			},
			endyear: {
				type: Number,
				required: false
			}
		}
	],
	skill: [ String ],
	rating: {
		type: Number,
		required: false,
		min: 0,
		max: 5,
		default: 0
	},
	bio : {
		type: String,
		required: false
	},
	contact: {
		type: Number,
		required: false,
		min: 10,
		max: 10
	}

});

module.exports = User = mongoose.model("user", UserSchema);
