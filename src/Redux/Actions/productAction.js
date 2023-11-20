import axios from "axios";
import * as actionTypes from "../Constants/productConstant";

export const fetchProducts = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.FETCH_PRODUCTS_REQUEST });
    const { data } = await axios.get(`/api/products`);
    dispatch({
      type: actionTypes.FETCH_PRODUCTS_SUCCESS,
      payload: data.products,
    });
  } catch (error) {
    dispatch({ type: actionTypes.FETCH_PRODUCTS_FAILURE, payload: error.name });
  }
};

export const productById = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.PRODUCT_DETAIL_REQUEST });
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch({
      type: actionTypes.PRODUCT_DETAIL_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    dispatch({ type: actionTypes.PRODUCT_DETAIL_FAIL, payload: error.message });
  }
};

export const createProduct = (product) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.CREATE_PRODUCT_REQUEST });
    const { data } = await axios.post(`/api/products`, product);
    dispatch({ type: actionTypes.CREATE_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: actionTypes.CREATE_PRODUCT_FAIL, payload: error.message });
  }
};

export const updateProduct = (product, id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.UPDATE_PRODUCT_REQUEST });
    const { data } = await axios.put(`/api/products/${id}`, product);
    dispatch({ type: actionTypes.UPDATE_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: actionTypes.UPDATE_PRODUCT_FAIL, payload: error.message });
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.DELETE_PRODUCT_REQUEST });
    const { data } = await axios.delete(`/api/products/${id}`);
    dispatch({ type: actionTypes.DELETE_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: actionTypes.DELETE_PRODUCT_FAIL, payload: error.message });
  }
};
