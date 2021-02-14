import {GET_ERRORS} from '../actions/types';

const initialState = {};

export default errorReducer

function errorReducer(state = initialState, action) {
  if (action.type === GET_ERRORS) {
    return action.payload;
  }
  if (action.type !== GET_ERRORS) {
    return {};
  } else {
    return state;
  }
}
