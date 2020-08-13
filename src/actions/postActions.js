import axios from 'axios';
import {DELETE_POST, GET_ERRORS, GET_POST, GET_POSTS} from './types';

const API_VERSION = '/api';

export const getErrors = (errors) => async (dispatch) => {
  dispatch({
    type: GET_ERRORS,
    errors: errors.response.data,
  });
};

export const createPost = (post, history) => async dispatch => {
  try {
    await axios.post(`${API_VERSION}/posts/create`, post);
    history.push('/posts');
    dispatch({
      type: GET_ERRORS,
      payload: {}
    });
  } catch (errors) {
    dispatch(getErrors(errors));
  }
};

export const getPosts = () => async dispatch => {
  try {
    const res = await axios.get(`${API_VERSION}/posts`);
    dispatch({
      type: GET_POSTS,
      payload: res.data
    });
  } catch (errors) {
    dispatch(getErrors(errors));
  }
};

export const getPost = (id, history) => async dispatch => {
  try {
    const res = await axios.get(`${API_VERSION}/posts/${id}`);
    if (res.data == null) {
      history.push('/posts');
    } else {
      dispatch({
        type: GET_POST,
        payload: res.data
      });
    }
  } catch (errors) {
    history.push('/posts');
  }
};

export const editPost = (post, history) => async dispatch => {
  try {
    await axios.patch(`${API_VERSION}/posts/${post.id}`, post);
    history.push('/posts');
    dispatch({
      type: GET_ERRORS,
      payload: {}
    });
  } catch (errors) {
    dispatch(getErrors(errors));
  }
};

export const deletePost = id => async dispatch => {
  try {
    await axios.delete(`${API_VERSION}/posts/${id}`);
    dispatch({
      type: DELETE_POST,
      payload: id
    });
  } catch (errors) {
    dispatch(getErrors(errors));
  }
};
