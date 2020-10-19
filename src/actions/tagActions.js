import axios from "axios";
import {DELETE_TAG, GET_ERRORS, GET_TAG, GET_TAGS, URL} from "./types";

export const getErrors = (errors) => async (dispatch) => {
  dispatch({
    type: GET_ERRORS,
    errors: errors.response.data,
  });
};

export const createTag = (tag) => async dispatch => {
  try {
    await axios.post(`${URL}/tags/create`, tag);
    dispatch({
      type: GET_ERRORS,
      payload: {}
    });
  } catch (errors) {
    dispatch(getErrors(errors));
  }
};

export const getTags = name => async dispatch => {
  try {
    const res = await axios.get(`${URL}/tags`);
    dispatch({
      type: GET_TAGS,
      payload: res.data
    });
  } catch (errors) {
    dispatch(getErrors(errors));
  }
};

export const getTag = id => async dispatch => {
  try {
    const res = await axios.get(`${URL}/tags/${id}`);
    dispatch({
      type: GET_TAG,
      payload: res.data
    });
  } catch (errors) {
    dispatch(getErrors(errors));
  }
};

export const deleteTag = id => async dispatch => {
  try {
    await axios.delete(`${URL}/tags/${id}`);
    dispatch({
      type: DELETE_TAG,
      payload: id
    });
  } catch (errors) {
    dispatch(getErrors(errors));
  }
};
