require("dotenv").config();
require("express-async-errors");

const express = require("express");
const session = require("express-session");
const app = express();

const connectDB = require("./db/connect");
const productsRouter = require("./routes/products");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");

const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");

// middleware
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(
	express.urlencoded({
		extended: true,
	})
);
//session
app.use(
	session({
		secret: "secretkey",
		resave: false,
		saveUninitialized: true,
		cookie: {},
	})
);
// routes

app.get("/", (req, res) => {
	res.send("ThriftKart Backend");
});
app.use("/api/v1/profileupdate",profileRouter);
app.use("/api/v1/products", productsRouter);
app.use("/api/v1/auth", authRouter);

// products route

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
	try {
		// connectDB
		await connectDB(process.env.MONGO_URI);
		app.listen(port, () => console.log(`Server is listening port ${port}...`));
	} catch (error) {
		console.log(error);
	}
};
console.log(process.env.EMAIL, process.env.PASSWORD);
start();
