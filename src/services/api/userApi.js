import axiosInstance from "../../api/axiosInstance";
import { urls } from "../../constants/urls";

export async function getUserInfo(){
    const res = await axiosInstance().get(`${urls.GET_USER_INFO}12`)
    return res
}