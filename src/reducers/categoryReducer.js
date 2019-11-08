import {
  GET_CATEGORIES,
  GET_CATEGORY,
  DELETE_CATEGORY
} from '../actions/types';

const initialState = {
  categories: [],
  category: {}
};

export default function(state = initialState, action) {
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
        category: state.categories.filter(
          category => category.categoryId !== action.payload
        )
      };
    default:
      return state;
  }
}
