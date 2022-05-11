const { CartItems_API } = require("../backend");

export const addToCart = async (prodid, qty, next) => {
	console.log("addtocart frontend ", prodid, qty);
	await fetch(`${CartItems_API}`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
		body: JSON.stringify({
			productId: prodid,
			qty,
		}),
	})
		.then((resp) => {
			return resp.json();
		})
		.then((data) => {
			console.log("IN HELPER", data);
			next(data);
		});
};

export const updateCart = async (userid, prodid, qty, next) => {
	await fetch(`${CartItems_API}${userid}`, {
		method: "PUT",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
		body: JSON.stringify({
			productId: prodid,
			qty,
		}),
	})
		.then((resp) => {
			console.log(resp);
			return resp.json();
		})
		.then((data) => {
			next(data);
		});
};

export const deleteCart = async (cartid, next) => {
	await fetch(`${CartItems_API}${cartid}`, {
		method: "DELETE",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	})
		.then((resp) => {
			console.log(resp);
			return resp.json();
		})
		.then((data) => {
			next(data);
		});
};
