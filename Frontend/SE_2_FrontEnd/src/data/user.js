import { Login_API, ProfileData_API, Register_API } from "../backend";

export const userProfile = async (next) => {
	await fetch(`${ProfileData_API}`, {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			// Authorization: `Bearer ${token}`,
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

export const signup = async (user) => {
	return await fetch(`${Register_API}`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(user),
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => {
			console.log(err);
		});
};

export const signin = async (user) => {
	return await fetch(`${Login_API}`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(user),
	})
		.then((response) => {
			return response.json();
		})
		.then((data) => console.log(data))
		.catch((err) => {
			console.log(err);
		});
};

export const authenticate = (data, next) => {
	if (typeof window !== "undefined") {
		localStorage.setItem("jwt", JSON.stringify(data));
		next();
	}
};

// export const signout = async (next) => {
// 	if (typeof window !== "undefined") {
// 		localStorage.removeItem("jwt");
// 		next();
// 		return await fetch(`${API}/signout`, {
// 			method: "GET",
// 		})
// 			.then((response) => {
// 				console.log("signout", response);
// 			})
// 			.catch((err) => console.log(err));
// 	}
// };

export const isAuthenticated = () => {
	if (typeof window === "undefined") {
		return false;
	}
	if (localStorage.getItem("jwt")) {
		return JSON.parse(localStorage.getItem("jwt"));
	} else {
		return false;
	}
};
