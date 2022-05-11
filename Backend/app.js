require("dotenv").config();
require("express-async-errors");

const cors = require("cors");
const express = require("express");
const session = require("express-session");
var cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const app = express();

const connectDB = require("./db/connect");
const productsRouter = require("./routes/products");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const cartRouter = require("./routes/cart");
const wishlistRouter = require("./routes/wishlist");
const purchaseRouter = require("./routes/purchase");
const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");
const orderRouter = require("./routes/order");

// middleware
app.use(cors());
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
app.use(cookieParser());
app.use(express.static("./public"));
app.use(fileUpload({ useTempFiles: true }));
// routes
app.get("/", (req, res) => {
	res.send("ThriftKart Backend");
});
app.use("/api/v1/profileupdate", profileRouter);
app.use("/api/v1/products", productsRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/wishlist", wishlistRouter);
app.use("/api/v1/order", orderRouter);
//app.use("/api/v1/purchase", purchaseRouter);

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
start();
