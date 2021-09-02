import { ADD_INFO } from "../constants/ActionTypes"

const initialState = {
    info:[]
}

const  companyInfo = (state =initialState, action) =>{
    switch(action.type){
        case ADD_INFO:
            return {...state, info:action.data}
        default:
            return state
    }
}
export default companyInfo