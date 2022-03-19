const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
	id: {
		type: Number,
		unique: true,
		required: [true, "id must be provided"],
	},
	fname: {
		type: String,
		required: [true, "first name cant be null"],
	},
	lname: {
		type: String,
		required: [true, "last name cant be null"],
	},
	email: {
		type: String,
		trim: true,
		lowercase: true,
		unique: true,
		validate: {
			validator: function (v) {
				return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
			},
			message: "Please enter a valid email",
		},
		required: [true, "Email required"],
	},

	mobile: {
		type: String,
		trim: true,
		unique: true,
		validate: {
			validator: function (v) {
				return /^[0-9]{10}/.test(v);
			},
			message: "{VALUE} is not a valid 10 digit number!",
		},
		required: [true, "mobile number is required"],
	},
	address: {
		type: String,
		default: "",
	},
	dob: {
		type: Date,
		required: true,
		trim: true,
		default: Date.now(),
	},
	password: {
		type: String,
		required: [true, "This field is required"],
	},
});

module.exports = mongoose.model("Customer", customerSchema);
