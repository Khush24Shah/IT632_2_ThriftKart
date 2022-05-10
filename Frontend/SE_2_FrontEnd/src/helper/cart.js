const { CartItems_API } = require("../backend");

export const addToCart = async (prodid, qty, next) => {
	await fetch(`${CartItems_API}`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: {
			productId: prodid,
			qty,
		},
	})
		.then((resp) => {
			return resp.json();
		})
		.then((data) => {
			console.log(data);
			next(data);
		});
};
