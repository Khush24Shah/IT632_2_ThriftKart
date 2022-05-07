import { Products_API } from "../backend";

export const products = async (next) => {
	// await fetch(`${Products_API}?limit=${limit}&offset=${offset}`)
	await fetch(`${Products_API}`, {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	})
		.then((resp) => {
			return resp.json();
		})
		.then((data) => {
			next(data);
		})
		.catch((err) => console.log(err));
};
