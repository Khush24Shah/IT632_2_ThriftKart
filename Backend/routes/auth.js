const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authVerify"),
	{ signup, signin, emailsend, signout } = require("../controllers/auth.js");
router.route("/emailsend").post(emailsend);
router.route("/register").post(signup);
router.route("/login").post(signin);
router.route("/signout").get(signout);
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
