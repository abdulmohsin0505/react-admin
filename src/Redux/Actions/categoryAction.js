import axios from "axios";
import * as actionTypes from "../Constants/categoryConstant";

export const getCategories = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_CATEGORY_REQUEST });
    const { data } = await axios.get("/api/categories");
    dispatch({
      type: actionTypes.GET_CATEGORY_SUCCESS,
      payload: data.categories,
    });
  } catch (error) {
    dispatch({ type: actionTypes.GET_CATEGORY_FAIL, payload: error.message });
  }
};

export const getProductsByCategory = (category) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.CATEGORY_PRODUCT_REQUEST });
    const { data } = await axios.get(`/api/products`, {
      params: {
        category,
      },
    });
    dispatch({
      type: actionTypes.CATEGORY_PRODUCT_SUCCESS,
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.CATEGORY_PRODUCT_FAIL,
      payload: error.message,
    });
  }
};

export const getCategoryDetail = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.CATEGORY_DETAIL_REQUEST });
    const { data } = await axios.get(`/api/categories/${id}`);
    dispatch({
      type: actionTypes.CATEGORY_DETAIL_SUCCESS,
      payload: data.category,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.CATEGORY_DETAIL_FAIL,
      payload: error.message,
    });
  }
};

export const updateCategory = (category, id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.CATEGORY_DETAIL_REQUEST });
    const { data } = await axios.put(`/api/categories/${id}`, category);
    dispatch({
      type: actionTypes.CATEGORY_DETAIL_SUCCESS,
      payload: data.category,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.CATEGORY_DETAIL_FAIL,
      payload: error.message,
    });
  }
};

export const deleteCategory = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.CATEGORY_DELETE_REQUEST });
    const { data } = await axios.delete(`/api/categories/${id}`);
    dispatch({
      type: actionTypes.CATEGORY_DELETE_SUCCESS,
      payload: data.category,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.CATEGORY_DELETE_FAIL,
      payload: error.message,
    });
  }
};
