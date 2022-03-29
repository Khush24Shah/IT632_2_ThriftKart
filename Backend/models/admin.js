const mongoose = require("mongoose");
const adminSchema = mongoose.Schema({
	password: {
		type: String,
		required: [true, "This field is required"],
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
});

module.export = mongoose.model("Admin", adminSchema);
