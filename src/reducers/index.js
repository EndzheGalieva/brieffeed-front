import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import categoryReducer from './categoryReducer';
import blogReducer from './blogReducer';
import postReducer from './postReducer';

export default combineReducers({
  category: categoryReducer,
  blog: blogReducer,
  post: postReducer,
  errors: errorReducer
});
