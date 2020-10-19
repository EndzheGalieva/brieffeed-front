import axios from 'axios';
import {DELETE_POST, GET_ERRORS, GET_POST, GET_POSTS, URL} from './types';

export const getErrors = (errors) => async (dispatch) => {
  dispatch({
    type: GET_ERRORS,
    errors: errors.response.data,
  });
};

export const createPost = (post, history) => async dispatch => {
  try {
    await axios.post(`${URL}/posts/create`, post);
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
  await axios.get(`${URL}/posts`).then(
    response => dispatch({
      type: GET_POSTS,
      payload: response.data
    })
  ).catch(error => dispatch(getErrors(error)));
};

export const getPost = (id, history) => async dispatch => {
  try {
    const res = await axios.get(`${URL}/posts/${id}`);
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
    await axios.patch(`${URL}/posts/${post.id}`, post);
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
    await axios.delete(`${URL}/posts/${id}`);
    dispatch({
      type: DELETE_POST,
      payload: id
    });
  } catch (errors) {
    dispatch(getErrors(errors));
  }
};
