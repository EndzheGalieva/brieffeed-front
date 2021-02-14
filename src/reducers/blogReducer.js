import {DELETE_BLOG, GET_BLOG, GET_BLOGS, POST_BLOG, PATCH_BLOG} from '../actions/types';

const initialState = {
  blogs: [],
  blog: {},
  name: "",
  description: "",
  categoryId: ""
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
    case POST_BLOG:
      return {
        ...state,
        name: action.payload.blog.name,
        description: action.payload.blog.description,
        categoryId: action.payload.blog.categoryId,
        blogs: [...state.blogs, action.payload.blog.blogs]
      };
    case PATCH_BLOG:
      return {
        ...state,
        blogs: state.blogs.filter(blog => blog.id !== action.payload)
      };
    default:
      return state;
  }
}
