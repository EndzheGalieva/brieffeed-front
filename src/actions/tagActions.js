import axios from "axios";
import {GET_ERRORS, GET_TAG, GET_TAGS} from "./types";

const API_VERSION = '/api';

export const getTags = name => async dispatch => {
  const res = await axios.get(`${API_VERSION}/tags`);
  dispatch({
    type: GET_TAGS,
    payload: res.data
  });
};

export const getTag = id => async dispatch => {
  try {
    const res = await axios.get(`${API_VERSION}/tags/${id}`);
    dispatch({
      type: GET_TAG,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};
