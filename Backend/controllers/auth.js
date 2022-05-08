var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
var User = require("../models/customer");
var nodemailer = require("nodemailer");

exports.emailsend = (req, res) => {
	console.log(req.body);
	var otp1 = Math.floor(100000 + Math.random() * 900000);
	console.log(otp1);

	const otp = bcrypt.hashSync(otp1.toString(10), 8);
	// req.cookie(otp1, bcrypt.hashSync(otp1.toString(10), 8), { expire: 360000 + Date.now() });
	// console.log("____EMAILsend______", req.session);
	var transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: process.env.EMAIL,
			pass: process.env.PASSWORD,
		},
	});

	const mailOptions = {
		from: process.env.EMAIL, // sender address
		to: req.body.email, // list of receivers
		subject: "Thrift Kart Signup OTP", // Subject line
		html:
			'<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2"><div style="margin:50px auto;width:70%;padding:20px 0"><div style="border-bottom:1px solid #eee"><a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">ThriftKart</a></div><p style="font-size:1.1em">Hi,</p><p>Thank you for choosing ThriftKart. Use the following OTP to complete your Sign Up procedures. OTP is valid for 5 minutes</p><h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">' +
			otp1 +
			'</h2><p style="font-size:0.9em;">Regards,<br />Project Team</p><hr style="border:none;border-top:1px solid #eee" /><div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300"><p>ThriftKart Inc</p><p>Grp -2 , SE project</p><p>Sem 2 Msc IT, Daiict</p></div></div></div>', // plain text body
	};
	transporter.sendMail(mailOptions, function (err, info) {
		if (err) console.log(err);
		else console.log(info);

		res.status(200).send({ message: "otp sent  successfully", hashedOTP: otp });
	});
};

exports.signup = (req, res) => {
	console.log("_________", req.body);
	const user = new User({
		fname: req.body.fname,
		lname: req.body.lname,
		email: req.body.email,
		mobile: req.body.mobile,
		dob: req.body.dob,
		address: req.body.address,
		password: bcrypt.hashSync(req.body.password, 8),
	});
	// console.log(req.body.otp);
	// console.log(req.cookie.otp);

	// if (bcrypt.compareSync(req.body.otp, req.body.hashedOTP)) {
	user.save((err, user) => {
		// console.log(err);
		if (err) {
			res.status(500).send({
				message: err,
			});
			return;
		} else {
			res.status(200).send({
				message: "User Registered successfully",
			});
		}
	});
	// } else {
	// 	res.status(500).send({
	// 		message: "Wrong otp",
	// 	});
	// }
};

exports.signin = (req, res) => {
	// console.log(req.body.email);
	User.findOne({
		email: req.body.email,
	}).exec((err, user) => {
		if (err) {
			return res.status(500).send({
				message: err,
			});
		}
		if (!user) {
			return res.status(404).send({
				message: "User Not found.",
			});
		}

		//comparing passwords
		var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
		// checking if password was valid and send response accordingly
		if (!passwordIsValid) {
			return res.status(401).send({
				accessToken: null,
				message: "Invalid Password!",
			});
		}
		//signing token with user id
		console.log(user);
		var token = jwt.sign(
			{
				_id: user._id,
			},
			process.env.API_SECRET,
			{
				expiresIn: 86400,
			}
		);

		//responding to client request with user profile success message and  access token .
		res.status(200).send({
			user,
			message: "Login successfull",
			accessToken: token,
		});
	});
};
