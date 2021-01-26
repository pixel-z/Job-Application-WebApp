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
	max_applications: {
		type: Number,
		required: true
	},
	max_positions: {
		type: Number,
		required: true
	},
	no_applications: {
		type: Number,
		required: false,
	},
	no_positions: {
		type: Number,
		required: false
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
				type: String,
				validate: {
					validator: function (v) {
						v = v.replace(/(^\s*)|(\s*$)/gi, "");
						v = v.replace(/[ ]{2,}/gi, " ");
						v = v.replace(/\n /, "\n");
						var length = v.split(' ').length;
						return length<=250;
					},
					message: "Max words 250 allowed for bio"
				}
			},
			dateOfApplication: {
				type: Date,
			},
			status: {
				type: String,
				enum: ['accepted', 'rejected', 'pending', 'apply']
			},
			dateOfJoining: {
				type: Date,
			}
		}
	]
});

module.exports = Job = mongoose.model("job", JobSchema);
