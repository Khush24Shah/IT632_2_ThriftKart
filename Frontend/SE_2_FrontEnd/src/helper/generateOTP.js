import { OTP_API } from "../backend";

export const generateOTP = async (data, next) => {
	console.log(JSON.stringify(data));
	return await fetch(OTP_API, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	}).then((data) => {
		next(data);
	});
};
