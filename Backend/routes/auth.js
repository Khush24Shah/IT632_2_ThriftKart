const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authVerify"),
	{ signup, signin, emailsend } = require("../controllers/auth.js");
router.route("/emailsend").get(emailsend);
router.route("/register").get(signup);
router.route("/login").get(signin);

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
