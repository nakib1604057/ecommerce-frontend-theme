import axiosInstance from "../../api/axiosInstance";
import { urls } from "../../constants/urls";
export async function getSliderImages() {
	const res = await axiosInstance().get(
		`${urls.GET_SLIDER_IMGAE}`
	);
	// console.log(res);
	return res;
}

export async function getNewProducts(){
   const res = await axiosInstance().get(
       "http://localhost:5000/api/newArrival/"
   )
   return res
}