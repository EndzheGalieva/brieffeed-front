import {
    GET_BLOGS,
    GET_BLOG,
    DELETE_BLOG
  } from '../actions/types';
  
  const initialState = {
    blogs: [],
    blog: {}
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case GET_BLOGS:
        return {
          ...state,
          blogs: action.payload
        };
      case GET_BLOG:
        return {
          ...state,
          blog: action.payload
        };
      case DELETE_BLOG:
        return {
          ...state,
          blog: state.blogs.filter(
            blog => blog.blogId !== action.payload
          )
        };
      default:
        return state;
    }
  }