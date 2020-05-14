import {DELETE_BLOG, GET_BLOG, GET_BLOGS} from '../actions/types';

const initialState = {
  blogs: [],
  blog: {}
};

export default function (state = initialState, action) {
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
        blogs: state.blogs.filter(blog => blog.id !== action.payload)
      };
    default:
      return state;
  }
}
