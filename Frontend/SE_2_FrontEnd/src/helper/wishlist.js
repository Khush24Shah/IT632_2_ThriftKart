const { WishlistItems_API } = require("../backend");

export const addToWishlist = async (prodid, next) => {
	console.log("addtowishlist frontend ", prodid);
	await fetch(`${WishlistItems_API}`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
		body: JSON.stringify({
			productId: prodid,
		}),
	})
		.then((resp) => {
			return resp.json();
		})
		.then((data) => {
			console.log("IN HELPER wishlist", data);
			next(data);
		});
};

export const deleteWishlist = async (cartid, next) => {
	await fetch(`${WishlistItems_API}${cartid}`, {
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
