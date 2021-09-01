import axiosInstance from "../../api/axiosInstance";
// import { urls } from "../urls";

export async function refreshToken(data) {
	const res = await axiosInstance().post(urls.REFRESH_TOKEN, data);
	console.log(res);
	return res;
}

export async function loginApi(email, password) {
	return await axiosInstance().post("http://localhost:5000/api/auth/login", {
		email,
		password,
	});
}