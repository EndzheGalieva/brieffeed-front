import axios from 'axios';
import {
  GET_ERRORS,
  GET_CATEGORIES,
  GET_CATEGORY,
  DELETE_CATEGORY
} from './types';

export const createCategory = (category) => async dispatch => {
  try {
    await axios.post('/api/categories/create', category);
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
  const res = await axios.get('/api/categories');
  dispatch({
    type: GET_CATEGORIES,
    payload: res.data
  });
};

export const getCategory = (id) => async dispatch => {
  try {
    const res = await axios.get(`/api/categories/${id}`);
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
    await axios.patch(`/api/categories/${category.id}`, category);
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

export const deleteCategory = id => async dispatch => {
  await axios.delete(`/api/categories/${id}`);
  dispatch({
    type: DELETE_CATEGORY,
    payload: id
  });
};
