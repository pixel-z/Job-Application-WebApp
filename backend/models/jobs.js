const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const JobSchema = new Schema({
    title: {
		type: String,
		required: true
	},
    name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	datefofposting: {
		type: Date,
		required: true
	},
	deadline: {
		type: Date,
		required: true
	}
});

module.exports = Job = mongoose.model("job", jobSchema);
