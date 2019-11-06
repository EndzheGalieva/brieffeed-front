import axios from 'axios';
import { GET_ERRORS, GET_POSTS, GET_POST, DELETE_POST } from './types';

export const createPost = (post, history) => async dispatch => {
  try {
    await axios.post('/api/posts/create', post);
    history.push('/posts');
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
    payload: res.data._embedded.posts
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

export const getPost = (postId, history) => async dispatch => {
  try {
    const res = await axios.get(`/api/posts/${postId}`);
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

export const updatePost = (postId, post, history) => async dispatch => {
  try {
    await axios.patch(`/api/posts/${postId}/update`, post);
    history.push('/posts');
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

export const deletePost = postId => async dispatch => {
  await axios.delete(`/api/posts/${postId}`);
  dispatch({
    type: DELETE_POST,
    payload: postId
  });
};
