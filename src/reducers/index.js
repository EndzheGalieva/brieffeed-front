import {combineReducers} from 'redux';
import errorReducer from './errorReducer';
import categoryReducer from './categoryReducer';
import blogReducer from './blogReducer';
import postReducer from './postReducer';
import securityReducer from './securityReducer';

export default combineReducers({
  category: categoryReducer,
  blog: blogReducer,
  post: postReducer,
  security: securityReducer,
  errors: errorReducer
});
