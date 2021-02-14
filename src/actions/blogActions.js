import axios from 'axios';
import {DELETE_BLOG, GET_BLOG, GET_BLOGS, GET_ERRORS, URL, POST_BLOG} from './types';

export const getErrors = (errors) => async (dispatch) => {
  dispatch({
    type: GET_ERRORS,
    payload: errors.response.data,
  });
};

export const createBlog = blog => async dispatch => {
  try {
    await axios.post(`${URL}/blogs/create`, blog);
    dispatch({
      type: GET_ERRORS,
      payload: {}
    });
  } catch (errors) {
    dispatch(getErrors(errors));
  }
};

export const getBlogs = () => async dispatch => {
  await axios.get(`${URL}/blogs`).then(response => dispatch({
    type: GET_BLOGS,
    payload: response.data
  })).catch(error => dispatch(getErrors(error)));
};

export const getBlog = id => async dispatch => {
  try {
    const res = await axios.get(`${URL}/blogs/${id}`);
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
    await axios.patch(`${URL}/blogs/${blog.id}`, blog);
    dispatch({
      type: POST_BLOG,
      payload: blog
    });
  } catch (errors) {
    dispatch(getErrors(errors));
  }
};

export const deleteBlog = id => async dispatch => {
  try {
    await axios.delete(`${URL}/blogs/${id}`);
    dispatch({
      type: DELETE_BLOG,
      payload: id
    });
  } catch (errors) {
    dispatch(getErrors(errors));
  }
};
