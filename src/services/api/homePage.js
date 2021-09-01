import axiosInstance from "../../api/axiosInstance";

export async function getSliderImages() {
	const res = await axiosInstance().get(
		"http://localhost:5000/api/themeConfig/slider-image"
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