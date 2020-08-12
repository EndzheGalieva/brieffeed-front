import axios from 'axios';
import {
  DELETE_CATEGORY,
  GET_CATEGORIES,
  GET_CATEGORY,
  GET_ERRORS
} from './types';

const API_VERSION = '/api';

export const createCategory = (category) => async dispatch => {
  try {
    await axios.post(`${API_VERSION}/categories/create`, category);
    dispatch({
      type: GET_ERRORS,
      payload: {}
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

export const getCategories = () => async dispatch => {
  const res = await axios.get(`${API_VERSION}/categories`);
  dispatch({
    type: GET_CATEGORIES,
    payload: res.data
  });
};

export const getCategory = (id) => async dispatch => {
  try {
    const res = await axios.get(`${API_VERSION}/categories/${id}`);
    dispatch({
      type: GET_CATEGORY,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

export const editCategory = (category) => async dispatch => {
  try {
    await axios.patch(`${API_VERSION}/categories/${category.id}`, category);
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

export const deleteCategory = id => async dispatch => {
  await axios.delete(`${API_VERSION}/categories/${id}`);
  dispatch({
    type: DELETE_CATEGORY,
    payload: id
  });
};
