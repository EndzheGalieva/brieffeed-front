import axios from 'axios';
import { GET_ERRORS, GET_BLOGS, GET_BLOG, DELETE_BLOG } from './types';

export const createBlog = (blog, history) => async dispatch => {
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

export const getBlogs = () => async dispatch => {
  const res = await axios.get('/api/blogs');
  dispatch({
    type: GET_BLOGS,
    payload: res.data._embedded.blogs
  });
};

export const getBlog = (blogId, history) => async dispatch => {
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

export const updateBlog = (blog, history) => async dispatch => {
  try {
    await axios.patch(`/api/blogs/${blog.blogId}/update`, blog);
    history.push('/blogs');
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

export const deleteBlog = blogId => async dispatch => {
  await axios.delete(`/api/blogs/${blogId}`);
  dispatch({
    type: DELETE_BLOG,
    payload: blogId
  });
};
