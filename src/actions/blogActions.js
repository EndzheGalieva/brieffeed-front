import axios from 'axios';
import {DELETE_BLOG, GET_BLOG, GET_BLOGS, GET_ERRORS} from './types';

const API_VERSION = '/api';

export const createBlog = blog => async dispatch => {
  try {
    await axios.post(`${API_VERSION}/blogs/create`, blog);
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
export const getBlogs = () => async dispatch => {
  const res = await axios.get(`${API_VERSION}/blogs`);
  dispatch({
    type: GET_BLOGS,
    payload: res.data
  });
};

export const getBlog = id => async dispatch => {
  try {
    const res = await axios.get(`${API_VERSION}/blogs/${id}`);
    dispatch({
      type: GET_BLOG,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

export const editBlog = blog => async dispatch => {
  try {
    await axios.patch(`${API_VERSION}/blogs/${blog.id}`, blog);
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

export const deleteBlog = id => async dispatch => {
  await axios.delete(`${API_VERSION}/blogs/${id}`);
  dispatch({
    type: DELETE_BLOG,
    payload: id
  });
};
