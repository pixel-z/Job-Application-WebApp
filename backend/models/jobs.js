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
	dateofposting: {
		type: Date,
		required: true
	},
	deadline: {
		type: Date,
		required: true
	},
	no_applications: {
		type: Number,
		min: 0,
		max: 20,
		required: true
	},
	no_positions: {
		type: Number,
		min: 0,
		max: 20,
		required: true
	},
	skill: {
		type: [],
		required: false
	},
	jobtype: {
		type: String,
		enum: ['full-time','part-time','work-from-home'],
		required: true
	},
	duration: {
		type: Number,
		min: 0,
		max: 6,
		required: true,
	},
	salary: {
		type: Number,
		min: 0,
		required: true,
	},
	rating: {
		type: Number,
		min: 0,
		max: 5
	},
	applicant: [
		{
			email: {
				type: String,
			},
			sop: {
				type: String
			}
		}
	]
});

module.exports = Job = mongoose.model("job", JobSchema);
