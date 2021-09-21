import axiosInstance from "../../api/axiosInstance";
import { urls } from "../urls";

export async function refreshToken(data) {
	const res = await axiosInstance().post(urls.REFRESH_TOKEN, data);

	return res;
}

export async function loginApi(email, password) {
	return await axiosInstance().post(urls.LOGIN_API, {
		email,
		password,
	});
}