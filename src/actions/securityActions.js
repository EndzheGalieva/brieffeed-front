import axios from 'axios';
import {GET_ERRORS, SET_CURRENT_USER} from './types';
import setJwtToken from '../security/setJwtToken';
import jwt_decode from 'jwt-decode';

const API_VERSION = '/api';

export const getErrors = (errors) => async (dispatch) => {
  dispatch({
    type: GET_ERRORS,
    errors: errors.response.data,
  });
};

export const createNewUser = (newUser, history) => async dispatch => {
  try {
    await axios.post(`${API_VERSION}/users/register`, newUser);
    history.push('/login');
    dispatch({
      type: GET_ERRORS,
      payload: {}
    });
  } catch (errors) {
    dispatch(getErrors(errors));
  }
};

export const login = LoginRequest => async dispatch => {
  try {
    const res = await axios.post(`${API_VERSION}/users/login`, LoginRequest);
    const {token} = res.data;
    localStorage.setItem('jwtToken', token);
    setJwtToken(token);
    const decoded = jwt_decode(token);
    dispatch({
      type: SET_CURRENT_USER,
      payload: decoded
    });
  } catch (errors) {
    dispatch(getErrors(errors));
  }
};

export const logout = () => async dispatch => {
  try {
    localStorage.removeItem('jwtToken');
    setJwtToken(false);
    dispatch({
      type: SET_CURRENT_USER,
      payload: {}
    });
  } catch (errors) {
    dispatch(getErrors(errors));
  }
};
