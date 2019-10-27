import axios from 'axios';
import { GET_ERRORS, GET_POSTS } from './types';

export const createPost = (post, history) => async dispatch => {
  try {
    const res = await axios.post('http://localhost:9000/api/post', post);
    history.push('/posts');
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

export const getPosts = () => async dispatch => {
  const res = await axios.get('http://localhost:9000/api/posts');
  dispatch({
    type: GET_POSTS,
    payload: res.data._embedded.posts
  });
};
