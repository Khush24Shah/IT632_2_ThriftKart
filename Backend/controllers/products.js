const Product = require("../models/product");

const getAllProducts = async (req, res) => {
	const { name, category, gender, featured, sort, fields } = req.query;
	const queryObj = {};
	if (featured) {
		queryObj.featured = featured === "true" ? true : false;
	}
	if (category) {
		queryObj.category = category;
	}
	if (name) {
		queryObj.name = { $regex: name, $options: "i" };
	}
	if (gender) {
		queryObj.gender = gender;
	}

	//not using await, to get access to query instance, so that we can use chaining operations.
	let result = Product.find(queryObj);

	//sort
	if (sort) {
		const sortList = sort.split(",").join(" ");
		result = result.sort(sortList);
	} else {
		result = result.sort("createdAt");
	}

	//fields
	if (fields) {
		const fieldsList = fields.split(",").join(" ");
		result = result.select(fieldsList);
	}

	//typecasting string to number type.
	const page = Number(req.query.page) || 1;
	const limit = Number(req.query.limit) || 10;
	const skip = (page - 1) * limit;
	result = result.skip(skip).limit(limit);

	//using await here, results in list of products (documents from collection) from query instance of DB Model.
	const products = await result;
	res.status(200).json({
		products,
		nHits: products.length,
	});
};

const createProduct = async (req, res) => {
	if(req.body=="")
	{
		console.log("null");
		req.body.featured=0;
	}
	else
	{
		req.body.featured=1;
	}
	console.log(req.body);
	const product = await Product.create(req.body);
	res.status(201).json({ product });
};

const getSingleProduct = async (req, res, next) => {
	const { id: productID } = req.params;
	const product = await Product.findOne({ _id: productID });
	if (!product) {
		return next(createCustomError(`No task with id : ${productID}`, 404));
	}

	res.status(200).json({ product });
};
const deleteProduct = async (req, res, next) => {
	const { id: productID } = req.params;
	const product = await Product.findOneAndDelete({ _id: productID });
	if (!product) {
		return next(createCustomError(`No task with id : ${productID}`, 404));
	}
	res.status(200).json({ product });
};

const updateProduct = async (req, res, next) => {
	const { id: productID } = req.params;

	const product = await Product.findOneAndUpdate({ _id: productID }, req.body, {
		new: true,
		runValidators: true,
	});

	if (!product) {
		return next(createCustomError(`No task with id : ${productID}`, 404));
	}

	res.status(200).json({ product });
};

module.exports = {
	getSingleProduct,
	getAllProducts,
	createProduct,
	deleteProduct,
	updateProduct,
};
