/* eslint-disable */

import axios from "axios";

import { NavigateFunction } from "../../../node_modules/react-router/umd/index";

export async function loginUser(username: string, password: string) {
  try {
    const { status, data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_BASE_URL}/auth/login`,
      {
        username,
        password,
      }
    );
    if (status === 200) {
      localStorage?.setItem("qviz_login", JSON.stringify({ isLoggedIn: true, token: data.token }))
      return { loginStatus: true, token: data.token };
    } else {
      return { loginStatus: false, token: null };
    }
  } catch (error) {
    console.log(error);
    return { loginStatus: false, token: null };
  }
}

export async function logoutUser() {
  localStorage.removeItem("qviz_login")
}

export function setupAuthHeaderForServiceCalls(token: string | null) {
  if (token) {
    return (axios.defaults.headers.common["Authorization"] = `Bearer ${token}`);
  }
  delete axios.defaults.headers.common["Authorization"];
}

export function setupAuthExceptionHandler(navigate: NavigateFunction) {
  const UNAUTHORIZED = 401;
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.response?.status === UNAUTHORIZED) {
        navigate("login");
      }
      return Promise.reject(error);
    }
  );
}

export async function checkUsername(username: string) {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_BASE_URL}/auth/username-check`,
      {
        username,
      }
    );
    if (data.success) {
      return { isValid: true };
    } else {
      return { isValid: false };
    }
  } catch (error) {
    console.log(error);
    return { isValid: false };
  }
}

export async function signup(username: string, password: string) {
  try {
    const { status, data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_BASE_URL}/auth/signup`,
      {
        user: {
          username,
          password,
        },
      }
    );
    if (status === 200) {
      localStorage?.setItem("qviz_login", JSON.stringify({ isLoggedIn: true, token: data.token }))
      return { signupStatus: true, token: data.token };
    } else {
      return { signupStatus: false, token: null };
    }
  } catch (error) {
    console.log(error);
    return { signupStatus: false, token: null };
  }
}
