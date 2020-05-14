import {GET_ERRORS} from '../actions/types';

const initialState = {};

export default function (state = initialState, action) {
  if (action.type === GET_ERRORS) {
    return action.payload;
  }
  if (action.type !== GET_ERRORS) {
    return {};
  } else {
    return state;
  }
}
