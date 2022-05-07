const express = require("express");
const router = express.Router();

const { getSingleProduct, getAllProducts, createProduct, deleteProduct, updateProduct } = require("../controllers/products");
const { uploadProductImageLocal } = require("../controllers/upload");
router.route("/").get(getAllProducts).post(createProduct);
router.route("/:id").get(getSingleProduct).patch(updateProduct).delete(deleteProduct);
router.route("/upload").post(uploadProductImageLocal);
module.exports = router;


