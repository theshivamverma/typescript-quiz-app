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
      return { loginStatus: true };
    } else {
      return { loginStatus: false };
    }
  } catch (error) {
    console.log(error);
    return { loginStatus: false };
  }
}

export async function logoutUser() {
  try {
    const { status, data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_BASE_URL}/auth/logout`
    );
  } catch (error) {
    console.log(error);
  }
}

export async function isUserloggedIn() {
  try {
    const { status, data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_BASE_URL}/auth/isloggedin`
    );
    if (status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}

export function setupAuthHeaderForServiceCalls() {
  axios.defaults.withCredentials = true;
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
      return { signupStatus: true };
    } else {
      return { signupStatus: false };
    }
  } catch (error) {
    console.log(error);
    return { signupStatus: false };
  }
}

// https://typescript-quiz-app-api.herokuapp.com/api
