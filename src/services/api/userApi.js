import axiosInstance from "../../api/axiosInstance";
import { urls } from "../../constants/urls";
const userData = JSON.parse(localStorage.getItem("userInfo"));
const email = userData.email ? userData.email : "";
export async function getUserInfo(){
    const res = await axiosInstance().get(`${urls.GET_USER_INFO}12`)
    return res
}
export async function updateGeneralInfo(data) {
	const res = await axiosInstance().post(
		`${urls.UPDATE_GENERAL_INFO}`,
		data
	);
	return res;
}

export async function updatePassword(data) {
	const res = await axiosInstance().post(
		`${urls.updatePassword}`,
		data
	);
	return res;
}

export async function updateAddress(data) {
	const res = await axiosInstance().post(
		`${urls.updateAddress}`,
		data
	);
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
	// const userData = JSON.parse(localStorage.getItem("userData"));
	// const email = userData.email ? userData.email : "";
	const res = await axiosInstance().get(
		`${urls.GET_PANDING_ORDERS}${email}`
	);
	return res;
}
export async function ApipandingPreOrders() {
	
	const res = await axiosInstance().get(
		`${urls.PANDING_PREORDER}${email}`
	);
	return res;
}
