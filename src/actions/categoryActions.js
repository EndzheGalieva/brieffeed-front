import axios from 'axios';
import {
  GET_ERRORS,
  GET_CATEGORIES,
  GET_CATEGORY,
  DELETE_CATEGORY
} from './types';

export const createCategory = (category, history) => {
  return async dispatch => {
    try {
      await axios.post('/api/categories/create', category);
      history.push('/categories');
    } catch (error) {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      });
    }
  };
};

export const getCategories = () => async dispatch => {
  const res = await axios.get('/api/categories');
  dispatch({
    type: GET_CATEGORIES,
    payload: res.data._embedded.categories
  });
};

export const getCategory = (categoryId, history) => async dispatch => {
  try {
    const res = await axios.get(`/api/categories/${categoryId}`);
    if (res.data == null) {
      history.push('/categories');
    } else {
      dispatch({
        type: GET_CATEGORY,
        payload: res.data
      });
    }
  } catch (error) {
    history.push('/categories');
  }
};

export const updateCategory = (
  categoryId,
  category,
  history
) => async dispatch => {
  try {
    await axios.patch(`/api/categories/${categoryId}/update`, category);
    history.push('/categories');
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

export const deleteCategory = categoryId => async dispatch => {
  await axios.delete(`/api/categories/${categoryId}`);
  dispatch({
    type: DELETE_CATEGORY,
    payload: categoryId
  });
};
