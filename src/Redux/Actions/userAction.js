import axios from "axios";
import * as actionTypes from "../Constants/userConstant";

const getusers = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_USERS_REQUEST });
    // const config = {headers : {"Content-type": "application/json; charset=UTF-8"}}
    const { data } = await axios.get("/api/users");
    dispatch({ type: actionTypes.GET_USERS_SUCCESS, payload: data.users });
  } catch (error) {
    dispatch({ type: actionTypes.GET_USERS_FAILURE, payload: error.message });
  }
};

const getUserById = (userId) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.USER_DETAIL_REQUEST });
    const { data } = await axios.get(`/api/users/${userId}`);
    dispatch({ type: actionTypes.USER_DETAIL_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: actionTypes.USER_DETAIL_FAIL, payload: error.message });
  }
};

const createUser = (user) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.CREATE_USER_REQUEST });
    // const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post("/api/signup", user);
    dispatch({ type: actionTypes.CREATE_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: actionTypes.CREATE_USER_FAIL, payload: error.message });
  }
};

const updateUser = (user, id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.UPDATE_USER_REQUEST });
    const { data } = await axios.put(`/api/users/${id}`, user);
    dispatch({ type: actionTypes.UPDATE_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: actionTypes.UPDATE_USER_FAIL, payload: error.message });
  }
};

const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.DELETE_USER_REQUEST });
    const { data } = await axios.delete(`/api/users/${id}`);
    dispatch({ type: actionTypes.DELETE_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: actionTypes.DELETE_USER_FAIL, payload: error.message });
  }
};

const deleteSelectedUsers = (ids) => (dispatch) => {
  // try{
  //     dispatch({type : actionTypes.DELETE_ALL_USER_REQUEST})
  //     if(ids.length !== 0){
  //         ids.forEach(async (id) => {
  //          await api.delete(`/users/${id}`);
  //         })
  //     }
  //     dispatch({type: actionTypes.DELETE_ALL_USER_SUCCESS,payload : "deleted Successfully"})
  // }catch(error){
  //     dispatch({type: actionTypes.DELETE_ALL_USER_FAIL,payload : error.name})
  // }
};
export {
  getUserById,
  getusers,
  createUser,
  updateUser,
  deleteUser,
  deleteSelectedUsers,
};
