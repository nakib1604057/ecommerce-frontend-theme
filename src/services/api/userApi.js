import axiosInstance from "../../api/axiosInstance";
import { urls } from "../../constants/urls";
export async function getUserInfo() {
	const userData = JSON.parse(localStorage.getItem("userInfo"));
	const userId = userData.id ? userData.id : "";
	const res = await axiosInstance().get(`${urls.GET_USER_INFO}${userId}`);
	return res;
}
export async function updateGeneralInfo(data) {
	const res = await axiosInstance().post(`${urls.UPDATE_GENERAL_INFO}`, data);
	return res;
}

export async function updateUserPassword(data) {
	// const userData = JSON.parse(localStorage.getItem("userInfo"));
	// const email = userData.email ? userData.email : "";
	
	const res = await axiosInstance().post(`${urls.UPDATE_PASSWORD}`, data);
	return res;
}

export async function updateUserAddress(data) {
	const res = await axiosInstance().post(`${urls.UPDATE_ADDRESS}`, data);
	return res;
}

// export async function updateProfilePic(data) {
// 	// {userId:11,profile:12121.png}
// 	const res = await axiosInstance().post(
// 		"http://localhost:5000/api/userinfo/update/profilepic",
// 		data
// 	);
// 	return res;
// }
export async function pandingOrders() {
	const userData = JSON.parse(localStorage.getItem("userInfo"));
	const userId = userData.id ? userData.id : "";
	// const userData = JSON.parse(localStorage.getItem("userData"));
	// const email = userData.email ? userData.email : "";
	const res = await axiosInstance().get(`${urls.GET_PANDING_ORDERS}${userId}`);
	return res;
}
export async function getUserAllOrders(){
	const userData = JSON.parse(localStorage.getItem("userInfo"));
	const userId = userData.id ? userData.id : "";
	
	const res = await axiosInstance().get(`${urls.GET_USER_ALL_ORDERS}${userId}`);
	return res;
}
export async function ApipandingPreOrders() {
	const userData = JSON.parse(localStorage.getItem("userInfo"));
	const userId = userData.id ? userData.id : "";
	const res = await axiosInstance().get(`${urls.PANDING_PREORDER}${userId}`);
	return res;
}
