const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
    name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	education: {
		type: String,
		required: true
	},
	skills: {
		type: String,
		required: true
    },
    rating: {
        type: Number,
        required: true
    }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
