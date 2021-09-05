import axiosInstance from "../../api/axiosInstance";
import { urls } from "../../constants/urls";

export async function checkoutOrders(data) {
	const res = await axiosInstance().post(urls.POST_ORDER, data);
	return res;
}
