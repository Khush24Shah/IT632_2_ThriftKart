const { CartItems_API } = require("../backend");

export const getCartItems = async (next) => {
	await fetch(CartItems_API, {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	})
		.then((res) => {
			console.log(res);
			return res.json();
		})
		.then((data) => {
			console.log(data);
			next(data);
		});
};
