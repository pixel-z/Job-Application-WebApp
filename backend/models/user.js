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
				required: true,
				validate: {
					validator: function (v) {
						yearRegex = /^[0-9]{4}$/;
						const currYear = new Date().getFullYear();
						return v <= currYear && yearRegex.test(v);
					},
					message: "Start Year invalid",
				},
			},
			endyear: {
				type: Number,
				required: false,
				validate: {
					validator: function (v) {
						if (v === undefined || v === null)
							return true;
					  	yearRegex = /^[0-9]{4}$/;
					  	const currYear = new Date().getFullYear();
					  	return v <= currYear && yearRegex.test(v);
					},
				message: "End Year invalid",
				},
			}
		}
	],
	skill: [ String ],
	rating: {
		type: Number,
		required: false,
		min: 0,
		max: 5,
	},
	bio : {
		type: String,
		required: false,
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
	contact: {
		type: String,
		required: false,
		validate: {
			validator: function (v) {
				if (v === undefined || v === null)
					return true;
                numRegex = /^[0-9]{10}$/;
				return numRegex.test(v) || v.length == 0;
			},
			message: "Invalid Contact"
		},
	}

});

module.exports = User = mongoose.model("user", UserSchema);
