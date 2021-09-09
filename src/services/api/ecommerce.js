import axiosInstance from "../../api/axiosInstance";
import { urls } from "../../constants/urls";

export async function checkoutOrders(data) {
	const res = await axiosInstance().post(urls.POST_ORDER, data);
	return res;
}

export async function getRelatedProducts(categoryId,productId){
	const res = await axiosInstance().get(`${urls.GET_RELATED_PRODUCTS}?categoryId=${categoryId}&productId=${productId}`)
	return res
}

export async function getCategories(){
  const res  = await axiosInstance().get(urls.GET_CATEGORIES)
  return res
}