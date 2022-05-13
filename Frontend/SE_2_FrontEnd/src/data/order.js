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
						return res.json();
		})
		.then((data) => {
			console.log("ck"+data);
			next(data);
		});
};

export const addorder = async ( user) => {
	// console.log(userid);
	await fetch(`${order_API}order/${user}`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			
		},
		
	})
		.then((res) => {
						return res.json();
		})
		.then((data) => {
			console.log("ck"+data);
			
		});
};