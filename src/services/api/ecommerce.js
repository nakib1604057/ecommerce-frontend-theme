import axiosInstance from "../../api/axiosInstance";
import { urls } from "../../constants/urls";
export async function pandingOrders() {
	// const userData = JSON.parse(localStorage.getItem("userData"));
	// const email = userData.email ? userData.email : "";
	const res = await axiosInstance().get(
		`${urls.GET_PANDING_ORDERS}nakib2@gmail.com`
	);
	return res;
}