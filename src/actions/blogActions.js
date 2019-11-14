import axios from 'axios';
import { GET_ERRORS, GET_BLOGS, GET_BLOG, DELETE_BLOG } from './types';

export const createPost = (blog, history) => async dispatch => {
  try {
    await axios.post('/api/blogs/create', blog);
    history.push('/blogs');
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

export const getPosts = () => async dispatch => {
  const res = await axios.get('/api/blogs');
  dispatch({
    type: GET_BLOGS,
    payload: res.data._embedded.blogs
  });
};

export const getPost = (blogId, history) => async dispatch => {
  try {
    const res = await axios.get(`/api/blogs/${blogId}`);
    if (res.data == null) {
      history.push('/blogs');
    } else {
      dispatch({
        type: GET_BLOG,
        payload: res.data
      });
    }
  } catch (error) {
    history.push('/blogs');
  }
};

export const updatePost = (blogId, blog, history) => async dispatch => {
  try {
    await axios.patch(`/api/blogs/${blogId}/update`, blog);
    history.push('/blogs');
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

export const deletePost = blogId => async dispatch => {
  await axios.delete(`/api/blogs/${blogId}`);
  dispatch({
    type: DELETE_BLOG,
    payload: blogId
  });
};
