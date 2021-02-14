import axios from 'axios';
import {
  DELETE_CATEGORY,
  GET_CATEGORIES,
  GET_CATEGORY,
  GET_ERRORS, URL
} from './types';

const getErrors = (errors) => async (dispatch) => {
  dispatch({
    type: GET_ERRORS,
    payload: errors.response.data,
  });
};

export const createCategory = (category) => async dispatch => {
  try {
    await axios.post(`${URL}/categories/create`, category);
    dispatch({
      type: GET_ERRORS,
      payload: {}
    });
  } catch (errors) {
    dispatch(getErrors(errors));
  }
};

export const getCategories = () => async dispatch => {
  try {
    const res = await axios.get(`${URL}/categories`);
    dispatch({
      type: GET_CATEGORIES,
      payload: res.data
    });
  } catch (errors) {
    dispatch({
      type: GET_ERRORS,
      errors: errors.response.data,
    });
  }
};

export const getCategory = (id) => async dispatch => {
  try {
    const res = await axios.get(`${URL}/categories/${id}`);
    dispatch({
      type: GET_CATEGORY,
      payload: res.data
    });
  } catch (errors) {
    dispatch(getErrors(errors));
  }
};

export const editCategory = (category) => async dispatch => {
  try {
    await axios.patch(`${URL}/categories/${category.id}`, category);
  } catch (errors) {
    dispatch(getErrors(errors));
  }
};

export const deleteCategory = id => async dispatch => {
  try {
    await axios.delete(`${URL}/categories/${id}`);
    dispatch({
      type: DELETE_CATEGORY,
      payload: id
    });
  } catch (errors) {
    dispatch(getErrors(errors));
  }
};
