import axiosInstance from "../../api/axiosInstance";
import { urls } from "../../constants/urls";
export async function getPaymentGetwayNumbers (){
    const res  = await axiosInstance().get(urls.GET_PAYMENT_GETWAY_NUMBERS)
    return res 
}