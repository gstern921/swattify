import { UserActionTypes } from "./constants";
import {
  API_LOGIN_ENDPOINT,
  API_LOGOUT_ENDPOINT,
  API_ME_ENDPOINT,
  API_REGISTER_ENDPOINT,
} from "../../config/app.config";
import axios from "axios";

export const register = ({ email, password, passwordConfirm, name }) => (dispatch) => {
  dispatch({
    type: UserActionTypes.REGISTER_PENDING,
  });

  axios({
    method: "POST",
    url: API_REGISTER_ENDPOINT,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
    data: {
      email,
      password,
      passwordConfirm,
      name,
    },
  })
    .then((response) => {
      dispatch({
        type: UserActionTypes.REGISTER_SUCCESS,
        payload: response.data.user,
      });

    })
    .catch((err) => {
      dispatch({
        type: UserActionTypes.REGISTER_FAILURE,
        payload: err.response.data.message,
      });
    });
};

export const login = ({ email, password }) => (dispatch) => {
  dispatch({
    type: UserActionTypes.LOGIN_PENDING,
  });

  axios({
    method: "POST",
    url: API_LOGIN_ENDPOINT,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
    data: {
      email,
      password,
    },
  })
    .then((response) => {
      dispatch({
        type: UserActionTypes.LOGIN_SUCCESS,
        payload: response.data.data,
      });

    })
    .catch((err) => {
      console.log(err)
      dispatch({
        type: UserActionTypes.LOGIN_FAILURE,
        payload: err.response.data.message,
      });
    });
};

export const logout = () => (dispatch) => {
  dispatch({
    type: UserActionTypes.LOGOUT_PENDING,
  });

  axios(API_LOGOUT_ENDPOINT, {
    method: "GET",
    withCredentials: true,
  })
    .then((response) => {
      dispatch({ type: UserActionTypes.LOGOUT_SUCCESS });
      console.log(response);
    })
    .catch((err) => {
      dispatch({ type: UserActionTypes.LOGOUT_FAILURE, payload: err.response.data.message });
    });
};

export const checkLoggedInStatus = () => (dispatch) => {
  dispatch({ type: UserActionTypes.CHECK_LOGIN_STATUS_PENDING });

  axios(API_ME_ENDPOINT, {
    method: "GET",
    withCredentials: true,
  })
    .then((response) => {
      console.log(response.data.user)
      dispatch({
        type: UserActionTypes.CHECK_LOGIN_STATUS_SUCCESS,
        payload: response.data.user,
      });
    })
    .catch((err) => {
      // console.log(err);
      dispatch({ type: UserActionTypes.CHECK_LOGIN_STATUS_FAILURE });
    });
};
