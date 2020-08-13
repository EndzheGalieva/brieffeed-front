import axios from 'axios';
import {DELETE_BLOG, GET_BLOG, GET_BLOGS, GET_ERRORS} from './types';

const API_VERSION = '/api';

export const getErrors = (errors) => async (dispatch) => {
  dispatch({
    type: GET_ERRORS,
    errors: errors.response.data,
  });
};

export const createBlog = blog => async dispatch => {
  try {
    await axios.post(`${API_VERSION}/blogs/create`, blog);
    dispatch({
      type: GET_ERRORS,
      payload: {}
    });
  } catch (errors) {
    dispatch(getErrors(errors));
  }
};

export const getBlogs = () => async dispatch => {
  try {
    const res = await axios.get(`${API_VERSION}/blogs`);
    dispatch({
      type: GET_BLOGS,
      payload: res.data
    });
  } catch (errors) {
    dispatch(getErrors(errors));
  }
};

export const getBlog = id => async dispatch => {
  try {
    const res = await axios.get(`${API_VERSION}/blogs/${id}`);
    dispatch({
      type: GET_BLOG,
      payload: res.data
    });
  } catch (errors) {
    dispatch(getErrors(errors));
  }
};

export const editBlog = blog => async dispatch => {
  try {
    await axios.patch(`${API_VERSION}/blogs/${blog.id}`, blog);
  } catch (errors) {
    dispatch(getErrors(errors));
  }
};

export const deleteBlog = id => async dispatch => {
  try {
    await axios.delete(`${API_VERSION}/blogs/${id}`);
    dispatch({
      type: DELETE_BLOG,
      payload: id
    });
  } catch (errors) {
    dispatch(getErrors(errors));
  }
};
