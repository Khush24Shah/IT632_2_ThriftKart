const express = require("express");
const router = express.Router();

const { getSingleProduct, getAllProducts, createProduct, deleteProduct, updateProduct } = require("../controllers/products");

router.route("/").get(getAllProducts).post(createProduct);
router.route("/:id").get(getSingleProduct).patch(updateProduct).delete(deleteProduct);
module.exports = router;
