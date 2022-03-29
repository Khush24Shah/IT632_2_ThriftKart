const mongoose = require("mongoose");
const admin = require("./admin");
const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "product name must be provided"],
	},
	categories: {
		type: Array,
		default: [],
	},
	stock: {
		type: Number,
		default: 1,
	},
	gender: {
		type: String,
		default: "U",
		uppercase: true,
		maxLength: 1,
		validate: {
			validator: function (v) {
				return v == "U" || v == "M" || v == "F";
			},
			message: "Please enter a valid gender type (F,M,U)",
		},
	},
	price: {
		type: Number,
		required: [true, "product price must be provided"],
	},
	featured: {
		type: Boolean,
		default: false,
	},
	rating: {
		type: Number,
		default: 4.5,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
	adminID: admin,
});

module.exports = mongoose.model("Product", productSchema);
