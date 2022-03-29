const jwt = require("jsonwebtoken");
User = require("../models/customer");

const authVerify = (req, res, next) => {
	if (req.headers && req.headers.authorization && req.headers.authorization.split(" ")[0] === "JWT") {
		jwt.verify(req.headers.authorization.split(" ")[1], process.env.API_SECRET, function (err, decode) {
			if (err) req.user = undefined;
			console.log(decode._id);
			User.findOne({
				_id: decode._id,
			}).exec((err,user) => {

				
				if (err) {
					console.log('error here');
					res.status(500).send({
						message: err,
					});
				} else {
					console.log(user);
					req.user = user;
					
					next();
				}
			});
		});
	} else {
		console.log('undefined');
		req.user = undefined;
		next();
	}
};
module.exports = authVerify;
