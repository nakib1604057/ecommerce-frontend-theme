import { ADD_CATEGORY } from "../constants/ActionTypes";

const initialState = {
  category: [{ name: "All", category_id: -1 }],
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CATEGORY:
      return {
        ...state,
        category: [{ name: "All", category_id: -1 }, ...action.data],
      };
    default:
      return state;
  }
};
export default categoryReducer;
