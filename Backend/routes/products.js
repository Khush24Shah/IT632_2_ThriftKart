const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/authVerify"),
	{ signup, signin } = require("../controllers/auth.js");

const { getAllProducts } = require("../controllers/products");

router.route("/").get(getAllProducts);
router.route("/auth").post("/register", signup);
router.route("/auth").post("/login", signin);

router.get("/hiddencontent", verifyToken, function (req, res) {
	if (!user) {
		res.status(403).send({
			message: "Invalid JWT token",
		});
	}
	if (req.user == "admin") {
		res.status(200).send({
			message: "Congratulations! but there is no hidden content",
		});
	} else {
		res.status(403).send({
			message: "Unauthorised access",
		});
	}
});
module.exports = router;
