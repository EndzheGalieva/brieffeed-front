import {DELETE_CATEGORY, GET_CATEGORIES, GET_CATEGORY} from '../actions/types';

const initialState = {
  categories: [],
  category: {}
};

function categoryReducer(state = initialState, action) {

  switch (action.type) {
    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload
      };
    case GET_CATEGORY:
      return {
        ...state,
        category: action.payload
      };
    case DELETE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter(
          category => category.id !== action.payload
        )
      };
    default:
      return state;
  }
}

export default categoryReducer
