import axios from 'axios';
import { GET_ERRORS, GET_BLOGS, GET_BLOG, DELETE_BLOG } from './types';

export const createBlog = blog => async dispatch => {
  try {
    await axios.post('/api/blogs/create', blog);
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
  const res = await axios.get('/api/blogs');
  dispatch({
    type: GET_BLOGS,
    payload: res.data
  });
};

export const getBlog = id => async dispatch => {
  try {
    const res = await axios.get(`/api/blogs/${id}`);
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
    await axios.patch(`/api/blogs/${blog.id}`, blog);
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

export const deleteBlog = id => async dispatch => {
  await axios.delete(`/api/blogs/${id}`);
  dispatch({
    type: DELETE_BLOG,
    payload: id
  });
};
