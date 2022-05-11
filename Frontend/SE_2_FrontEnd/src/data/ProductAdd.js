const { Products_API } = require("../backend");

export const padd = async (user, next) => {
	// console.log(userid);
	await fetch(`${Products_API}`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		
		},
        body:JSON.stringify(user),
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
