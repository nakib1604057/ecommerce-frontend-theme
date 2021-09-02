import axiosInstance from "../../api/axiosInstance";
import { urls } from "../../constants/urls";
export async function getSliderImages() {
  const res = await axiosInstance().get(`${urls.GET_SLIDER_IMGAE}`);
  // console.log(res);
  return res;
}

export async function getNewProducts() {
  const res = await axiosInstance().get(`${urls.GET_NEW_ARIVAL_PROUDUCT}`);
  return res;
}

export async function getFeaturedProducts() {
  const res = await axiosInstance().get(`${urls.GET_FEATURED_PRODUCT}`);
  return res;
}
export async function getPopularProducts() {
  const res = await axiosInstance().get(`${urls.GET_POPULAR_PRODUCT}`);
  return res;
}
