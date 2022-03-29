const path = require("path");
const { StatusCodes } = require("http-status-codes");
// const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const uploadProductImageLocal = async (req, res) => {
	if (!req.files) {
		res.status(StatusCodes.BAD_REQUEST).json({
			error: "No File uploaded",
		});
	}
	const productImage = req.files.image;
	if (!productImage.mimetype.startsWith("image")) {
		res.status(StatusCodes.BAD_REQUEST).json({
			error: "Wrong File uploaded",
		});
	}
	const maxSize = 1024 * 1024;
	if (productImage.size > maxSize) {
		res.status(StatusCodes.BAD_REQUEST).json({
			error: "Image size greater than 1MB",
		});
	}
	const imagePath = path.join(__dirname, "../public/uploads/" + `${productImage.name}`);
	console.log("IMAGE: " + imagePath);
	await productImage.mv(imagePath);
	return res.status(StatusCodes.OK).json({ image: { src: `/uploads/${productImage.name}` } });
};

module.exports = {
	uploadProductImageLocal,
};
