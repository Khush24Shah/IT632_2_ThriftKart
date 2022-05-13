const { order_API } = require("../backend");

export const getorderItems = async ( next) => {
	// console.log(userid);
	await fetch(`${order_API}order/`, {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			
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
