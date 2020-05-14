import axios from 'axios';
import {DELETE_POST, GET_ERRORS, GET_POST, GET_POSTS} from './types';

export const createPost = (post, history) => async dispatch => {
  try {
    await axios.post('/api/posts/create', post);
    history.push('/posts');
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

export const getPosts = () => async dispatch => {
  const res = await axios.get('/api/posts');
  dispatch({
    type: GET_POSTS,
    payload: res.data
  });

  // наработки
  // await fetch('/api/posts')
  //   .then(response => response.json())
  //   .then(responseData => {
  //     dispatch({
  //       type: GET_POSTS,
  //       payload: responseData._embedded.posts
  //     });
  //   })
  //   .catch(err => console.error(err));
};

export const getPost = (id, history) => async dispatch => {
  try {
    const res = await axios.get(`/api/posts/${id}`);
    if (res.data == null) {
      history.push('/posts');
    } else {
      dispatch({
        type: GET_POST,
        payload: res.data
      });
    }
  } catch (error) {
    history.push('/posts');
  }
};

export const editPost = (post, history) => async dispatch => {
  try {
    await axios.patch(`/api/posts/${post.id}`, post);
    history.push('/posts');
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

export const deletePost = id => async dispatch => {
  await axios.delete(`/api/posts/${id}`);
  dispatch({
    type: DELETE_POST,
    payload: id
  });
};
