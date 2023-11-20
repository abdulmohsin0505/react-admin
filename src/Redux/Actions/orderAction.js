import axios from "axios";
import * as actionType from "../Constants/orderConstant";

export const fetchOrders = () => async (dispatch) => {
  try {
    dispatch({ type: actionType.FETCH_ORDERS_REQUEST });
    const { data } = await axios.get("/api/orders");
    dispatch({ type: actionType.FETCH_ORDERS_SUCCESS, payload: data.orders });
  } catch (error) {
    dispatch({ type: actionType.FETCH_ORDERS_FAILURE, payload: error.message });
  }
};

export const getOrderDetail = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionType.ORDER_DETAIL_REQUEST });
    const { data } = await axios.get(`/api/orders/${id}`);
    dispatch({ type: actionType.ORDER_DETAIL_SUCCESS, payload: data.order });
  } catch (error) {
    dispatch({ type: actionType.ORDER_DETAIL_FAIL, payload: error.message });
  }
};

export const updateOrder = (order, id) => async (dispatch) => {
  try {
    dispatch({ type: actionType.UPDATE_ORDER_REQUEST });
    const { data } = await axios.put(`/api/orders/${id}`, order);
    dispatch({ type: actionType.UPDATE_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: actionType.UPDATE_ORDER_FAIL, payload: error.message });
  }
};

export const deleteOrder = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionType.DELETE_ORDER_REQUEST });
    const { data } = await axios.delete(`/api/orders/${id}`);
    dispatch({ type: actionType.DELETE_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: actionType.DELETE_ORDER_FAIL, payload: error.message });
  }
};
