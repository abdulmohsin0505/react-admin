import axios from "axios";
import * as actionTypes from "../Constants/reviewConstant";

export const getReviews = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_REVIEWS_REQUEST });
    const { data } = await axios.get(`/api/reviews`);
    dispatch({ type: actionTypes.GET_REVIEWS_SUCCESS, payload: data.reviews });
  } catch (error) {
    dispatch({ type: actionTypes.GET_REVIEWS_FAIL, payload: error.message });
  }
};

export const reviewDetail = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.REVIEW_DETAIL_REQUEST });
    const { data } = await axios.get(`/api/reviews/${id}`);
    dispatch({ type: actionTypes.REVIEW_DETAIL_SUCCESS, payload: data.review });
  } catch (error) {
    dispatch({ type: actionTypes.REVIEW_DETAIL_FAIL, payload: error.message });
  }
};

export const updateReview = (id, review) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.UPDATE_REVIEW_REQUEST });
    const { data } = await axios.put(`/api/reviews/${id}`, review);
    dispatch({ type: actionTypes.UPDATE_REVIEW_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: actionTypes.UPDATE_REVIEW_FAIL, payload: error.message });
  }
};

export const deleteReview = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.DELETE_REVIEW_REQUEST });
    const { data } = await axios.delete(`/api/reviews/${id}`);
    dispatch({ type: actionTypes.DELETE_REVIEW_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: actionTypes.DELETE_REVIEW_FAIL, payload: error.message });
  }
};
