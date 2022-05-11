const jwt = require("jsonwebtoken");
User = require("../models/customer");

const authVerify = (req, res, next) => {
	console.log(req.headers.authorization);
	if (req.headers && req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
		jwt.verify(req.headers.authorization.split(" ")[1], process.env.API_SECRET, function (err, decode) {
			if (err) req.user = undefined;
			console.log("authVerify ", decode, err);
			User.findOne({
				_id: decode._id,
			}).exec((err, user) => {
				if (err) {
					console.log("error here");
					res.status(500).send({
						message: err,
					});
				} else {
					console.log("authVerify,", user);
					req.user = user;

					next();
				}
			});
		});
	} else {
		console.log("in verify token", "undefined");
		req.user = undefined;
		next();
	}
};
module.exports = authVerify;
