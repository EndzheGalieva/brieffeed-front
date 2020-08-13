import axios from "axios";
import {DELETE_TAG, GET_ERRORS, GET_TAG, GET_TAGS} from "./types";

const API_VERSION = '/api';

export const getErrors = (errors) => async (dispatch) => {
  dispatch({
    type: GET_ERRORS,
    errors: errors.response.data,
  });
};

export const createTag = (tag) => async dispatch => {
  try {
    await axios.post(`${API_VERSION}/tags/create`, tag);
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
    const res = await axios.get(`${API_VERSION}/tags`);
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
    const res = await axios.get(`${API_VERSION}/tags/${id}`);
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
    await axios.delete(`${API_VERSION}/tags/${id}`);
    dispatch({
      type: DELETE_TAG,
      payload: id
    });
  } catch (errors) {
    dispatch(getErrors(errors));
  }
};
