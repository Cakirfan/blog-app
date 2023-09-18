// import React from "react";
import axios from "axios";
import {
  fetchFail,
  fetchStart,
  loginSuccess,
  logoutSuccess,
  profileSuccess,
  registerSuccess,
} from "../features/authSlice";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";

const useAuthCall = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const login = async (userInfo) => {
    dispatch(fetchStart());
    try {
      const { data } = await axios.post(
        `${BASE_URL}users/auth/login/`,
        userInfo
      );
      dispatch(loginSuccess(data));
      dispatch(profileSuccess(data));
      toastSuccessNotify("Login performed");
      navigate("/");
      console.log(data);
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Login can not be performed");
      console.log(error);
    }
  };

  const logout = async () => {
    dispatch(fetchStart());
    try {
      await axios.post(`${BASE_URL}users/auth/logout/`, null, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      dispatch(logoutSuccess());
      toastSuccessNotify("Logout performed");
      navigate("/");
    } catch (err) {
      dispatch(fetchFail());
      toastErrorNotify("Logout can not be performed");
    }
  };

  const register = async (userInfo) => {
    dispatch(fetchStart());
    try {
      const { data } = await axios.post(`${BASE_URL}users/register/`, userInfo);
      dispatch(registerSuccess(data));
      dispatch(profileSuccess(data));
      toastSuccessNotify("Register performed");
      navigate("/");
      console.log(data);
    } catch (err) {
      dispatch(fetchFail());
      toastErrorNotify("Register can not be performed");
    }
  };

  return { login, register, logout };
  
};

export default useAuthCall;
